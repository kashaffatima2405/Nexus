# Nexus — Architecture & Project Documentation

**Project:** Business Nexus — Investor & Entrepreneur Collaboration Platform
**Intern:** Kashaf Fatima
**Internship:** DevelopersHub Corporation — Frontend Development
**Week 1, Milestone 1:** Setup & Familiarization

---

## 1. Project Overview

Business Nexus is a React + TypeScript web application that connects **Investors** and **Entrepreneurs**. Investors can browse startups, manage a portfolio, and track deals. Entrepreneurs can showcase their startup and connect with investors. The app includes authentication, dashboards, messaging, document handling, and profile management.

---

## 2. Tech Stack

| Technology | Purpose |
|---|---|
| React + TypeScript | Core UI framework with type safety |
| Vite | Build tool / dev server |
| Tailwind CSS | Utility-first styling |
| React Router | Page navigation/routing |
| Vercel | Deployment platform |

---

## 3. Folder Structure

```
Nexus/
├── public/                  Static assets
├── src/
│   ├── components/          Reusable UI building blocks
│   │   ├── chat/            Chat-related UI (message bubbles, input box)
│   │   ├── collaboration/   Shared collaboration widgets
│   │   ├── entrepreneur/    Components specific to entrepreneur view
│   │   ├── investor/        Components specific to investor view
│   │   ├── layout/
│   │   │   ├── DashboardLayout.tsx   Wraps every dashboard page (sidebar + navbar + content area)
│   │   │   ├── Navbar.tsx            Top navigation bar
│   │   │   └── Sidebar.tsx           Left sidebar menu
│   │   └── ui/               Generic reusable elements (buttons, cards, inputs)
│   │
│   ├── pages/                One folder per route/feature
│   │   ├── auth/              Login & Signup pages
│   │   ├── chat/              Chat page
│   │   ├── dashboard/         Investor & Entrepreneur dashboards
│   │   ├── deals/             Deals listing/management page
│   │   ├── documents/
│   │   │   └── DocumentsPage.tsx     Document upload/preview page
│   │   ├── entrepreneurs/     Browse entrepreneurs (investor side)
│   │   ├── help/              Help & Support page
│   │   ├── investors/         Browse investors (entrepreneur side)
│   │   ├── messages/          Messages/inbox page
│   │   ├── notifications/     Notifications page
│   │   ├── profile/           User profile page
│   │   └── settings/          Account settings page
│   │
│   ├── context/               React Context — global state (e.g. logged-in user/session)
│   ├── data/                  Mock/demo data used to populate the UI
│   ├── types/                 Shared TypeScript types & interfaces
│   ├── App.tsx                 Root component — defines all app routes
│   ├── main.tsx                 Entry point — renders <App /> into the DOM
│   └── index.css                Global styles (Tailwind base + custom overrides)
│
├── package.json               Dependencies & scripts
├── tailwind.config.js          Tailwind theme configuration
├── vite.config.ts               Vite build configuration
└── vercel.json                  Vercel deployment configuration
```

---

## 4. How the App Flows

1. **`main.tsx`** renders the root **`App.tsx`** component into the page.
2. **`App.tsx`** sets up all routes (Login, Dashboard, Messages, Deals, Documents, etc.) using React Router.
3. Authenticated pages are wrapped inside **`DashboardLayout.tsx`**, which renders the **`Navbar`** (top bar with profile/notifications) and **`Sidebar`** (left navigation menu) around the page content.
4. Each route's actual content lives inside its respective folder under **`pages/`**.
5. Role-based views exist for **Investor** vs **Entrepreneur** — separate component folders (`investor/`, `entrepreneur/`) and separate dashboard/browse pages handle the differences.
6. **`context/`** stores global session data (e.g. which user is logged in, and their role) so any component can access it without prop-drilling.
7. **`data/`** currently provides mock/demo data (sample startups, sample investors) to populate the UI before a real backend is connected.

---

## 5. Existing Features (Already Built)

- Role-based login (Investor / Entrepreneur) with demo accounts
- Investor Dashboard — Discover Startups, search & filter by industry
- Stats overview (Total Startups, Industries, Connections)
- Featured Startups cards with pitch summary, funding need, team size
- Sidebar navigation: Dashboard, My Portfolio, Find Startups, Messages, Notifications, Deals, Settings, Help & Support
- Documents page (base structure present — to be enhanced in Week 2)
- Deals page (base structure present — to be enhanced in Week 3)

---

## 6. Planned Enhancements (This Internship)

| Week | Feature | Status |
|---|---|---|
| 1 | UI theme consistency (colors, typography, responsive grid) | In Progress |
| 1 | Meeting Scheduling Calendar | Planned |
| 2 | Video Calling UI (WebRTC mock) | Planned |
| 2 | Document Chamber enhancement (upload, preview, e-signature, status labels) | Planned |
| 3 | Mock Payment section (deposit/withdraw/transfer, transaction history, wallet) | Planned |
| 3 | Security features (password strength meter, 2FA mock, role-based UI polish) | Planned |
| 3 | Final integration, responsive testing, guided walkthrough, demo prep | Planned |

---

## 7. Local Setup Instructions

```bash
git clone https://github.com/kashaffatima2405/Nexus.git
cd Nexus
npm install
npm run dev
```

App runs at: `http://localhost:5173`

**Demo Logins:**
- Entrepreneur Demo (one-click button on login page)
- Investor Demo (one-click button on login page)

---

## 8. Deployment

- **Live Demo (base/original):** https://nexus-iota-five.vercel.app/login
- **My Fork's Deployment:** _to be added after Vercel deployment_

---

*Document prepared as part of Week 1, Milestone 1 deliverable — DevelopersHub Corporation Internship.*
