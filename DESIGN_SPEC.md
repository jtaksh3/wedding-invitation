# Indian Wedding Invitation Website --- Complete Design & Interaction Specification

**Document purpose:** This is the design and product brief for GitHub
Copilot (or another coding assistant) to build the complete wedding
invitation website. Treat it as the source of truth for the visual
design, character behaviour, page structure, interactions, responsive
behaviour, and implementation expectations.

**Current design direction** - **Visual style:** Royal, warm, romantic
Indian wedding aesthetic. - **Character style:** Expressive 3D animated
bride and groom. - **Character clothing:** Traditional Indian wedding
attire. - **Experience:** Cinematic opening followed by a single-page,
vertically scrolling invitation. - **Primary visual palette:** Deep
navy, maroon/red, warm ivory/cream, antique gold, with blush/pink floral
accents. - **Important:** Names, dates, event timings, family names,
venue address, map coordinates, contact details, and photos are
configurable placeholders. Do not invent real wedding details.

------------------------------------------------------------------------

## 1. Product vision

Create a beautiful, premium, interactive Indian wedding invitation
website that feels like entering a small animated wedding story---not
like viewing a static invitation card.

The bride and groom are the central visual focus. They must be visible
throughout key parts of the experience and should react to visitor
interactions. Their movements should feel intentional and connected to
the user's actions: greeting, walking, looking at each other, dancing,
celebrating, and thanking guests.

The website must: 1. Make a strong first impression through a cinematic
palace entrance. 2. Present all wedding information clearly and
elegantly. 3. Make the bride and groom feel alive through idle
animations and click-triggered actions. 4. Let guests send their wishes
with a simple interaction. 5. Provide a clear Google Maps action for the
venue. 6. Work smoothly on mobile, because many guests will open the
invitation through WhatsApp. 7. Respect reduced-motion preferences and
remain usable if animation assets fail to load.

## 2. Design principles

-   **Elegant, not cluttered:** Decorative details should frame content,
    not compete with it.
-   **Character-led storytelling:** Use the couple to connect sections
    and guide the visitor.
-   **Motion with purpose:** Every animation should communicate a state
    change, add delight, or guide attention.
-   **Fast and accessible:** Animation must not block access to
    essential information.
-   **Mobile-first:** Touch targets, text, layouts, and character
    placement must be designed for narrow screens first.
-   **Consistent character identity:** The bride and groom must look
    like the same two characters in every scene and pose.

## 3. Character art direction

### 3.1 Groom

Create a friendly, charming, expressive 3D animated Indian groom.

**Appearance** - Traditional cream/ivory sherwani with detailed but
tasteful gold embroidery. - Coordinated churidar or fitted traditional
trousers. - Traditional stole/dupatta draped over one shoulder. -
Optional traditional safa/turban in a coordinated warm red or maroon
shade. - Traditional footwear such as mojari. - Warm, welcoming facial
expression. - Well-groomed hair and a neat beard or stubble, if that
suits the final approved character design.

**Personality** - Warm, confident, cheerful, respectful, slightly
playful. - Expressions should be natural and subtle rather than
exaggerated. - The groom should look towards the bride during romantic
moments and towards the visitor during greetings.

### 3.2 Bride

Create a graceful, radiant, expressive 3D animated Indian bride.

**Appearance** - Traditional deep red/maroon bridal lehenga with
detailed gold embroidery. - Coordinated blouse and dupatta/veil, with
the dupatta draped naturally over the head or shoulder. - Traditional
Indian bridal jewellery: necklace, earrings, maang tikka, bangles, and
optional nose ring. - Coordinated traditional footwear. - Elegant bridal
makeup and a warm, welcoming expression. - Dupatta, jewellery, and
lehenga should have subtle secondary motion when she moves.

**Personality** - Graceful, joyful, warm, expressive, and welcoming. -
Expressions should include a gentle smile, shy glance, happy surprise,
laughter, and gratitude. - The bride should occasionally look towards
the groom and then towards the visitor.

### 3.3 Shared character direction

-   Both characters should have complementary proportions, materials,
    lighting, and rendering style.
-   Use a polished, high-quality 3D animated-film aesthetic. Do not
    imitate or reproduce any specific copyrighted character or studio
    character.
