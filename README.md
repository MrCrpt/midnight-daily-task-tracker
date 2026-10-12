# Midnight RP — Daily Task Tracker

A free, mobile-friendly daily log for the Midnight RP scuba-box grind. The site includes a 1,000-box lifetime goal, daily quota and progress bar, dated session entries, a daily checklist with custom tasks, estimated earnings, an actual sale ledger, and JSON backup/restore. There is no Discord webhook integration; use the website itself to log and review your progress.

## Publish on GitHub Pages

1. Open [Repository Pages settings](https://github.com/MrCrpt/midnight-daily-task-tracker/settings/pages).
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Open the [Actions tab](https://github.com/MrCrpt/midnight-daily-task-tracker/actions) and check **Deploy tracker to GitHub Pages**. If GitHub asks you to enable Pages, follow its prompt.
4. When the deployment workflow succeeds, open the site at **https://mrcrpt.github.io/midnight-daily-task-tracker/**.

If the site does not open, check the workflow run and Pages settings first. I cannot verify from the repository file API alone that Pages is enabled or that a deployment has completed.

## Logging and data

- Add a dated box entry after each session. Use the note field for route or session details.
- Set your daily quota; the overview shows boxes completed against that target.
- Tick off the daily checklist and add custom tasks as needed.
- Record actual sales in the sale ledger. Estimates and real recorded sales are shown separately.
- Use **Export backup** regularly and **Import backup** to restore it.

**Important:** this is a static GitHub Pages site. Your logs are saved in the browser's local storage on that device/profile; they are not automatically saved to GitHub and will not sync across devices or browsers. Export a backup before clearing browser data or switching devices.

## Earnings estimate

The estimate is **$11,000 per box**, using the midpoint of the provided estimate of $100,000–$120,000 per 10 boxes. This is only a planning estimate. Update the value in `index.html` if the server economy changes.

## Project files

- `index.html` — complete tracker UI and local-first app logic.
- `.github/workflows/deploy-pages.yml` — deploys the static site to GitHub Pages on pushes to `main`.

No paid hosting or webhook setup is required for the tracker.