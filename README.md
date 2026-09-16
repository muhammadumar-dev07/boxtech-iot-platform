# 📡 BoxTech IoT Platform — Facility Dashboard

A multi-site facility monitoring dashboard for the BoxTech IoT Platform — real-time device status, sensor trends, and alerts across temperature/humidity, occupancy, and door/leak sensors.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Charts-8884d8)
![Status](https://img.shields.io/badge/Status-Frontend_Only-lightgrey)

**🔗 Live preview:** _[add deployed URL]_
**📦 Repo:** _[(https://github.com/muhammadumar-dev07/boxtech-iot-platform.git)]_

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Design Process](#-design-process)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Data Handling](#-data-handling)
- [Responsive Design](#-responsive-design)
- [Design Decisions & Trade-offs](#-design-decisions--trade-offs)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Acknowledgments](#-acknowledgments)

---

## 🔍 Overview

The dashboard gives facility staff a single view of every connected sensor across a site — device counts, live status, environmental trends, and active alerts — built to be legible at a glance for a non-technical viewer, not just an engineer.

## ✨ Features

- 📊 KPI summary row — total devices, avg temperature/humidity, occupancy, active alerts, offline count
- 📈 7-day sensor trend chart (temperature vs. humidity, dual-axis) with 24h / 7d / 30d range toggle
- 🩺 System health breakdown — online / warning / alarm / offline, at a glance
- 🚨 Recent alerts panel with clear severity badges
- 🔎 Searchable, filterable, paginated device fleet (300+ mock devices)
- 📱 Fully responsive — desktop, tablet, and mobile, independently verified

## 🎨 Design Process

The UI was designed in **Google Stitch**, iterated from a facility-overview concept into a full design system — color tokens, a type scale (Space Grotesk for headings/metrics, Inter for body/data), spacing, elevation, component states, and responsive breakpoints, all defined explicitly rather than left to framework defaults.

Implementation was AI-assisted (Google AI Studio, working from the Stitch export as ground truth) and human-directed: I authored the build specs — exact design tokens, the data model, and the tech stack decisions below — then iteratively reviewed each pass against the design and issued targeted fixes: first tablet/mobile responsiveness, then a navbar regression (zone toggle and branding conflicting on mobile) resolved without disturbing the already-correct desktop and tablet layouts.

## 🛠️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| ⚛️ Framework | React 18 + Vite | Fast dev loop, no SSR overhead needed for a frontend-only dashboard |
| 📝 Language | JavaScript | Kept scope lean for a frontend-only deliverable |
| 🎨 Styling | Tailwind CSS, custom theme | Config extended with exact design-system tokens (colors, radii, shadows) instead of Tailwind defaults, for pixel accuracy to the design |
| 🧭 Routing | React Router v6 | Dashboard is fully built; other nav destinations are real routes, currently placeholders |
| 📈 Charts | Recharts | Dual-axis line chart (°F / %) with a custom tooltip and reference line — fit Recharts' component API directly |
| 🔤 Icons | `@untitledui/icons` | Design's color tokens come from the Untitled UI system, so icons share the same visual language instead of a generic default set |
| 🗂️ Data | Local mock JSON + React state/hooks | No backend in scope; mock data shaped to a realistic device schema |

## 📁 Project Structure

```
src/
├── components/
│   ├── ConnectedFleet.sx          
│   ├── KpiRow.jsx          
│   ├── Navbar.jsx           
│   ├── RecentAlertsPanel.jsx          
│   ├── SensorTrendsChard.jsx          
│   ├── Sidebar.jsx          
│   ├── SpotlightCards.jsx          
│   └── SystemHealthDonut.jsx            
├── pages/
│   └── Dashboard.jsx     
│   └── PlaceholderPage.jsx     
├── routes/                # Dashboard, Devices, Alerts, Analytics, Settings
├── App.jsx
└── main.jsx
```

## 📊 Data Handling

Each device follows a fixed schema:

```json
{
  "device_id": "string",
  "type": "temperature_humidity | occupancy | door_leak",
  "location": "string (zone)",
  "readings": {
    "temperature_c": "number (temperature_humidity only)",
    "humidity_pct": "number (temperature_humidity only)"
  },
  "battery_pct": "number",
  "status": "online | offline | warning | alarm"
}
```

- A device missing a reading (e.g. offline) renders a clear placeholder state, never a blank or broken card.
- `offline`/`alarm` status is always visually distinct — a status dot everywhere in the UI, and a full colored badge specifically in Recent Alerts, so degraded devices are never ambiguous.
- The device fleet is paginated and filterable by type/status so the UI stays usable at scale.

## 📱 Responsive Design

Each breakpoint was verified independently, so a fix at one width never regresses another.

| Breakpoint | Width | Layout |
|---|---|---|
| 🖥️ Desktop | 1200px+ | Full 12-column layout, 6-across KPI row, chart + system health side by side |
| 📟 Tablet | 768–1199px | 8-column layout, stacked chart/health section, zone toggle stays in the top navbar |
| 📱 Mobile | <768px | 4-column layout, sidebar collapses to an off-canvas drawer (zone toggle lives here only), navbar branding sized down, all card rows stack to one column, 40–44px minimum touch targets |

## 💡 Design Decisions & Trade-offs

- **Status as a dot, not a badge, everywhere except Recent Alerts** — keeps the dashboard visually neutral so status colors stay meaningful across dozens of device cards; badges are reserved for the one place that needs immediate attention.
- **No backend/live data** — out of scope for this deliverable; mock data is schema-accurate so wiring in a real API later is a data-layer swap, not a UI rework.
- **Placeholder routes for Devices/Alerts/Analytics/Settings** — sidebar navigation is fully wired rather than dead links, so the information architecture is real even though only the Dashboard view is built out.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## 🌐 Deployment

Deployable as a static site to **Vercel**, **Netlify**, or **GitHub Pages** — no backend or environment variables required.

## 🙏 Acknowledgments

- [Google Stitch](https://stitch.withgoogle.com/) — initial UI design and design system
- Google AI Studio — AI-assisted implementation from the design spec
- [Untitled UI](https://www.untitledui.com/) — design tokens and icon set
- [Recharts](https://recharts.org/) — charting library