-   Preserve the same face, hairstyle, clothing, jewellery, and body
    proportions across all poses.
-   Use warm soft lighting and realistic fabric/jewellery detail, while
    keeping the overall look charming and stylised.
-   Character silhouettes must remain readable against both dark and
    light backgrounds.
-   Avoid placing important text over faces or bodies.
-   Provide transparent-background character renders or a suitable Rive
    scene so the couple can be composited over different website
    backgrounds.

### 3.4 Required character poses and expressions

Prepare these states/poses for both characters. Where possible, create
them as reusable animation states rather than separate unrelated images.

  -------------------------------------------------------------------------
  State / pose        Groom behaviour   Bride behaviour   Usage
  ------------------- ----------------- ----------------- -----------------
  `idle`              Gentle breathing, Gentle breathing, Default state
                      blinking, slight  blinking, subtle  
                      head movement,    smile, slight     
                      natural posture   dupatta movement  

  `greeting`          Turns towards     Turns towards     Invitation opens
                      visitor, smiles,  visitor, smiles,  
                      folds hands in    folds hands in    
                      namaste           namaste           

  `walking`           Takes natural     Walks beside      Enter invitation
                      walking steps,    groom; lehenga    / section
                      slight arm        and dupatta       transition
                      movement          respond naturally 

  `look_at_partner`   Turns head and    Looks towards     Romantic
                      eyes towards      groom with a shy, transition
                      bride, smiles     happy expression  

  `happy`             Bright smile,     Bright smile,     Event details
                      small celebratory gentle joyful     
                      gesture           gesture           

  `dancing`           Simple festive    Graceful dance    Sangeet event
                      dance steps and   steps with        
                      arm movement      lehenga/dupatta   
                                        secondary motion  

  `celebrating`       Raises one hand   Smiles and        Wedding
                      or makes a joyful celebrates;       celebration
                      gesture           optional gentle   
                                        clap              

  `thank_you`         Folds hands in    Folds hands in    After wishes
                      namaste and bows  namaste and bows  submitted
                      slightly          slightly          

  `wave`              Friendly wave     Friendly wave     Optional helper
                                                          interaction

  `surprised`         Brief happy       Brief happy       Optional click
                      surprise          surprise          reaction
  -------------------------------------------------------------------------

**Facial expression set** - Happy / welcoming - Gentle smile / idle -
Shy / romantic glance - Laughing - Pleasant surprise - Grateful /
thankful - Focused / looking at partner

Keep expressions natural. Avoid rapid blinking, excessive bouncing, or
continuous large movements.

## 4. Animation and interaction system

### 4.1 Recommended animation technology

**Preferred:** Rive for the interactive bride-and-groom character
animation, using a state machine with named inputs.

Rive is recommended because it can react to clicks and application state
without requiring a collection of disconnected video clips. Use a
suitable web runtime and keep the animation assets in the project's
static/public assets directory.

**Supporting animation:** CSS animations or Framer Motion may be used
for page transitions, scroll reveals, petals, buttons, cards, and
decorative effects.

Do not use a GIF as the primary character implementation. GIFs do not
provide the same control over interaction, state changes, or smooth
transitions. A video can be used only for a non-interactive background
sequence if needed.

If Rive assets are not available at implementation time: 1. Build the
website layout and interaction wiring first. 2. Use clearly labelled
temporary character placeholders. 3. Keep the character component API
ready for Rive integration. 4. Do not pretend a static image is an
interactive character. 5. Document the exact Rive asset and
state-machine inputs needed.

### 4.2 State machine inputs

Create a character controller with inputs equivalent to:

-   `interaction` --- trigger input for one-off actions.
-   `mood` --- state or enum for idle, happy, shy, surprised, grateful.
-   `scene` --- state or enum for welcome, invitation, story, events,
    venue, wishes, thank-you.
-   `isWalking` --- boolean.
-   `isDancing` --- boolean.
-   `isGreeting` --- boolean.
-   `isThanking` --- boolean.

The exact Rive input types may be adapted to the asset, but the website
code should use a small, typed controller API instead of scattering raw
animation input names throughout the UI.

