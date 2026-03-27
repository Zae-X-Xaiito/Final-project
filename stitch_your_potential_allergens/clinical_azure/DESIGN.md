# Clinical Azure Design System

### 1. Overview & Creative North Star
**Creative North Star: The Trusted Clinician.**
Clinical Azure is designed to bridge the gap between cold medical utility and approachable wellness guidance. It eschews the "app-like" density of traditional health trackers in favor of a high-end editorial experience. By utilizing generous whitespace, tight typographic tracking, and a palette of deep sea-blues, the system projects an aura of calm, expert authority.

The system breaks the standard grid through **intentional verticality**—using long-form scrolling sections with distinct background shifts rather than boxed-in containers.

### 2. Colors
The palette is built on a "Fidelity" logic, ensuring the primary brand blue (#2a5d83) remains the anchor across all interactive states.

- **The "No-Line" Rule:** Visual separation must be achieved through background shifts (e.g., moving from `surface_bright` to `surface_container_low`) or the `outline_variant` at 10% opacity. Never use heavy 1px solid black or dark gray borders.
- **Surface Hierarchy:** 
    - **Base:** `surface_bright` (#ffffff) for primary content areas.
    - **Nesting:** Use `secondary_container` (5% Primary) for "step" cards or secondary info modules to create soft, non-intrusive depth.
- **Glass & Gradient:** Floating elements like the Navigation bar use `white/90` with a `backdrop-blur-md` to maintain context while scrolling.
- **Signature Textures:** Hero CTA blocks utilize deep solid fills with floating semi-transparent geometric accents (e.g., `white/10` circles) to create a sense of bespoke graphic design.

### 3. Typography
The system uses **Inter** exclusively, relying on weight and tracking to create hierarchy.
- **Display/Headline:** Uses `font-black` (900 weight) with tight tracking (`-0.03em`) and a leading of `1.1`. This creates a "news-headline" impact that feels urgent yet professional.
- **Body Scale (Ground Truth):**
    - **Display Large:** 2.25rem (36px) — Primary Headlines.
    - **Headline Medium:** 1.875rem (30px) — Section Headers.
    - **Title Large:** 1.5rem (24px) — Feature headers.
    - **Body Large:** 1.125rem (18px) — Intro text and primary descriptions.
    - **Body Medium:** 1rem (16px) — Standard UI text and list items.
    - **Label Small:** 0.75rem (12px) — Footer links and legal disclaimers.

### 4. Elevation & Depth
Clinical Azure uses **Tonal Layering** and specific shadow weights found in the source to define the Z-axis.

- **Shadow Scale (Ground Truth):**
    - `shadow-sm`: Used for primary list cards to give a subtle "lift" from the background.
    - `shadow-md`: Reserved for primary action buttons to invite clicking.
    - `shadow-lg`: Used for hero imagery and media containers.
    - `shadow-xl`: Reserved for high-impact CTA sections (e.g., the bottom conversion card).
- **The Layering Principle:** Rather than shadows, use "recessed" containers. A `surface_container_low` background with `surface_bright` cards creates a natural, soft elevation without the visual clutter of multiple shadow layers.

### 5. Components
- **Buttons:** Primary buttons are high-contrast (`primary` background with `white` text), featuring `rounded-xl` (12px) corners and a height of `h-14` for touch-target prominence.
- **Iconography:** Use "Material Symbols Outlined" with a custom weight of 400. Icons should often be housed in `primary/10` circular or rounded-square containers to act as "soft bullets."
- **Navigation:** Sticky top-bars must use a `backdrop-blur-md` to suggest a layer of "glass" over the medical data.
- **Cards:** Use `border-primary/5` (5% opacity primary color) to provide a "Ghost Border" that guides the eye without creating a hard visual stop.

### 6. Do's and Don'ts
- **Do:** Use `font-black` for headlines to maintain the editorial "Clinical Azure" look.
- **Do:** Use `text-primary/60` for secondary icons and decorative elements.
- **Don't:** Use standard blue links. All interactivity should be either Primary Blue or weighted text within a container.
- **Don't:** Use sharp corners. The `rounded-xl` (12px) and `rounded-2xl` (16px) radius is essential for the "approachable health" aesthetic.
- **Don't:** Overcrowd the layout. Maintain the `spacing: 2` (Normal/Spacious) rhythm to ensure clinical clarity.