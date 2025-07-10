# 🎙️ MicDrop - Podcast Web App

A modern, full-featured podcast web application built with **Angular**. It features both public-facing components and an admin dashboard to manage episodes, confessions, playlists, and team members. The app is fully responsive, accessible, and uses modular component-based design.

---

## 📌 Table of Contents

- [📖 Project Overview](#-project-overview)
- [📁 Project Structure](#-project-structure)
- [🚀 Features](#-features)
- [🔧 Technologies Used](#-technologies-used)
- [📦 Installation](#-installation)
- [💡 Usage](#-usage)
- [🖼️ Screenshots](#-screenshots)
- [🎯 Bonus Features](#-bonus-features)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

---

## 📖 Project Overview

The Podcast Web App allows users to:

- Submit anonymous confessions
- Listen to podcast episodes
- Explore featured playlists
- Learn about the podcast team

The admin dashboard provides:

- Authentication (login/signup)
- Management of episodes, confessions, playlists, and team members
- A mobile-friendly admin layout with dark/light mode and accessibility support

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── core/                 # Global services, interceptors
│   ├── shared/               # Reusable UI components
│   ├── models/               # TypeScript interfaces
│   ├── pages/
│   │   ├── home/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── confessions/
│   │   ├── episodes/
│   │   ├── playlists/
│   │   ├── team/
│   │   └── admin/            # Admin layout + admin feature views
│   ├── app.routes.ts         # Main routing configuration
│   ├── app.config.ts         # Angular standalone bootstrap config
│   └── app.component.ts
├── assets/                   # Static assets
├── environments/             # Environment configs
├── styles/                   # Global styles
└── index.html
```

---

## 🚀 Features

### ✅ Public Side
- Confession form with validation
- View all podcast episodes with pagination
- Persistent audio player
- Browse and view playlists
- Meet the team section

### 🔐 Admin Side
- Secure login & signup
- Admin dashboard layout
- View submitted confessions
- Manage playlists (CRUD)
- Manage team members (CRUD)
- Add new podcast episodes (optional)
- Responsive design with mobile admin menu

---

## 🔧 Technologies Used

- **Angular 16+ Standalone**
- **Angular Material** / PrimeNG / Tailwind CSS
- **RxJS**, Reactive Forms
- **Laravel REST API** (backend)
- **JWT Authentication**
- **HTML5 Audio Player**
- **Responsive & Accessible Design**

---

## 📦 Installation

### Prerequisites

- Node.js v18+
- Angular CLI v16+
- Git

### 1. Clone the repo

```bash
git clone https://github.com/iamernesto14/MicDrop.git
cd MicDrop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
ng serve
```

Visit `http://localhost:4200` to view the app.

---

## 💡 Usage

- `/` - Home
- `/login` - Admin login
- `/signup` - Admin signup
- `/confessions` - Anonymous message submission
- `/episodes` - Browse episodes
- `/episodes/:id` - Episode detail with audio player
- `/playlists` - Public playlists
- `/team` - Meet the team
- `/admin` - Admin dashboard


## 🎯 Bonus Features

- 🔍 Search/filter episodes
- 🌓 Theme toggle (dark/light)
- 📱 Mobile navigation and bottom menu
- 🔒 Token storage in `localStorage`
- ⏳ Lazy-loaded routes
- 💾 Future PWA support (optional)

---

## 🖼️ Screenshots

Coming soon…

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add new feature"`
4. Push and submit a PR

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ by Ernest & Mildred