Suggested logical events: - `OPEN_INVITATION` - `ENTER_CELEBRATION` -
`OPEN_EVENT_HALDI` - `OPEN_EVENT_MEHENDI` - `OPEN_EVENT_SANGEET` -
`OPEN_EVENT_WEDDING` - `OPEN_VENUE` - `SUBMIT_WISH_SUCCESS` -
`SUBMIT_WISH_ERROR` - `RETURN_HOME`

### 4.3 Animation timing and transitions

Use smooth, natural transitions: - Short UI hover/tap feedback:
approximately 150--250 ms. - Section reveal: approximately 400--700
ms. - Character greeting / gesture: approximately 1--2 seconds. -
Walking transition: approximately 2--3 seconds, adjusted to the actual
animation. - Celebration / fireworks: approximately 1.5--3 seconds, then
settle into a calm state.

These are design targets, not rigid requirements. Do not make the guest
wait for a long animation before accessing wedding details.

### 4.4 Click and touch behaviour

-   The primary welcome button triggers the couple's walking/entrance
    animation and transitions into the invitation.
-   Clicking or tapping the couple may trigger a friendly wave or a
    brief happy reaction. This is optional and must not interfere with
    navigation.
-   Clicking an event card changes the event detail state and triggers
    the matching character animation.
-   Sangeet triggers the dancing state.
-   Submitting a valid wish triggers the thank-you state only after the
    server confirms success.
-   On a failed wish submission, show a helpful error and do not show a
    false success animation.
-   Touch interactions must work on phones; do not rely on hover-only
    interactions.

### 4.5 Ambient animation

Use restrained ambient motion: - A few falling rose petals or flower
petals. - Soft glowing lanterns and diya lights. - Subtle floating
bokeh/light particles. - Gentle shimmer on selected gold decorative
details. - Very subtle background parallax, if it does not affect
readability or performance.

Avoid heavy particle effects, excessive motion, or animations that
obscure text.

------------------------------------------------------------------------

## 5. Website structure and page flow

Build a single-page scrolling experience with a cinematic opening. Use a
sticky or compact navigation only if it improves usability. The primary
story should flow vertically in this order:

1.  Welcome / palace entrance
2.  Main invitation
3.  Couple's story
4.  Wedding events
5.  Venue and Google Maps
6.  Send wishes
7.  Thank-you / closing scene

Provide anchor navigation or smooth scroll to the main sections. The
visitor must always be able to reach the event details and venue without
replaying the opening animation.

## 6. Detailed section specifications

### 6.1 Welcome screen --- cinematic palace entrance

**Purpose:** Create the emotional first impression.

**Visual composition** - Full viewport hero scene. - A grand Indian
palace entrance or ornate arch at night. - Deep navy night sky with warm
golden palace lights. - Marigold garlands, hanging lanterns, diyas,
flowers, and subtle floating petals. - Bride and groom seen together,
preferably near the lower centre of the composition. - Couple should be
large enough to recognise on mobile. - Wedding names or monogram in
elegant typography. - Main CTA: **"Enter Our Celebration"** or **"Open
Invitation"**.

**Initial animation** 1. Show the palace/arch with soft lights. 2.
Reveal the couple with a gentle fade or entrance. 3. Couple performs
subtle idle movement. 4. The visitor clicks the main CTA. 5. Couple
begins walking towards/through the palace entrance. 6. The scene
transitions smoothly to the invitation section.

**Functional requirements** - The button must be keyboard accessible. -
Provide a visible skip/continue option if the opening animation is
longer than a brief moment. - Do not autoplay loud music. - If
background music is included, it must begin only after an explicit user
action and have a visible mute/play control.

### 6.2 Main invitation section

**Purpose:** Present the essential invitation details clearly.

**Content placeholders** - "Together with our families" - "We cordially
invite you to celebrate the wedding of" - `[BRIDE_NAME]` -
`[GROOM_NAME]` - `[WEDDING_DATE]` - `[WEDDING_TIME]` -
`[FAMILY_INVITATION_TEXT]`

**Visual design** - Warm ivory/cream background. - Floral and marigold
borders. - Gold ornamental dividers. - Couple shown prominently in
traditional attire. - Use a soft palace/mandap illustration in the
background. - Include a clear invitation message and wedding date.

