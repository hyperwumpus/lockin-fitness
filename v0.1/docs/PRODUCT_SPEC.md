# Product Spec — LOCK//IN SYSTEM

## Product thesis
Most productivity and fitness apps assume that reminders are enough. LOCK//IN is built for people who dismiss reminders and only respond when a commitment feels real. It converts intentions into missions with deadlines, verification, escalation, meaningful stakes and a visible progression system.

## Primary user story
“I already know what I should do. I need a System that tells me what happens now, verifies that I did it, and makes ignoring it more costly than executing it.”

## V0.1 loop
1. System presents today’s required missions.
2. User executes training and meals with minimal choice.
3. Completion generates XP/progress.
4. Failure can trigger a precommitted consequence and Penalty Vault entry.
5. Meaningful events are automatically added to Content Capture.
6. Weekly recap becomes progress review + creator episode material.

## Core modules
### Today / System
- Required missions
- deadlines (future)
- XP / rank / streak
- next-action directive
- fallback protocol

### Train
- workout A/B
- exercise checklist
- rest timer
- Hart / home substitutions
- Minimum Mission
- later: calisthenics skill tree and progression testing

### Fuel
- predefined meals
- protein target
- later: calories/macros, barcode scan, saved foods and repeat meals

### Penalty System
- required-mission failure
- Pokémon Penalty Vault / monetary or creator consequence types
- physical penalty templates that are hard but safe/scalable
- limited emergency overrides
- no dangerous punishments

### Progress
- weight
- measurements (future)
- strength and skill milestones (future)
- streak / completion rate
- body composition photos (future, private by default)

### Content Capture
System event → story event.
Examples:
- first successful week
- first failure
- Penalty Vault activation
- new lowest weight
- first pull-up
- side quest accepted/completed
- challenge/competition joined
- app feature built because real-world use exposed a problem

## Data model for native build
- UserProfile
- Mission
- MissionCompletion
- WorkoutTemplate
- Exercise
- ExerciseSet
- MealTemplate
- FoodLog
- ProgressEntry
- PenaltyRule
- PenaltyEvent
- Reward
- SideQuest
- ContentMoment
- WeeklyReview

## Native requirements later
- SwiftUI
- SwiftData
- AlarmKit where available
- UserNotifications
- HealthKit
- VisionKit / camera barcode path or third-party scanner
- food database API
- optional Screen Time / FamilyControls research for entertainment lockout

## Design direction
Dark, minimal, System-like. Avoid generic esports clutter. High-contrast typography, sparse violet/cyan accents, sharp status states, occasional full-screen System notifications. The app should feel serious enough to create urgency, not like a toy habit tracker.
