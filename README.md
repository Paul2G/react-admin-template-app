# React Admin Template

A minimal, modern template to kickstart React applications using TypeScript and Vite.

## 🚀 Overview

This project provides a fast and scalable starting point for building web applications with React 18, TypeScript, and Vite. It includes essential tooling for development, code quality, and maintainability.

## ✨ Features

- ⚡️ Instant development with Vite and Hot Module Replacement (HMR)
- 🛡️ Type safety with TypeScript
- ⚛️ React 18 with functional components and JSX
- 🧹 Preconfigured ESLint for code quality
- 🔧 Easy to extend and customize for production needs

## 🚦 Getting Started

Follow these steps to get your project up and running:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to see your app in action.

### 4. Build for production

```bash
npm run build
```

This will generate optimized files in the `dist/` directory.

### 5. Preview the production build

```bash
npm run preview
```

This serves the production build locally for final checks.

---

That’s it! You’re ready to start developing with React, TypeScript, and Vite.

## 🛠️ Project Structure

This project uses a **modular structure** for clarity, scalability, and maintainability. Each domain or feature is organized within its own folder under `src/modules`, grouping related components, APIs, types, and logic together.

**Key folders:**

- **`src/config/`**: Application configuration files.
- **`src/core/`**: Core utilities, hooks, and services used throughout the app.
- **`src/layouts/`**: Layout components for structuring pages or views.
- **`src/locales/`**: Localization files for supporting multiple languages.
- **`src/modules/`**: Main features/domains of the application.
    - **`dashboard/`**: Dashboard-specific logic and components.
    - **`shapes/`**: Example feature module, structured as:
        - **`api/`**: API handlers or service calls for this feature.
        - **`components/`**: UI components specific to the feature.
        - **`constants/`**: Feature-specific constants.
        - **`data/`**: Static or mock data used by the feature.
        - **`routes/`**: Route definitions and navigation for the feature.
        - **`routes.tsx`**: Entry point for feature routes.
        - **`type.ts`**: Type definitions for the feature.
    - **`user/`**: User module to manage authentication, profiles, etc.
- **`src/styles/`**: Global styling, variables, and theme files.
- **`src/main.tsx`**: Application entry point.
- **`src/root.tsx`**: Root component.
- **`src/vite-env.d.ts`**: Vite-specific TypeScript declarations.

**Modular Approach Advantages:**
- Each feature is self-contained, making code easier to maintain and scale.
- Promotes separation of concerns and reusability.
- Adding new features is as simple as creating a new folder in `src/modules/`.

Feel free to extend this structure to fit your application's needs!

## 📝 Code Quality

- **ESLint** is preconfigured for consistent code style.
- Adjust ESLint rules in `.eslintrc.{js,json}` as needed.
- **Prettier** is integrated for code formatting. Use `npm run format` to format your code.

## 📑 License

This project is [MIT licensed](LICENSE).
