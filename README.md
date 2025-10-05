# 🔐 Next.js Authentication & Role-Based Access Control

A **secure full-stack web application** built with **Next.js (TypeScript)** and **MongoDB**, featuring **real-world authentication and authorization**.
The project implements **JWT-based authentication**, **two-factor authentication (2FA)**, **role-based access control (RBAC)**, and **secure session management** using **HttpOnly cookies**.

---

## 🚀 Features

* 🔑 **User Authentication** (Sign up, Login, Logout)
* 🛡️ **Role-Based Access Control (RBAC)** with Admin, User, Moderator roles
* 🍪 **JWT Authentication** stored in **HttpOnly cookies**
* 🔄 **Token Refresh Mechanism** for secure sessions
* 📧 **Password Reset via Email** using **NodeMailer**
* 🔒 **Two-Factor Authentication (2FA)** for extra security
* 👤 Full **User Management System** (profile, update, delete)
* 🗄️ Database powered by **MongoDB + Mongoose**
* ⚡ Built with **Next.js + TypeScript** for scalability

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (TypeScript), Tailwind CSS (optional)
* **Backend:** Next.js API Routes
* **Database:** MongoDB (Mongoose ODM)
* **Auth:** JWT, Cookies (HttpOnly, Secure), 2FA
* **Email Service:** NodeMailer
* **Other:** Middleware-based access control

---

## 📂 Project Setup

Clone the repository:

```bash
git clone https://github.com/Itshaseeb791/Next-Auth-and-Anth
cd project
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root directory with:

```env
MONGODB_URI=your-mongodb-uri  
JWT_SECRET=your-secret-key  
NEXTAUTH_URL=http://localhost:3000  

EMAIL_HOST=smtp.yourprovider.com  
EMAIL_PORT=465  
EMAIL_USER=your-email@example.com  
EMAIL_PASS=your-email-password  
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

---

## 🔮 Future Improvements

* 🌍 Multi-language & localization support
* 📊 Admin dashboard with analytics
* 🔑 Social logins (Google, GitHub, etc.)
* 📱 Mobile app integration (React Native)

---

## 🤝 Contributing

Pull requests are welcome! Please fork the repository and submit a PR for improvements.

---

## 📜 License

This project is licensed under the **MIT License**.

---

⚡ Built with passion by [Mohammed Haseeb Raza](https://github.com/Itshaseeb791)

