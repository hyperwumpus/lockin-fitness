# LOCK//IN SYSTEM — V0.1

A functional first prototype of a real-life “System” for fitness execution and creator storytelling.

## What works now
- Daily quest checklist with XP, levels and ranks.
- Full Body A/B workout execution and 90-second rest timer.
- Hart / home / Minimum Mission logic.
- Meal missions and manual protein tracking.
- Weight logging.
- Penalty Vault for real-stakes consequences such as sealed Pokémon packs.
- Content Capture feed that turns wins, failures, weigh-ins and side quests into story beats.
- Local persistence in the browser via `localStorage`.

## Run it
Open `app/index.html` in a modern browser. No server or install is required for this prototype.

For local development, any static server works, for example:

```bash
python3 -m http.server 8080 -d app
```

Then open `http://localhost:8080`.

## Why V0.1 is browser-based
This build proves the core System loop quickly and makes it easy to change the rules. The planned iPhone build should be native (SwiftUI) once the core loop feels right because alarm escalation, background scheduling, haptics, HealthKit, Screen Time controls and other phone-level behavior need native APIs/entitlements.

## Next milestone — V0.2 Native iPhone shell
1. Rebuild Today/Train/Fuel/Stats/Content in SwiftUI.
2. Persist with SwiftData.
3. Add AlarmKit-based wake/mission alarms where supported.
4. Add notification escalation and QR/NFC completion challenges.
5. Add HealthKit step/workout data.
6. Add barcode food lookup.
7. Add configurable penalty rules and limited emergency overrides.

## Safety contract
The “System” can create meaningful stakes but may not require self-injury, deliberate dehydration, food deprivation, training through injury/illness, electrical shock, sleep deprivation, or reckless exhaustion. Physical penalties should be scalable conditioning or movement that remains within the user’s established capability.
