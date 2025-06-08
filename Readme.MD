# **PayTM-Clone: Full Stack Money Transfer App**

A simple full-stack application that allows users to sign up, log in, view their balance, search for users, and transfer money securely. Built with **React** (frontend), **Express.js**/**Node.js** (backend), **MongoDB** (database), and **Tailwind CSS** for styling.

---

## **Features**

- **User Authentication:** Sign up and sign in with email and password
- **JWT-based Authorization:** Secure API endpoints using JSON Web Tokens
- **User Search:** Search for other users by name
- **Balance Display:** View your current account balance
- **Money Transfer:** Send money to other users with transaction safety
- **Responsive UI:** Clean and modern interface using Tailwind CSS
- **Input Validation:** Robust validation using Zod on the backend

---

## **Project Structure**

```
PayTM-Clone/
│
├── Backend/
│   ├── index.js                # Entry point for Express server
│   ├── package.json
│   ├── .env                    # Environment variables (not committed)
│   ├── DB/
│   │   ├── db.js               # MongoDB connection logic
│   │   ├── userSchema.js       # User model
│   │   └── bankSchema.js       # Account model
│   ├── Middlewares/
│   │   ├── SignUpCheck.js      # Signup validation middleware
│   │   ├── LoginCheck.js       # Login validation middleware
│   │   └── PostLoginAuthCheck.js # JWT auth middleware
│   ├── Routes/
│   │   ├── route.js            # Root router
│   │   ├── user.js             # User-related routes
│   │   └── accounts.js         # Account/balance/transfer routes
│   └── ZodValidators/
│       ├── UserZod.js          # Zod schema for user
│       ├── SignInZod.js        # Zod schema for signin
│       └── UpdateZod.js        # Zod schema for user update
│
└── Frontend/
    ├── src/
    │   ├── App.jsx             # Main React app with routing
    │   ├── main.jsx            # React entry point
    │   ├── index.css           # Tailwind CSS imports
    │   └── Components/
    │       ├── FundamentalComp/
    │       │   ├── AppBar.jsx
    │       │   ├── BalanceBar.jsx
    │       │   ├── Button.jsx
    │       │   ├── Heading.jsx
    │       │   ├── InputBox.jsx
    │       │   ├── SubHeading.jsx
    │       │   └── UserDisplay.jsx
    │       └── Pages/
    │           ├── Dashboard.jsx
    │           ├── SendMoney.jsx
    │           ├── SignIn.jsx
    │           └── SignUp.jsx
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## **Getting Started**

### **Prerequisites**

- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)
- **MongoDB** (local or cloud instance)

---

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/PayTM-Clone.git
cd PayTM-Clone
```

### **2. Backend Setup**

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npx nodemon index.js
```

The backend will run on [http://localhost:3000](http://localhost:3000).

### **3. Frontend Setup**

Open a new terminal and navigate to the Frontend directory:

```bash
cd Frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## **Usage**

- **Sign Up:** Register with your email, first name, last name, and password
- **Sign In:** Log in with your credentials
- **Dashboard:** View your balance and search for users
- **Send Money:** Click "Send Money" next to a user to transfer funds
- **Logout:** Use the logout button in the AppBar

---

## **API Endpoints**

### **User Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/user/signup` | Register a new user | No |
| POST | `/api/v1/user/signin` | Authenticate and receive JWT | No |
| GET | `/api/v1/user/bulk?filter=` | Search users by name | Yes |

### **Account Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/account/balance` | Get current user's balance | Yes |
| POST | `/api/v1/account/transfer` | Transfer money to another user | Yes |

---

## **Technologies Used**

### **Frontend**
- React
- React Router
- Axios
- Tailwind CSS
- Vite

### **Backend**
- Express.js
- Mongoose
- Zod (validation)
- JWT (authentication)
- bcryptjs (password hashing)
- dotenv (environment variables)
- cors (cross-origin requests)

### **Database**
- MongoDB

---

## **Environment Variables**

Make sure to set up the following environment variables in your `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/paytm-clone
JWT_SECRET=your-super-secret-jwt-key
```

---

## **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Contact**

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/your-username/PayTM-Clone](https://github.com/your-username/PayTM-Clone)

---

## **Acknowledgments**

- Thanks to the open-source community for the amazing tools and libraries
- Inspired by PayTM's user interface and functionality
- Built as a learning project to understand full-stack development