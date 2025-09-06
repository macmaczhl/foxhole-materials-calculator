This is a foxhole facility calculator. Allows to calculate any count of materials or vehicles.

Link: https://macmaczhl.github.io/foxhole-materials-calculator/

Inspired by [reddit post](https://www.reddit.com/r/foxholegame/comments/ym64ru/facility_cost_calculator/)

## Development & Deployment

### PR Preview Deployments

This repository automatically creates preview deployments for pull requests targeting the main branch. When you:

- **Open a PR**: A preview deployment is automatically created and a comment with the preview URL is added to the PR
- **Update a PR**: The preview deployment is automatically updated with your changes
- **Close/Merge a PR**: The preview deployment is automatically cleaned up

Preview deployments are available at: `https://macmaczhl.github.io/foxhole-materials-calculator/pr-{PR_NUMBER}/`

### Old Preview Cleanup

The system automatically cleans up old preview deployments:
- When PRs are closed or merged
- Weekly cleanup of previews older than 30 days
- Manual cleanup can be triggered via GitHub Actions

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
