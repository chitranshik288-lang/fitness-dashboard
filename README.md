# 🏋️ Fitness Analytics Dashboard

A MERN stack project to track workouts, calories, and fitness progress.

## 🚀 Features
- User Authentication (JWT)
- Workout Tracking
- Calorie Analytics
- Secure APIs

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB
- React (coming soon)

## 📅 Daily Progress

- Day 1: Project setup and folder structure
- Day 2: User authentication (register/login)
- Day 3: JWT middleware
- Day 4: Workout APIs

## ⚙️ Installation

```bash
cd server
npm install
npm run dev 
```

# 🚀 PHASE 1 – OVERALL WORKFLOW 
## 🧱 1. Server Starts
- dotenv loads .env → values go into process.env
- Express app starts
- MongoDB connects via Mongoose

#### 👉 Now backend is ready to receive requests

## 📝 2. Register Flow (Signup)
- Client sends request → /api/auth/register
- Route → goes to controller
  ### Controller:
- Reads data (req.body)
- Checks if user exists (DB)
- Hashes password (bcrypt)
- Saves user (MongoDB)
- Response sent back

#### 👉 User created in DB ✅

## 🔐 3. Login Flow
- Client sends request → /api/auth/login
- Route → controller
 ### Controller:
- Finds user (DB)
- Compares password (bcrypt)
- Generates token (JWT)
- Sends { token, user }

#### 👉 User authenticated ✅

## 🔑 4. What each tool does
- Express → handles routes & APIs
- Mongoose → talks to MongoDB
- dotenv → loads secrets
- bcrypt → secures passwords
- JWT → gives login token

## 🔥 ONE LINE FLOW

- Client → Route → Controller → Database → Response (with security using bcrypt + JWT)

## 💡 Super Simple Analogy
- Register = Create account 🔐
- Login = Verify + get access pass 🎟️
- Token = ID card for future requests

 
### “In Phase 1, the client sends requests to Express routes, which are handled by controllers. Controllers interact with MongoDB via Mongoose, use bcrypt for password hashing, and JWT for 


# 🚀 PHASE 2 – OVERALL WORKFLOW 
## 🧱 1. Server Ready (with Auth System)
- Uses Phase 1 setup
- JWT middleware added
- Protected routes enabled

#### 👉 Now backend can handle secure requests

## 🔐 2. Protected Request Flow

- Client sends request with token → /api/workouts/add

### Headers:

### Authorization: Bearer TOKEN
## 🛡️ 3. Middleware (Auth Check)
- Extracts token from headers
- Verifies token using JWT
- Gets user ID
- Attaches to request:

#### 👉 req.user = userId

### ❌ If token invalid:

- → Request blocked (401 Unauthorized)

### ✅ If valid:

- → Request moves forward

## 🏋️ 4. Workout Flow

- Client → /api/workouts/add

- Route → controller

### Controller:

- Reads data (req.body)
- Gets userId from req.user
- Saves workout in DB

### 👉 Workout linked to user ✅

## 📊 5. Metrics Flow

- Client → /api/metrics/add

- Route → controller

### Controller:

- Reads body metrics
- Attaches userId
- Stores in DB

### 👉 Metrics stored per user ✅

## 📥 6. Fetch Data Flow

- Client → /api/workouts/all or /api/metrics/all

### Controller:

- Filters by userId
- Sorts data (latest first)
- Sends response

### 👉 User-specific data returned ✅

## 🔗 7. Data Relationship
- User → Workouts
- User → Metrics
- Connected using userId

### 👉 Each user sees only their own data

## 🔑 8. What each tool does
- JWT → verifies user identity
- Middleware → protects routes
- Controller → handles logic
- Mongoose → stores & fetches data
- MongoDB → database

## 🔥 ONE LINE FLOW

### Client → JWT Middleware → Route → Controller → Database → Response

## 💡 Super Simple Analogy
- Token = ID card 🎟️
- Middleware = Security guard 🔐
- Controller = Worker 🧠
- Database = Storage 🗄️

### “In Phase 2, I implemented protected routes using JWT middleware. The middleware verifies the user, then controllers handle workout and metrics data, storing and retrieving user-specific information from MongoDB.”

# PHASE 3 – SHORT WORKFLOW
## 🧱 1. Fetch Data from DB
- Get user-specific data using:
- Metrics.find({ userId: ObjectId(req.user) })
- Workout.find({ userId: ObjectId(req.user) })

### 👉 Always filter by logged-in user

## 📊 2. Sort Data (VERY IMPORTANT)
- metrics.sort((a, b) => new Date(a.date) - new Date(b.date));

- 👉 Ensures correct first → last order

## 📈 3. Weight Progress API

### 👉 Return simple trend:

 [
  { date, weight },
  { date, weight }
]

✔ Used for charts later

## 💪 4. Strength Progress API

### 👉 From workouts:

- Loop exercises
- Find max weight per workout
- Math.max(...sets.map(s => s.weight))
## ⚠️ 5. Plateau Detection

### 👉 Check last few entries:

- if (all weights same) → plateau
- else → progress
## 🧠 6. Insights Engine (MAIN LOGIC)

## 👉 Steps:

- Sort data
- Get:
- first = earliest weight
- last = latest weight
- diff = last - first
### Generate insights:
- diff > 0 → gain 📈
- diff < 0 → loss 📉
- diff = 0 → stable ⚖️
### Add consistency insight:
- entries < 5 → low data
- else → good tracking
## 🔐 7. Protect All Routes
- router.get("/insights", auth, getInsights);

 - 👉 Always use middleware

## 💥 FINAL FLOW (ONE LINE)

### 👉 Fetch → Sort → Analyze → Generate Insights → Return JSON

## 🏆 WHAT YOU BUILT (IMPORTANT)

#### 👉 Not just CRUD—you built:

- Data analysis system
- Pattern detection
- Insight generator
