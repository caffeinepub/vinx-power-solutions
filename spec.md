# Vinx Power Solutions

## Current State
- Navbar uses a Zap icon placeholder instead of the uploaded company logo (`/assets/Vinx.jpg`)
- Footer also uses a Zap icon placeholder instead of the logo
- Theme is very dark navy (background `0.10–0.14 lightness`) making it feel heavy
- Contact section shows placeholder address "Mumbai, Maharashtra, India" with fake phone/email

## Requested Changes (Diff)

### Add
- Use uploaded logo image (`/assets/Vinx.jpg`) in Navbar and Footer

### Modify
- Navbar: Replace Zap icon + text with `<img src="/assets/Vinx.jpg" />` logo
- Footer: Replace Zap icon + text with `<img src="/assets/Vinx.jpg" />` logo
- index.css: Lighten the background and card/surface tokens so the theme feels less heavy (increase background lightness from ~0.10–0.14 to ~0.20–0.24 range while keeping the navy identity)
- ContactSection: Update address to a realistic Vinx Power Solutions address (to be confirmed, use a reasonable placeholder for now like "Nagpur, Maharashtra, India" or similar that's not a generic "Mumbai" placeholder)

### Remove
- Lucide `Zap` icon usage from Navbar and Footer brand marks

## Implementation Plan
1. Update `index.css` CSS variables to lighten background, card, popover, navy-deep, navy-mid, navy-surface tokens
2. Update `Navbar.tsx` to use `<img>` with `/assets/Vinx.jpg` instead of the Zap icon div
3. Update `Footer.tsx` similarly
4. Update `ContactSection.tsx` contactInfo address to correct/better value
5. Validate build
