# Midnight RP — Daily Task Tracker

Free, static tracker intended for GitHub Pages. Includes a 1,000-box target, daily quota, checklist, estimated earnings, actual sale ledger, local browser persistence, backup export/import, and optional Discord reports.

## Publish the website with GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Open the **Actions** tab and check the **Deploy tracker to GitHub Pages** workflow. If prompted, allow Pages deployment.
4. Once the workflow completes successfully, the site URL should be [https://github.com/MrCrpt/midnight-daily-task-tracker](https://github.com/MrCrpt/midnight-daily-task-tracker/tree/main)

The tracker stores progress in the browser's localStorage. It is not a shared database: data stays in the browser profile and device where you use it. Use **Export backup** to keep a copy, and **Import backup** to restore it.

## Earnings assumptions

The tracker uses $11,000 per box as a midpoint estimate based on the supplied estimate of $100,000–$120,000 per 10 boxes. Change the code if your server's market prices change. Actual recorded sales are kept separate from estimates.

## Optional Discord webhook (free Cloudflare Worker)

Do not put a Discord webhook URL in `index.html`, GitHub files, or any browser-side setting. The browser only needs the Worker endpoint URL; the Discord webhook remains a Cloudflare secret.

1. Create a free Cloudflare account and open **Workers & Pages**.
2. Create a Worker, then paste the contents of `cloudflare/worker.js` into its editor and deploy.
3. In the Worker settings, add a secret environment variable named `DISCORD_WEBHOOK_URL` with your Discord webhook URL as its value. Never commit that value to GitHub.
4. The Worker currently allows browser requests from `https://mrcrpt.github.io`. If you use a different Pages domain, update `ALLOWED_ORIGIN` in `cloudflare/worker.js` and redeploy.
5. In the tracker, enter the deployed Worker URL and choose **Save endpoint**. Use **Send daily report** to test it.

**Security limitation:** origin checks and CORS are browser protections, not authentication. A determined person can send requests directly to a public Worker URL. For a private Discord channel, monitor webhook activity and consider adding a proper access-control mechanism or rate limiting before sharing the site. Never expose the Discord webhook secret.

## Notes

- The daily checklist resets by date; task completion is stored locally.
- Daily totals are calculated from entries whose date matches today's local date.
- The site does not automatically send scheduled reports; use **Send daily report** when you want to post one.
- No paid hosting is required for this static site and low-volume Worker setup, subject to each provider's current free-tier limits.
