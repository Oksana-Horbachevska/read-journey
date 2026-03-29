# 📚Read Journey App 

![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![Node.js v18](https://img.shields.io/badge/node-v18-green)
![Next.js 15](https://img.shields.io/badge/next.js-15-yellow)

Read Journey is a modern web application designed for book lovers to track their reading progress, manage a personal library, and discover new literature. The platform offers an intuitive interface to help users stay organized and motivated on their reading goals.


## ✨ Key Features

Personal Library: Add books from a global database or create your own entries.

Progress Tracking: Log reading sessions and visualize your journey through each book.

Smart Filtering: Sort and filter books by title, author, or reading status.

Authentication: Secure registration and login system with JWT-based session management.

Responsive Design: Fully optimized for mobile (with a sleek burger menu), tablet, and desktop.

Pagination: Smooth navigation through extensive book collections.

Protected Routes: Middleware-based access control for private user data.
   
   




## 🛠️ Tech Stack

Framework: Next.js 15 (App Router)

Library: React 19

Language: TypeScript

State Management: Zustand

Data Fetching: TanStack React Query (v5)

Forms: React Hook Form + Yup (validation)

Notifications: React Hot Toast

Styling: CSS Modules + Modern-normalize

Auth: Custom JWT implementation with HTTP-only cookies


     

## ⚙️ Installation

```bash
git clone https://github.com/Oksana-Horbachevska/read-journey
cd read-journey
npm install
npm run dev

```


## 🔐 Authentication & Security
JWT Strategy: Access and Refresh tokens stored in secure HTTP-only cookies.

Middleware: Server-side route protection and automatic redirects for unauthorized users.

Validation: Comprehensive form validation to ensure data integrity. 

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_URL=`  
`NODE_BACKEND_URL=`


## 🤝 Contributing

Contributions are always welcome!

Contributions are welcome!
  Fork the repository
  Create a branch (git checkout -b feature-name)
  Commit your changes (git commit -m "Feature")
  Push to the branch (git push origin feature-name)
  Open a Pull Request
