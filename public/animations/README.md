# Animated couple clips

The four supplied MP4 clips show the bride and groom on green-screen backgrounds. They have been chroma-keyed individually and converted into transparent VP9 WebM videos.

## Files and website placement
- `welcome-greeting.webm` — large hero character animation
- `invitation-namaste.webm` — invitation / guest greeting
- `celebration-pose.webm` — events; reused for Sangeet reaction
- `wishes-blessing.webp` — venue, wishes, and closing sections

## Processing
- Individual green-screen key colours were sampled for each clip to account for slightly different green shades.
- Green background removed; soft edge blending retained.
- Original audio removed so the optional website music remains separately controlled.
- Encoded as VP9 WebM with alpha transparency (`alpha_mode=1`).
- 960px wide, 16:9, approximately 10 seconds per clip.
- Videos play muted, inline, and looped.
- The hero uses the welcome clip. After the visitor scrolls away from the hero, a small fixed companion appears and changes clips according to the visible section.

## Browser note
VP9 alpha in WebM is supported by current Chromium-based browsers. Test Safari/iOS separately before production; a static generated character image is included as a fallback inside the video element.

## Important distinction
These are transparent pre-rendered character videos, not a rigged 3D model. They provide real movement and can be layered over the page with no green rectangle, but they cannot be interactively rotated through 360 degrees or pose-controlled like a live 3D GLB model.