**Character animation** - Couple enters or fades into the section. -
They turn towards the visitor and perform a namaste greeting. - Gentle
blinking, breathing, and fabric movement continue in idle state. -
Optional subtle flower-petal effect.

**Optional CTA** - "View Wedding Events" scrolls to the events
section. - "Add to Calendar" creates/downloads a calendar event or opens
a supported calendar URL. Only show this if the event date/time is
configured.

### 6.3 Our story section

**Purpose:** Add a personal, romantic narrative.

**Content** Use a horizontal or vertical timeline, depending on screen
size. The timeline is configurable and may contain: - `[FIRST_MET_DATE]`
--- We met - `[RELATIONSHIP_MILESTONE_1]` - `[ENGAGEMENT_DATE]` --- We
got engaged - `[WEDDING_DATE]` --- Now we begin forever

Do not invent the couple's real story. If no story details are provided,
use a tasteful generic timeline with editable placeholders or hide this
section.

**Visual design** - Deep navy or warm cream background, whichever
maintains contrast with the surrounding sections. - Golden path/timeline
with heart or floral markers. - Optional photo cards if the couple
supplies photos. - Do not use generated character art as if it were a
real photograph.

**Character animation** - Couple appears together beside the timeline. -
As each milestone enters the viewport, use a small reaction: look at
each other, smile, wave, or a gentle celebratory gesture. - Keep the
timeline readable and avoid triggering multiple animations repeatedly
during scroll.

### 6.4 Wedding events section

**Purpose:** Make every function and its details easy to understand.

**Default event cards** - Haldi - Mehendi - Sangeet - Wedding -
Reception (optional)

All event names, dates, times, descriptions, dress codes, and locations
must be configurable. Hide an event card if its data is not provided.

**Each event card should support** - Event name - Date - Start time and
optional end time - Venue or location - Short description - Optional
dress code - Optional event-specific image/illustration - Optional "View
details" interaction

**Visual design** - Elegant cards with rounded corners, subtle shadows,
and floral/gold details. - Use a responsive grid on desktop and a
single-column or horizontal carousel on mobile. - Use clear date/time
typography. - Keep event information in real text, not embedded in
images.

**Character interaction** - Haldi: couple performs a playful, cheerful
reaction; optional turmeric-coloured decorative splash, kept tasteful. -
Mehendi: bride shows her hands or a gentle hand gesture; groom reacts
with a smile. - Sangeet: couple performs a short dance animation. -
Wedding: couple performs a graceful greeting/celebratory gesture. -
Reception: couple waves or poses together.

Do not require a separate animation file for every card if the same
character rig can switch state and use small event-specific variations.

### 6.5 Venue section --- Google Maps

**Purpose:** Help guests reach the venue easily.

**Content placeholders** - `[VENUE_NAME]` - `[VENUE_ADDRESS]` -
`[CITY]` - `[POSTAL_CODE]` - `[GOOGLE_MAPS_URL]` - Optional `[LATITUDE]`
and `[LONGITUDE]` - Optional parking, landmark, accommodation, or
contact information.

**Visual design** - Venue name and full address. - Venue photo, if
supplied. - Map preview or map embed, if permitted and configured. - A
prominent CTA: **"Open in Google Maps"**.

**Functionality** - The button must open the configured Google Maps
destination in a new browser tab/app. - Prefer a Google Maps directions
URL based on the supplied venue address or coordinates. - Do not
hardcode a guessed venue. - If the map embed is unavailable, the address
and external Maps link must still work. - Provide a copy-address action
if practical.

**Character animation** - Couple stands beside the venue information or
points towards the map card. - Keep the map itself unobstructed and
usable.

### 6.6 Send wishes section

**Purpose:** Let guests send blessings in a simple, delightful way.

**Form fields** - Guest name --- required. - Wish/message ---
required. - Optional phone number only if there is a genuine need; do
not collect unnecessary personal data.

**UI** - Heading: **"Send Your Wishes"** - Supporting text: "Your
blessings mean the world to us!" - Name input. - Message text area. -
Primary CTA: **"Send Wishes"**. - Optional heart or flower decorative
detail.

