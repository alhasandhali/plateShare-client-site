# **PlateShare — A Community Food Donation Platform**

### **Live Site:** [https://plateshare-ahd.netlify.app/](https://plateshare-ahd.netlify.app/)

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

## **Author**

**Developed by:** Al Hasan Dhali

- **Email:** alhasandhali@gmail.com
- **GitHub:** [https://github.com/alhasandhali](https://github.com/alhasandhali)

---

> _“Don’t waste food — share it. Every plate shared brings hope to another.”_
