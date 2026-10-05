# LOCK//IN Fitness

A gamified Solo Leveling-style fitness app that runs entirely in the browser. Daily quests, XP, ranks (E through S), Full Body A/B workouts, a 90-second rest timer, meal missions, and a weight log — plus the two ideas that make it more than a tracker:

- **Penalty Vault** — fail a mission, forfeit something real (mine was a sealed Pokémon pack).
- **Content Capture** — wins and fails become story beats for content.

## Run it

```bash
python3 server.py
```

Open http://127.0.0.1:8080. Python 3.9+, no third-party packages, no API keys. Workouts, weight, food entries, and XP stay in the browser's `localStorage`; only barcode lookups hit the network (Open Food Facts, barcode only).

## What's in v0.2
Dated food log with calories/macros, barcode lookup via a tiny local Python server, camera barcode capture where the browser supports it. Migrates v0.1 data forward on first launch.

## `v0.1/`
The original browser-only prototype — same quest/XP core, no server. Kept for the iteration history.

## Stack
Vanilla HTML/CSS/JS · 76-line Python server · Open Food Facts API

Built by [Misael Payan](https://github.com/hyperwumpus). Small, honest, working software.
