# Article Management System

A modern web application for managing articles with authentication, CRUD operations, and advanced querying capabilities.

## 🚀 Tech Stack

- **Runtime**: Node.js 23.8.0
- **Framework**: Next.js (React)
- **UI Components**: Shadcn/ui + Tweakcn
- **Styling**: Tailwind CSS v4
- **Server State**: TanStack Query (React Query)
- **Client State**: Zustand
- **URL State**: nuqs
- **Schema Validation**: Zod
- **TypeScript**: Full type safety

## ✨ Features

### Authentication

- User registration
- User login/logout
- Protected routes
- Guest routes

### Article Management

- **CRUD Operations**: Create, read, update, and delete articles
- **Querying**: Search, filter, and sort articles using URL parameters
- **Infinite Load more**: Load more articles with infinite scroll pagination
- **Article Form Persistence**: Zustand integration prevents data loss during article creation when refreshing or navigating away

## 🎯 Naming Conventions

### Files & Directories

- **kebab-case**: Used for all file and directory names for better readability
  ```
  user-profile.tsx
  article-list.tsx
  auth-service.ts
  ```

### Code Conventions

- **camelCase**: Zod schemas and other functions

  ```typescript
  const userSchema = z.object({...})
  const articleSchema = z.object({...})

  const parseApiError(){
    ....
  }
  ```

- **PascalCase**: Types, interfaces, react components

  ```typescript
  type UserSchema = z.infer<typeof userSchema>
  interface ArticleProps {...}

  function UserPage(){
    ....
  }
  ```

## 🛠️ Installation

### Prerequisites

- Node.js 23.8.0 or higher
- npm

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-name>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Environment variables example:

   ```env
   ❌ VITE_BACKEND_URL=http://localhost:3001/api
   ✅ VITE_BACKEND_URL=http://localhost:3001
   ```

   may look into .env.example

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Why TanStack Query over Redux?

While Redux with RTK Query is powerful, TanStack Query provides:

- Better developer experience (in my opinion)
- Less boilerplate code
- More intuitive caching strategies

## 🔗 Links

- [TanStack Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [nuqs Documentation](https://nuqs.47ng.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)
