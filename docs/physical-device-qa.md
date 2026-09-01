# Physical-device release checklist

Responsive browser emulation is useful, but it does not replace this checklist on actual hardware.

## Test matrix

| Device | Browser | Minimum coverage |
| --- | --- | --- |
| iPhone (current iOS) | Safari | Portrait, landscape, audio, install/offline |
| Android phone | Chrome | Portrait, back button, OCR camera, audio |
| iPad | Safari | Portrait, landscape, Shop and lesson modals |
| Android tablet | Chrome | Landscape navigation, long lists, handwriting canvas |
| Desktop | Chrome + Safari/Edge | Keyboard, focus, resize, cloud login |

## Critical flow

1. Complete onboarding and reload the page.
2. Finish one lesson, one game, one review, and one story.
3. Confirm XP, gems, streak, mistakes, and the weekly challenge update.
4. Open Shop, switch every category, preview an item, purchase it, and equip it.
5. Test female and male audio for Mainland, Taiwan, and Hong Kong presets.
6. Sign in with Google on device A, then verify the same progress on device B.
7. Take a photo for OCR, save a result, and confirm it appears in My Library.
8. Draw Hanzi with touch and confirm undo, clear, candidate selection, and stroke guidance.
9. Download an offline pack, enable airplane mode, reopen the app, and complete an activity.
10. Restore connectivity and confirm pending progress synchronizes once.

## Visual and accessibility checks

- No horizontal page overflow at any orientation.
- Bottom navigation does not cover the final button or card.
- Modals scroll independently and preserve a visible close button.
- Text remains readable at Small, Medium, and Large font settings.
- Light and dark modes keep controls, disabled states, and feedback legible.
- Tap targets feel comfortable and show pressed/focus feedback.
- Reduced-motion mode removes nonessential animation.

Record the device model, OS version, browser version, pass/fail result, screenshot, and issue link for every failed row before calling the release physically verified.
