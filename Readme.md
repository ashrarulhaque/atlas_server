# 🎧 Atlas – Perfect Your Podcast Sound

From raw recordings to polished perfection — **Atlas** specializes in repairing audio issues, enhancing clarity, and mastering your podcast for a professional-grade listening experience.

🌐 **Live Demo**: [Visit Atlas](https://atlas-client-se6e.onrender.com)

---

## 🚀 Features

- 🎵 Upload original audio files (MP3, WAV, FLAC, etc.)
- 📝 Add titles and descriptions to tasks
- ☁️ Firebase Storage for audio uploads & retrieval
- 📂 Organized storage paths for original and processed files
- 📊 Task status tracking: `pending` → `processing` → `completed` → `approved`
- 💬 Internal messaging for feedback & revision requests
- ⬇️ Secure download links for processed audio
- 💳 Stripe Payment Integration with webhooks for real-time task unlocking
- 💤 Gracefully handles cold starts with a "Waking Up Server..." page

---

## 🧰 Tech Stack

### 🔹 Frontend
- React + Vite
- Tailwind CSS
- Lucide React (icons)

### 🔸 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Firebase Admin SDK (for secure file handling)
- Stripe API for secure payments

---

## ☁️ Deployment

### 🔸 Server
- Deployed on [Render](https://render.com)
- Auto-sleep enabled to save resources
- Webhook endpoints configured for Stripe event handling (e.g. `payment_intent.succeeded`)
- Handles `wake-up` requests from the client before showing payment or dashboard content

### 🔹 Client
- Deployed separately on [Render Static Site Hosting](https://render.com)
- Checks backend availability and shows a **“Waking Up Server…”** animation during cold starts for a smooth UX

---

## 💳 Stripe Integration

- Secure Stripe Checkout with hosted payment page
- Dynamic pricing based on selected task
- Webhook support to confirm payment and update task status as `paid`
- Handles success and cancel redirects after payment
- Uses secure environment variables for Stripe secret and webhook signing secret


## 🙌 Credits

Crafted with care by Ashrarul Haque

---
