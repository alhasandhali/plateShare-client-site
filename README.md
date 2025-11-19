<img align="center" width="100%" src="/plateShare-home.png" alt="home-page">


# **PlateShare — A Community Food Donation Platform**

### **Live Site:** [PlateShare](https://plateshare-ahd.netlify.app/)

_Share a meal, Change a life._

---

## **Overview**

**PlateShare** is a community-driven web platform that bridges the gap between **food donors** and **those in need**. Built with the **MERN stack** and **Firebase Authentication**, it empowers users to **donate**, **request**, and **manage** food items easily — encouraging a culture of sharing and sustainability.

---

## **Key Features**

✅ **Dynamic Navigation & Layout**

- A fully responsive layout with an adaptive Navbar & Footer.
- The Navbar intelligently updates depending on the user’s login state.

✅ **Interactive Home Page**

- Eye-catching **Hero Banner** with a search or “View All Foods” button.
- Dynamic **Featured Foods** section (top 6 items by quantity).
- Two static sections: **How It Works** & **Our Mission**.

✅ **Secure Firebase Authentication**

- Email/Password & Google Sign-In support.
- Real-time form validation and friendly toast messages.
- Password strength checks (Uppercase, Lowercase, Min 6 chars).

✅ **Full CRUD Functionality (MongoDB)**

- Add, Update, Delete and Manage your donated food items.
- Each food card includes image, donor info, quantity, location, and expiry date.

✅ **Smart Food Request System**

- Request food directly from the details page.
- Donors can accept or reject requests in real-time, managing all submissions seamlessly.

✅ **Polished UI & Smooth Animations**

- Modern design built with **Tailwind CSS**.
- Subtle animations using **Framer Motion**.
- 100% responsive across all devices — desktop, tablet, and mobile.

---

## **Project Structure**

### Layout Components

**Navbar:**

- Not Logged In → `Home | Available Foods | Login`
- Logged In → `Home | Available Foods Profile` Image Dropdown + `Add Food | Manage My Foods | My Food Requests | Logout`

**Footer:**  
Elegant footer with brand logo, © copyright,
and social media icons (Facebook, Instagram, X).

---

### Home Page

- **Hero Section:** Visually appealing banner with CTA.
- **Featured Foods:** Top 6 available items loaded dynamically.
- **Static Sections:**
  - _How It Works_ → Explains the simple 3-step process: **Post → Find → Collect**.
  - _Our Mission_ → Shares the platform’s vision and community stats.

---

### Authentication (Firebase)

- **Registration & Login:**  
  Form fields with error messages and validation hints.  
  Includes “Login with Google” option.
- Success & Error messages shown via **react-hot-toast**.

---

### Food Management (CRUD)

- **Add Food:**  
  Form with image hosting via **imgbb**.  
  Automatically captures donor info from Firebase user.
- **Available Foods:**  
  Displays all active foods (`food_status = "Available"`).
- **Food Details:**  
  Shows all item info + “Request Food” button (private route).
- **Manage My Foods:**  
  Logged-in user’s dashboard to **Update** or **Delete** items with confirmation alerts.

---

### Food Request System

- Requests saved with user info, food ID, and status (“Pending”).
- Donors can view all requests for their items.
- Status can be updated → **Accepted / Rejected**.
- Transparent request management for both donors & requesters.

---

## Data Structure

All data is stored in MongoDB:

- **User:**
```json
{
  "_id":"example",
  "name":"Example",
  "email":"example@gmail.com",
  "image":"https://i.ibb.co.com/pvWPkg07/example.png"
}
```
- **Food:**
```json
{
  "_id":"example",
  "food_name":"Example",
  "food_image":"https://i.ibb.co.com/example.jpg",
  "food_quantity":{
    "$numberInt":"6"
  },
  "pickup_location":"91 Elm Rd, Austin, TX",
  "expire_date":"2025-11-12",
  "additional_notes":"Crispy, served warm.",
  "user_id":"example",
  "food_status":"Available"
}
```
- **Food Requests:**
```json
{
  "_id":"example",
  "location":"45 Pine Rd, Seattle, WA",
  "why_need_food":"For community event serving homeless individuals.",
  "contact_no":"+1-206-555-0199",
  "user_email":"example@gmail.com",
  "user_name":"Example",
  "user_image":"https://i.ibb.co/example.jpg",
  "food_id":"example",
  "status":"pending"
}
```
---
## Animations

