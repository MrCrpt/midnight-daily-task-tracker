# Midnight RP — Daily Task Tracker

A free, mobile-friendly daily log for the Midnight RP scuba-box grind. The site includes a 1,000-box lifetime goal, configurable daily quota, weekly grind plan for three flexible sessions, weekly baseline and session targets, dated session entries, a full-RP daily checklist with custom tasks, estimated earnings, an actual sale ledger, and JSON backup/restore. There is no Discord webhook integration; use the website itself to log and review your progress.

## Publish on GitHub Pages

1. Open [Repository Pages settings](https://github.com/MrCrpt/midnight-daily-task-tracker/settings/pages).
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Open the [Actions tab](https://github.com/MrCrpt/midnight-daily-task-tracker/actions) and check **Deploy tracker to GitHub Pages**. If GitHub asks you to enable Pages, follow its prompt.
4. When the deployment workflow succeeds, open the site at **https://mrcrpt.github.io/midnight-daily-task-tracker/**.

If the site does not open, check the workflow run and Pages settings first. I cannot verify from the repository file API alone that Pages is enabled or that a deployment has completed.

## Logging and data

- Add a dated box entry after each session. Use the note field for route or session details.
- Set your daily quota; the overview shows boxes completed against that target.
- Start with a 60-box weekly baseline (20 per session across three sessions) and a 90-box stretch target. These are planning targets, not verified server rates; adjust them after recording real session data.
- Use the three-session rotation: (A) scuba collection, (B) scuba plus inventory and sales, (C) catch-up plus another RP objective and weekly review. Pick any three days; rest days have no penalty.
- The checklist covers route planning, scuba collection, inventory, sales, one additional RP objective, resource checks, financial logging, and session close-out.
- Tick off the daily checklist and add custom tasks as needed.
- Record actual sales in the sale ledger. Estimates and real recorded sales are shown separately.
- Use **Export backup** regularly and **Import backup** to restore it.

**Important:** this is a static GitHub Pages site. Your logs are saved in the browser's local storage on that device/profile; they are not automatically saved to GitHub and will not sync across devices or browsers. Export a backup before clearing browser data or switching devices.

## Earnings estimate

The estimate is **$11,000 per box**, using the midpoint of the provided estimate of $100,000–$120,000 per 10 boxes. The 1,000-box gross projection is $10M–$12M. This is a planning estimate only, not guaranteed sale revenue or profit; the sale ledger is the source of truth for actual recorded sales.

## Project files

- `index.html` — complete tracker UI and local-first app logic.
- `.github/workflows/deploy-pages.yml` — deploys the static site to GitHub Pages on pushes to `main`.

No paid hosting or webhook setup is required for the tracker.