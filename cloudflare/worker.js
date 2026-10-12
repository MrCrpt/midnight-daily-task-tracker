const ALLOWED_ORIGIN = "https://mrcrpt.github.io";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") {
      if (origin !== ALLOWED_ORIGIN) return new Response("Origin not allowed", { status: 403 });
      return new Response(null, { status: 204, headers: cors });
    }
    if (origin !== ALLOWED_ORIGIN) return new Response("Origin not allowed", { status: 403, headers: cors });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });
    if (!env.DISCORD_WEBHOOK_URL) return new Response("Webhook secret is not configured", { status: 500, headers: cors });

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers: cors });
    }
    if (body.type !== "daily_report") return new Response("Unsupported report type", { status: 400, headers: cors });

    const totalBoxes = clampNumber(body.totalBoxes, 0, 1000000);
    const todayBoxes = clampNumber(body.todayBoxes, 0, 1000000);
    const dailyTarget = clampNumber(body.dailyTarget, 1, 1000000);
    const estimatedRevenue = clampNumber(body.estimatedRevenue, 0, 100000000000);
    const actualRevenue = clampNumber(body.actualRevenue, 0, 100000000000);
    const tasksCompleted = clampNumber(body.tasksCompleted, 0, 1000);
    const tasksTotal = clampNumber(body.tasksTotal, 0, 1000);
    const date = typeof body.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? body.date : "Unknown date";

    const message = {
      username: "Midnight Daily Tracker",
      embeds: [{
        title: "Scuba Grind — Daily Report",
        color: 0x39FF14,
        fields: [
          { name: "Report date", value: date, inline: true },
          { name: "Today's boxes", value: String(todayBoxes) + " / " + dailyTarget, inline: true },
          { name: "Lifetime progress", value: String(totalBoxes) + " / 1,000 boxes", inline: true },
          { name: "Estimated total sales", value: formatMoney(estimatedRevenue), inline: true },
          { name: "Actual recorded sales", value: formatMoney(actualRevenue), inline: true },
          { name: "Tasks checked", value: String(tasksCompleted) + " / " + tasksTotal, inline: true }
        ],
        footer: { text: "Midnight RP • Estimates are not guaranteed sale prices" },
        timestamp: new Date().toISOString()
      }]
    };

    const discordResponse = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });
    if (!discordResponse.ok) {
      return new Response("Discord webhook rejected the report", { status: 502, headers: cors });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors, "Content-Type": "application/json" }
    });
  }
};

function clampNumber(value, min, max) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.floor(n))) : min;
}
function formatMoney(value) {
  return "$" + Number(value).toLocaleString("en-CA", { maximumFractionDigits: 0 });
}