**Validation** - Name cannot be blank. - Message cannot be blank. - Trim
leading/trailing whitespace. - Set reasonable maximum lengths and show a
helpful validation message. - Disable the submit button while the
request is in progress to prevent duplicate submissions. - Show a
visible error if submission fails.

**Submission behaviour** - Connect to a configurable backend endpoint or
server action. - Do not assume a database, API, email provider, or
messaging service has been selected. - Keep the wish-submission service
isolated behind a small API/service module so the backend can be
connected later. - Do not silently discard a message and show success. -
If backend integration is not configured, show a clearly labelled
development/demo state rather than claiming that a wish was sent.

**Success animation** 1. Submit the wish. 2. Wait for confirmed success.
3. Transition the couple to `thank_you`. 4. Both characters fold their
hands in namaste and bow slightly. 5. Show a small heart/petal/flower
animation. 6. Display: "Thank you for your beautiful wishes!" 7.
Optionally provide "Send another wish".

**Privacy** - Do not expose guest messages publicly unless the couple
explicitly requests a public wishes wall. - Do not display guest phone
numbers or other personal details.

### 6.7 Thank-you / closing section

**Purpose:** End the invitation with a memorable emotional moment.

**Visual design** - Deep navy night scene. - Illuminated palace or
wedding venue. - Warm lanterns, diyas, flowers, and subtle fireworks. -
Couple shown from behind or in a graceful front-facing pose. - Gold
script-style "Thank You!" heading. - Supporting line: "We can't wait to
celebrate with you!"

**Character animation** - Couple performs the `thank_you` namaste
pose. - Fireworks or sparkles appear briefly. - Return to a calm idle
pose. - CTA: "Back to Invitation" or "Explore Again".

Do not run intense fireworks continuously. Keep the scene lightweight
and respect reduced-motion settings.

------------------------------------------------------------------------

## 7. Visual design system

### 7.1 Colour palette

Use these as initial design tokens. Adjust shades for contrast and
consistency after implementation.

  Token              Suggested value   Usage
  ------------------ ----------------- -----------------------------
  `--navy`           `#101A35`         Night/palace backgrounds
  `--deep-maroon`    `#7B1E2B`         Primary buttons and accents
  `--wine`           `#5A1724`         Dark red details
  `--antique-gold`   `#C49A52`         Borders, icons, ornaments
  `--warm-gold`      `#E6BD70`         Highlights and glow
  `--ivory`          `#FFF7E9`         Main light background
  `--cream`          `#F4E5CC`         Secondary background
  `--blush`          `#F3C7C2`         Floral and romantic accents
  `--text-dark`      `#422B27`         Text on light backgrounds
  `--text-light`     `#FFF8ED`         Text on dark backgrounds

Maintain WCAG-friendly text contrast. Do not use gold text for long body
copy on cream backgrounds.

### 7.2 Typography

Use a refined pairing: - **Display/headings:** Elegant serif font, for
example Cormorant Garamond or Playfair Display. - **Names / decorative
script:** A readable script font, used sparingly. - **Body / controls:**
Clean sans-serif font, for example Inter or Lato.

Use script fonts only for names, short romantic phrases, and decorative
headings. All important dates, addresses, labels, and instructions must
remain easy to read.

### 7.3 Decorative language

Use: - Marigold garlands. - Rose and floral corners. - Ornamental arches
and mandala-inspired separators. - Diyas and warm lanterns. - Subtle
gold borders. - Palace/mandap silhouettes. - Small heart motifs where
appropriate.

Avoid putting every decorative element in every section. Give each
section breathing room.

### 7.4 Buttons and cards

-   Primary buttons: deep maroon background, ivory text, rounded shape,
    subtle gold or warm shadow.
-   Secondary buttons: ivory/transparent background with maroon or gold
    border.
-   Hover: slight lift, glow, or colour shift.
-   Press/tap: small scale-down feedback.
-   Focus: clearly visible keyboard focus ring.
-   Cards: warm ivory surfaces, rounded corners, restrained shadows,
    consistent spacing.

------------------------------------------------------------------------

## 8. Responsive design requirements

### Mobile

Mobile is a first-class experience, not a reduced desktop layout.

-   Use a single-column section flow.
-   Keep the couple visible without covering headings or controls.
-   Scale characters proportionally and avoid cropping heads, hands, or
    important clothing details.
