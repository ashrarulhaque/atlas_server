# 🎙️ SoundsLikeAtlas - Podcast Processing Platform

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-6366f1?logo=stripe&logoColor=white)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

> A **full-stack platform** to upload, process, review, and deliver podcast audio — from **MVC architecture** to **production deployment**.

---

## 🚀 Live Demo  
🔗 [Visit Live Website](https://www.soundslikeatlas.com/)

---

## 📌 Features

✅ **Audio Upload & Storage** — Securely upload podcast files using **Firebase Storage**  
✅ **Preview Audio Online** — Integrated **Howler.js** for smooth audio playback  
✅ **Client-Editor Workflow** — Clients can request revisions, editors can resubmit updated files  
✅ **Stripe Payments** — Secure checkout with webhook-based payment status tracking  
✅ **Task Management** — Track progress from `Pending → Completed → Approved`  
✅ **Error Handling** — MongoDB middleware for database error management & uptime optimization  
✅ **Custom Domain Setup** — Configured DNS via Namecheap  
✅ **Serverless Architecture** — Deployed on Vercel using monolithic serverless approach  

---

## 🛠️ Tech Stack

**Frontend:**  
![React](https://img.shields.io/badge/React-61dafb?logo=react&logoColor=white)  
![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38bdf8?logo=tailwind-css&logoColor=white)  

**Backend:**  
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)  
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)  

**Database & Storage:**  
![MongoDB](https://img.shields.io/badge/MongoDB-47a248?logo=mongodb&logoColor=white)  
![Firebase](https://img.shields.io/badge/Firebase-ffca28?logo=firebase&logoColor=black)  

**Payments & APIs:**  
![Stripe](https://img.shields.io/badge/Stripe-635bff?logo=stripe&logoColor=white)  
![Howler.js](https://img.shields.io/badge/Howler.js-ff0000?logo=javascript&logoColor=white)  

**Deployment & Tools:**  
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)  
![Namecheap](https://img.shields.io/badge/Namecheap-de572f?logo=namecheap&logoColor=white)  

---

## ⚙️ Project Architecture

```mermaid
graph TD
    A[Client - React + Howler.js] -->|Requests/Uploads| B[Node.js + Express API]
    B -->|Store Files| C[Firebase Storage]
    B -->|Store Metadata| D[MongoDB Atlas]
    B -->|Process Payments| E[Stripe API + Webhooks]
    B -->|Serve Audio| A
````

## 💳 Payment Flow

1. Client selects audio processing package
2. Payment is processed through **Stripe Checkout**
3. **Stripe Webhook** updates payment status & session ID in MongoDB
4. Task state is updated automatically

