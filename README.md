# 🐾 Fetch Rewards Dog Adoption App

A responsive dog adoption platform built with **React 18**, **TypeScript**, **Material-UI**, **Styled-Component**, **React Query**, and **Redux Toolkit**.

## 🚀 Features
- **Authentication:** Secure login with Fetch Rewards API.
- **Dog Search:** Filter dogs by breed, with pagination and sorting.
- **Favorites:** Add/remove dogs from favorites.
- **Matching:** Find the perfect match based on your favorites.
- **Responsive Design:** Optimized for both mobile and desktop.

## 🛠️ Tech Stack
- **Frontend:** React 18, TypeScript, Material-UI, Styled-Component
- **State Management:** Redux Toolkit, React Query
- **API Requests:** Axios

## 🔑 API Reference
- **Login:** POST /auth/login
- **Logout:** POST /auth/logout
- **Get Breeds:** GET /dogs/breeds
- **Search Dogs:** GET /dogs/search
- **Get Dogs by IDs:** POST /dogs
- **Get Match:** POST /dogs/match

## ✅ Project Structure
```bash
   src/
   ├── assets/            # Assets directory
   ├── common/            # Reusable components
   ├── pages/             # Main pages (Login, Search)
   ├── services/          # API service calls
   ├── slices/            # Redux slices
   ├── types/             # Types directory
   ├── store.ts           # Redux store setup
   └── App.tsx            # App entry point
```

## ⚙️ Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/hermes920810/Dog-Adoption-For-Fetch-Rewards.git
   cd Dog-Adoption-For-Fetch-Rewards

2. **Install Dependencies:**
   ```bash
   npm install
   
3. **Run the App Locally:**
   ```bash
    npm start

4. **Build for Production:**
   ```bash
    npm run build