-   Make buttons and form controls comfortably touchable (target
    approximately 44×44 CSS pixels or larger).
-   Use a compact navigation/menu if needed.
-   Avoid hover-dependent functionality.
-   Keep the Google Maps CTA prominent.
-   Ensure the wish form fits the viewport and is easy to type into.
-   Reduce particle counts and animation complexity on lower-powered
    devices.

### Tablet

-   Use two-column layouts where content remains readable.
-   Event cards may use two columns.
-   Keep character and text areas balanced.

### Desktop

-   Use wide palace scenes and larger character compositions.
-   Use two- or three-column event grids where appropriate.
-   Avoid excessive empty space or over-wide paragraphs.
-   Keep the content width controlled for readability.

Test at minimum: - 360px mobile width - 390px mobile width - 768px
tablet width - 1024px laptop/tablet landscape - 1440px desktop width

------------------------------------------------------------------------

## 9. Navigation and interaction details

-   Use smooth scrolling for section navigation.
-   A small sticky navigation may include: Our Story, Events, Venue,
    Wishes.
-   The welcome screen should have a clear entry CTA.
-   Do not force users to complete the opening animation.
-   Keep a persistent way to reach the venue and event information.
-   Use semantic buttons for actions and links for navigation.
-   Ensure all interactive elements work with keyboard and touch.
-   Avoid nested clickable elements.
-   Do not make decorative characters intercept clicks intended for
    buttons or links; set appropriate pointer-event behaviour.

## 10. Audio

Background music is optional, not mandatory.

If implemented: - Never autoplay audio with sound before user
interaction. - Provide a visible play/pause or mute/unmute control. -
Use only properly licensed or user-provided music. - Remember the user's
choice during the current page session if practical. - Ensure the
website remains complete and understandable with audio off.

## 11. Accessibility and reduced motion

-   Respect `prefers-reduced-motion`.
-   In reduced-motion mode, replace long character movements with short
    fades or static poses.
-   Provide a static poster/fallback for the animated couple.
-   Do not communicate essential information through animation alone.
-   Add alt text for meaningful images; decorative images should have
    empty alt text.
-   Use semantic heading order and form labels.
-   Ensure keyboard navigation and visible focus.
-   Maintain sufficient contrast.
-   Avoid flashing effects.
-   Ensure the site remains usable if Rive or another animation runtime
    fails to load.

## 12. Technical implementation guidance

The exact framework can follow the existing project setup. If starting
from scratch, a suitable default is: - React with TypeScript (Next.js is
a suitable option). - Rive web runtime for character animation. - Framer
Motion or CSS for UI/section transitions. - CSS variables/design tokens
for the palette and spacing. - A small configuration/data file for all
wedding details. - A separate service module for wish submission. - A
configurable Google Maps URL.

Do not introduce a large state-management library for this small
invitation unless the project already uses one.

### Suggested component structure

``` text
src/
  app/ or pages/
    page.tsx
    layout.tsx
  components/
    WeddingExperience/
      WeddingExperience.tsx
    Hero/
      WelcomeScene.tsx
      PalaceBackground.tsx
    Couple/
      CoupleCharacter.tsx
      CoupleAnimationController.ts
      CoupleFallback.tsx
    Invitation/
      InvitationSection.tsx
    Story/
      OurStorySection.tsx
      StoryTimeline.tsx
    Events/
      EventsSection.tsx
      EventCard.tsx
    Venue/
      VenueSection.tsx
      GoogleMapsButton.tsx
    Wishes/
      WishesSection.tsx
      WishesForm.tsx
      ThankYouMessage.tsx
    Closing/
      ClosingSection.tsx
    Navigation/
      SectionNavigation.tsx
    Effects/
      PetalEffect.tsx
      FireworksEffect.tsx
    common/
      Button.tsx
      SectionHeading.tsx
  config/
    weddingDetails.ts
  services/
    wishesService.ts
  styles/
    tokens.css
    globals.css
public/
  animations/
    couple.riv
  images/
    palace/
    venue/
    floral/
  audio/
```

Adapt the structure to the repository's existing conventions rather than
forcing this exact tree.

### Configuration-driven wedding data

