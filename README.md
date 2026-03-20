# 🗂️ Taskora — Task Manager App

A full-stack task management application built with **React**, **Node.js**, **Express**, and **PostgreSQL**. Taskora allows users to register, log in, and manage their personal tasks with full CRUD functionality.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login / Logout)
- ✅ Create, Read, Update, Delete Tasks
- 🔄 Task Status Management (Pending / Completed / Incomplete)
- 🍞 Toast Notifications for user feedback
- 📱 Fully Responsive — works on mobile and desktop
- 🔒 JWT-based authentication with HTTP-only cookies
- 🛡️ Protected routes via auth middleware

---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React | UI Framework |
| Tailwind CSS | Styling |
| Axios | API calls |
| React Router DOM | Client-side routing |
| Lucide React | Icons |

### Backend
| Tech | Usage |
|------|-------|
| Node.js | Runtime |
| Express.js | Server Framework |
| PostgreSQL | Database |
| bcrypt | Password hashing |
| jsonwebtoken | JWT Auth |
| cookie-parser | Cookie handling |
| dotenv | Environment variables |

---

## 📁 Project Structure

```
Taskora/
├── client/                   # React frontend
│   └── src/
│       ├── api/
│       │   └── api.js        # Axios instance
│       ├── components/
│       │   └── Toast.jsx     # Toast notification component
│       └── pages/
│           ├── Home.jsx      # Landing page
│           ├── Login.jsx     # Login page
│           ├── Register.jsx  # Register page
│           └── Dashboard.jsx # Main task manager
│
└── server/
    └── src/
        ├── config/
│       │   └── db.js         # PostgreSQL pool connection
        ├── controllers/
        │   ├── authController.js   # Register, Login, Logout
        │   └── taskController.js   # CRUD task operations
        ├── middleware/
        │   └── authMiddleware.js   # JWT verification
        ├── routes/
        │   ├── authRoutes.js       # Auth API routes
        │   └── taskRoutes.js       # Task API routes
        └── server.js               # Express app entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL installed and running
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/kresh11i/Taskora.git
cd Taskora
```

---

### 2. Set Up the Database

Open **pgAdmin** or your PostgreSQL client and run:

```sql
CREATE TABLE taskUsers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'PENDING',
  user_id INTEGER REFERENCES taskUsers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` folder:

```env
DB_user=your_postgres_username
DB_host=localhost
DB_name=your_database_name
DB_pass=your_postgres_password
DB_port=5432
JWT_SECRET=your_super_secret_key
```

---

### 4. Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### 5. Run the App

Open **two terminals**:

```bash
# Terminal 1 — Start backend
cd server
npm run dev

# Terminal 2 — Start frontend
cd client
npm run dev
```

Frontend runs on: `http://localhost:5173`  
Backend runs on: `http://localhost:3000`

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT cookie |
| POST | `/logout` | Clear JWT cookie |

### Task Routes — `/api/task` *(Protected)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all tasks for logged-in user |
| POST | `/create` | Create a new task |
| PUT | `/:id` | Update task (title, description, status) |
| DELETE | `/:id` | Delete a task |

---

## 📱 Mobile Testing

To test on your phone (same WiFi network):

```bash
# Start frontend with host flag
cd client
npm run dev -- --host
```

Then open the **Network URL** shown in the terminal on your phone browser.

Update `server/src/config/api.js` baseURL to your PC's local IP:
```js
baseURL: "http://192.168.x.x:3000"
```

---

## 🔐 Security Notes

- Passwords are hashed using **bcrypt** (10 salt rounds)
- JWT tokens are stored in **HTTP-only cookies** (not accessible via JavaScript)
- All task routes are protected by **JWT middleware**
- `.env` file is **gitignored** — never commit secrets

---

## 👨‍💻 Author

**Srikresh**  
GitHub: [@kresh11i](https://github.com/kresh11i)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