- **Framer Motion**
- **React Spring**

---

## **Tech Stack**

| Category       | Technologies Used                     |
| -------------- | ------------------------------------- |
| Frontend       | React.js, Tailwind CSS, Framer Motion |
| Backend        | Node.js, Express.js                   |
| Database       | MongoDB (Atlas)                       |
| Authentication | Firebase Auth                         |
| Image Hosting  | imgbb API                             |
| Form Handling  | react-hook-form                       |
| Data Fetching  | TanStack Query                        |
| Hosting        | Netlify & Vercel(Backend)             |

---

## Dependencies
- **Client-side**
```json
"dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "@tanstack/react-query": "^5.90.7",
    "axios": "^1.13.2",
    "firebase": "^12.5.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.553.0",
    "react": "^19.1.1",
    "react-countup": "^6.5.3",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.66.0",
    "react-router": "^7.9.5",
    "react-toastify": "^11.0.5",
    "react-type-animation": "^3.2.0",
    "sweetalert2": "^11.26.3",
    "tailwindcss": "^4.1.17"
  },
  "devDependencies": {
    "@eslint/js": "^9.36.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "daisyui": "^5.4.7",
    "eslint": "^9.36.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.22",
    "globals": "^16.4.0",
    "vite": "^7.1.7"
  }
```
- **Server-side**
```json
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "firebase-admin": "^13.6.0",
    "mongodb": "^7.0.0"
  }
```
---


## Installation & Local Setup
### For Client-side
1. **Clone the repository:**
```bash
git clone https://github.com/alhasandhali/plateShare-client-site.git
cd plateShate-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env.local` with Firebase config**
4. **Build for production**
```bash
npm run build
```
---

**Firebase Environment Variables (`.env.local`)**
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxxx
REACT_APP_FIREBASE_APP_ID=1:xxxx:web:yyyy
```

### For Server-side
1. **Clone the repository:**
```bash
git clone https://github.com/alhasandhali/plateShare-server-site.git
cd plateShate-server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env.local`**
```bash
FIREBASE_SERVICE_KEY=your_base64_encoded_firebase_admin_key
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=3000
```

  - **Note: To encode your Firebase admin key, you can use `encode.js`:**
  ```bash
  const fs = require("fs");
  const key = fs.readFileSync("./plateshare-firebase-admin-key.json", "utf8");
  const base64 = Buffer.from(key).toString("base64");
  console.log(base64);
  ```

4. **Project Structure**
```bash
node_modules/
.env
plateshare-firebase-admin-key.json
.vercel
index.js
```

5. **Run the Server**
```bash
nodemon index.js
```

---

## **Additional Features**

- **Loading Spinner** & Skeleton loaders for async states.
- **Custom 404 Page** with image + “Back to Home” button.
- **Firebase Token Middleware** for secure POST/PATCH/DELETE requests.
- **SweetAlert** prompts for deletion confirmations.
- Consistent typography, color palette, and balanced grid layout.

---

## **Future Improvements**

- Real-time chat between donors and recipients.
- Notification system for food request updates.
- Community dashboard with analytics and impact stats.
- Multi-language support for broader accessibility.

---

## Live Link & Repository

- **Live Website:** [PlateShare Live Demo](https://plateshare-ahd.netlify.app/)
  ```bash
  https://plateshare-ahd.netlify.app/
  ```
- **Live Server:** [PlateShare Server Live Demo](https://plateshare-api-server-two.vercel.app/)
  ```bash
  https://plateshare-api-server-two.vercel.app/
  ```
- **GitHub Repository:**
  ```bash
  https://github.com/alhasandhali/gamora.git
  ```

---

> _“Don’t waste food — share it. Every plate shared brings hope to another.”_