Keep content out of presentation components. Create a single typed
configuration object similar to:

``` ts
export type WeddingEvent = {
  id: string;
  name: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
  description?: string;
  dressCode?: string;
  image?: string;
  animation?: "haldi" | "mehendi" | "dancing" | "wedding" | "celebration";
};

export const weddingDetails = {
  brideName: "[BRIDE_NAME]",
  groomName: "[GROOM_NAME]",
  familyInvitationText: "[FAMILY_INVITATION_TEXT]",
  weddingDate: "[WEDDING_DATE]",
  weddingTime: "[WEDDING_TIME]",
  venue: {
    name: "[VENUE_NAME]",
    address: "[VENUE_ADDRESS]",
    googleMapsUrl: "[GOOGLE_MAPS_URL]",
    latitude: undefined,
    longitude: undefined
  },
  events: [] as WeddingEvent[],
  storyMilestones: []
};
```

Replace placeholders with confirmed details when available. Do not ship
placeholder text as if it were real wedding information.

### Character component contract

The character component should expose a small API conceptually similar
to:

``` ts
type CoupleScene =
  | "welcome"
  | "invitation"
  | "story"
  | "haldi"
  | "mehendi"
  | "sangeet"
  | "wedding"
  | "venue"
  | "wishes"
  | "thank-you";

type CoupleAction =
  | "greeting"
  | "walking"
  | "look-at-partner"
  | "happy"
  | "dancing"
  | "celebrating"
  | "thank-you"
  | "wave";

type CoupleCharacterProps = {
  scene: CoupleScene;
  onActionComplete?: (action: CoupleAction) => void;
  reducedMotion?: boolean;
};
```

The implementation may differ, but keep animation control centralised.
Avoid embedding animation logic in every section.

## 13. Performance requirements

-   Lazy-load below-the-fold animation and image assets.
-   Preload only the hero assets required for the first meaningful view.
-   Use compressed WebP/AVIF images where appropriate.
-   Keep Rive assets optimised.
-   Avoid loading multiple large animation runtimes.
-   Use transform/opacity-based animation where possible.
-   Avoid expensive layout-triggering animations.
-   Limit particle counts on mobile.
-   Provide image dimensions/aspect ratios to prevent layout shifts.
-   Avoid delaying the main invitation content while non-essential
    assets load.

## 14. SEO and sharing

-   Set a meaningful page title and description using the couple's names
    and wedding date once supplied.
-   Add Open Graph metadata and a social-sharing preview image.
-   Ensure the invitation link looks good when shared through WhatsApp.
-   Use a suitable favicon/monogram.
-   Avoid exposing private guest information in page metadata or public
    URLs.

## 15. Functional acceptance criteria

The website is considered ready when all of the following are true:

### Visual and content

-   [ ] The design follows the royal Indian wedding visual direction.
-   [ ] Bride and groom use consistent 3D character designs and
    traditional outfits.
-   [ ] All wedding details are driven by configuration rather than
    scattered hardcoded strings.
-   [ ] Placeholder details are clearly identified and easy to replace.
-   [ ] All sections are visually consistent and responsive.

### Character animation

-   [ ] Couple has a subtle idle animation.
-   [ ] Welcome CTA triggers a walking/entrance transition.
-   [ ] Invitation opening triggers a greeting/namaste.
-   [ ] Couple can look at each other during romantic/story moments.
-   [ ] Sangeet triggers dancing.
-   [ ] Event interactions trigger suitable reactions.
-   [ ] Successful wish submission triggers a thank-you animation.
-   [ ] Character animation has a fallback if the Rive asset fails.
-   [ ] Reduced-motion preference is respected.

### Website functionality

-   [ ] Navigation scrolls to the correct sections.
-   [ ] Event cards display configured details.
-   [ ] Google Maps button opens the configured destination.
-   [ ] Wish form validates name and message.
-   [ ] Wish submission has loading, success, and error states.
-   [ ] Success is displayed only after confirmed submission.
-   [ ] No duplicate submission occurs from repeated clicks.
-   [ ] Audio, if present, requires user interaction and has controls.

### Quality

-   [ ] Layout works at the specified mobile, tablet, and desktop
    widths.
