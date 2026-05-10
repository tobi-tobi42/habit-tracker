# 🚀 CreatorQuest AI: Deployment & User Guide

Welcome to the official setup and working guide for **CreatorQuest AI**. This document provides everything you need to take your futuristic productivity platform from local development to the world wide web.

---

## 🛠️ Part 1: Local Setup Guide
If you are moving to a new machine or sharing the project, follow these steps:

### 1. Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (Local or Atlas cloud)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

### 3. Backend Setup
```bash
cd backend
npm install
node server.js
```
The API will run at `http://localhost:5000`.

---

## 🌐 Part 2: Online Deployment Guide (Free Tier)

### 1. Deploying the Frontend (Vercel - Recommended)
1.  **Push your code** to a GitHub repository.
2.  Go to [Vercel](https://vercel.com/) and login with GitHub.
3.  Click **"Add New"** > **"Project"**.
4.  Import your `frontend` directory.
5.  **Build Settings**:
    *   Framework: `Vite`
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
6.  Click **Deploy**.

### 2. Deploying the Backend (Render.com)
1.  Go to [Render](https://render.com/) and login.
2.  Click **"New"** > **"Web Service"**.
3.  Connect your GitHub repository.
4.  Select the `backend` folder.
5.  **Build Command**: `npm install`
6.  **Start Command**: `node server.js`
7.  Add an **Environment Variable**: `PORT = 10000`.

### 3. Database Setup (MongoDB Atlas)
1.  Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a **Cluster** (Shared Tier - Free).
3.  In "Network Access", allow access from `0.0.0.0/0` (for deployment).
4.  In "Database Access", create a user and password.
5.  Get your **Connection String** and update `server.js` or use an `.env` file.

---

## 🎮 Part 3: Working Guide (How to Use)

### 1. The Dashboard (The Nexus)
*   **Hero Stats**: Track your real-time Productivity Score and Content Streak.
*   **Earnings Trend**: A futuristic line chart that visualizes your income growth over the last 7 days.
*   **XP Progress**: Watch your level rise! The circular meter shows exactly how close you are to reaching the next "Master" level.

### 2. Gamified Habit System (Daily Quests)
*   Complete tasks like "Drink 2L Water" or "Edit Vlog" to earn **XP**.
*   Maintaining a **14-day streak** activates the "Flame" effect in the header, boosting your XP multiplier.

### 3. Quest AI Coach
*   Click the **Play** button to ask for growth tips.
*   The AI automatically analyzes your "Best Productivity Hours" (e.g., "You edit faster at night") and suggests workflow optimizations.

### 4. Content Pipeline
*   Track your video from **Idea** to **Upload**.
*   The pipeline glows neon purple when a stage is "In Progress," ensuring you never lose track of your creator workflow.

---

## 📄 Exporting as PDF
To save this guide as a professional PDF:
1.  Open this `CREATORQUEST_GUIDE.md` file in **VS Code**.
2.  Press `Ctrl+Shift+P` and type **"Markdown: Open Preview to the Side"**.
3.  Right-click the preview and select **"Print to PDF"** (requires Markdown PDF extension) or simply copy the preview into a Word/Google Doc and save as PDF.

---
**Developed with ❤️ by Antigravity AI**
