# Wedding Invitation Website

A responsive Next.js + TypeScript wedding invitation with animated section transitions, event cards, venue directions, and a guest-wishes form. It is configured for a static export and deployment to GitHub Pages.

## Requirements
- Node.js 20.9+ (Node 22 LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Deploy to GitHub Pages
Push to the `main` branch to run `.github/workflows/deploy.yml`, or start it from the Actions tab. In the repository's **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The workflow derives the Pages base path from the repository name, including root paths for `*.github.io` repositories.

GitHub Pages is static hosting and does not run Next.js API routes. The wishes form therefore saves wishes in the visitor's browser only; they are not sent to the couple or shared across devices. A backend or hosted form service is needed to collect wishes centrally.

## Personalise
Edit `src/config/wedding.ts`:
- names and invitation copy
- wedding date/time
- venue name/address and Google Maps destination
- event list
- story milestones

The defaults are clearly marked sample placeholders. Replace them before publishing.

## Wishes
The wishes form stores messages in the visitor's browser `localStorage`. It does not send messages to you or share them across guests. To collect wishes centrally, connect `src/lib/wishes.ts` to a hosted backend or form service.

## Character animation note
This starter uses the supplied generated character artwork with Framer Motion for entrance, floating, hover, and interaction transitions. It is not a rigged 3D model and does not contain genuine skeletal animation. For fully articulated walking/dancing, add a rigged GLB model with animation clips or transparent WebM clips under `public/animations/` and wire them into `CoupleCharacter`.

## Artwork note
The section images are crops from the generated visual storyboard and are suitable as starter artwork/moodboard visuals. Replace with separate high-resolution, clean assets before production where text or interface details are embedded in the artwork.

## Arranged-marriage content
There is no invented dating/relationship timeline. The former story section is replaced by a family-blessing / joyful-union section.
