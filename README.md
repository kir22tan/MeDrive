
# Vaulta 🔥💙

**Vaulta** is a secure and user-friendly cloud storage web application built with Node.js, Express, and MongoDB. It allows users to upload, manage, and store files with a simple and intuitive dashboard. Authentication is handled using JWT and cookies, and all file metadata is persistently stored in MongoDB.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (via HttpOnly cookies)
- **Frontend**: HTML, CSS, JavaScript, EJS templates
- **Other Tools**: Cloudinary (optional), dotenv, cookie-parser

---

## 📁 Project Structure

```
Vaulta/
├── .gitignore
├── .env (.git ignored)
├── node_modules (.git ignored)
├── package.json
├── package-lock.json
├── README.md
│
├── app.js
│
├── config/
│   ├── cloudinary.js
│   └── db.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── file.js
│   └── user.js
│
├── routes/
│   ├── auth.route.js
│   └── upload.route.js
│
├── public/
│   ├── dashboard.css
│   ├── dashboard.js
│   ├── home.css
│   ├── home.js
│   ├── login.css
│   ├── register.css
│   └── my_multimedia/
│
├── views/
│   ├── dashboard.ejs
│   ├── home.ejs
│   ├── login.ejs
│   └── register.ejs
│
└── uploads/
    └── <user_id>/
        └── <uploaded_files>
```

---

## 🚀 Features

- 🔐 User Authentication using JWT (stored in HttpOnly cookies)
- 🗂 File upload & local storage
- 📥 File metadata management in MongoDB
- 🎛 User dashboard to view and manage uploads
- 🖼 Clean and responsive UI (EJS templating)
- ✅ Route protection via middleware
- 📦 Secure `.env` management for sensitive keys

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Vaulta.git
cd Vaulta
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=<your port number || 3000>
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<optional>
CLOUDINARY_API_KEY=<optional>
CLOUDINARY_API_SECRET=<optional>
```

> Make sure `.env` is listed in `.gitignore`.

### 4. Run the App

```bash
node app.js
```

Go to `http://localhost:3000` in your browser.

---

## 📌 Notes

- Uploaded files are stored locally under:  
  `uploads/<user_id>/<filename>`

- File types and size are unrestricted (can be customized via middleware)

---