-   [ ] Keyboard navigation and visible focus states work.
-   [ ] No important information is hidden behind animation.
-   [ ] No console errors or broken assets.
-   [ ] Images and animations load efficiently.
-   [ ] Site remains usable with reduced motion and audio disabled.

------------------------------------------------------------------------

## 16. Suggested implementation sequence

Build in stages so the design can be reviewed before backend
integration.

**Phase 1 --- Visual foundation** 1. Set up the page shell, fonts,
colour tokens, and decorative assets. 2. Build the responsive welcome,
invitation, story, events, venue, wishes, and closing sections. 3. Use
temporary character placeholders only where the final Rive asset is not
yet ready. 4. Review the full desktop and mobile layouts.

**Phase 2 --- Character animation** 1. Create/import the consistent 3D
bride and groom assets. 2. Build the Rive state machine and named
inputs. 3. Implement the character controller. 4. Connect CTA, event,
section, and wishes interactions to the animation states. 5. Add
fallback and reduced-motion behaviour.

**Phase 3 --- Functional integration** 1. Connect the Google Maps
destination. 2. Connect the wish submission API. 3. Add validation,
loading, success, and error handling. 4. Add calendar functionality if
the event data is available. 5. Add optional music only if licensed
audio is supplied.

**Phase 4 --- Polish and testing** 1. Tune animation timing and
transitions. 2. Optimise assets and mobile performance. 3. Test
accessibility and reduced-motion behaviour. 4. Test WhatsApp/social link
previews. 5. Replace all placeholders with verified wedding details.

------------------------------------------------------------------------

## 17. Instructions for GitHub Copilot

Use this document as the complete design brief. Before coding:

1.  Inspect the existing repository and identify its framework, package
    manager, conventions, and current dependencies.
2.  Reuse the existing stack where possible. Do not replace the
    framework or restructure the repository unnecessarily.
3.  Present a short implementation plan and identify any missing assets
    or configuration values.
4.  Build the complete responsive visual experience with all sections.
5.  Keep wedding data, animation control, and wish submission logic
    separate from presentation components.
6.  Do not invent names, dates, event details, venue details, or API
    endpoints.
7.  Use a real interactive animation implementation for the bride and
    groom. If the Rive file is not supplied, build the integration
    contract and a clearly labelled fallback, and state what asset is
    required.
8.  Do not claim that wishes are sent unless a real backend confirms
    success.
9.  Ensure all controls work; do not create decorative buttons that do
    nothing.
10. Run the project's available lint, type-check, and build commands,
    and fix issues introduced by the implementation.
11. At the end, report what was implemented, what requires supplied
    assets/configuration, and how to run the website.

## 18. Details and assets still to be supplied

The visual and interaction direction is defined, but the following
real-world content has not yet been confirmed. Keep these as
configuration values until supplied.

-   Bride's name
-   Groom's name
-   Family names / invitation wording
-   Wedding date and time
-   Event list, dates, times, and descriptions
-   Venue name and full address
-   Google Maps URL or venue coordinates
-   Optional couple photographs
-   Optional venue photograph
-   Optional story milestones
-   Whether wishes should be stored, emailed, or sent to another service
-   Backend/API details for wish submission
-   Whether background music is desired and the licensed audio file

**Do not block the initial visual implementation on these details.**
Build the website with clearly marked placeholders and make the content
easy to configure later.

------------------------------------------------------------------------

**End of design specification.**


## Project-specific decisions confirmed after initial design
- This is an arranged marriage. Do not create an “Our Story” dating timeline or invent relationship milestones. Use a family-blessing / joyful-union section instead.
- No real photographs will be used. Use generated stylised wedding artwork and character assets only.
- Add optional instrumental background music with an explicit play/pause control. Do not autoplay. The user must supply a licensed audio file at `public/audio/wedding-instrumental.mp3`.
- Add an “Add to Calendar” action that downloads an `.ics` invitation. It must remain configurable and must not invent a wedding date or time.
- The desired character direction is a persistent, expressive 3D bride-and-groom companion that remains present across the scrolling website and reacts to section changes. True real-time 3D rotation and articulated movement require a rigged GLB model and animation clips; do not claim that a 2D render is a fully rigged 3D model.
