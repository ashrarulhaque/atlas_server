# 🎧 Atlas

### Perfect Your Podcast Sound

From raw recordings to polished perfection — **Atlas** specializes in repairing audio issues, enhancing clarity, and mastering your podcast for a professional-grade listening experience.

---

## 🚀 Features

* 🎵 Upload original audio files (MP3, WAV, FLAC, etc.)
* 📜 Add titles and descriptions to tasks
* 📂 Firebase Storage for audio upload & retrieval
* ⚙️ Separate storage paths for originals and processed files
* ✅ Task status updates: pending, processing, completed, approved
* 📬 Message system for revision and collaboration
* 📥 Download links for processed audio files

---

## 🧰 Tech Stack

### Frontend:

* React + Vite
* Tailwind CSS

### Backend:

* Node.js
* Express.js
* MongoDB Atlas
* Firebase Admin SDK (for secure file handling)

---

## 📁 Project Structure

```
audioatlas/
├── server/
│   ├── config/
│   ├── routes/
│   ├── models/
│   └── index.js
├── src/
│   ├── components/
│   ├── pages/
│   └── App.tsx
└── .env
```

---

## 🔧 Environment Variables

`.env` file inside the `server/` directory should contain:

```
PORT=5000
MONGODB_URI=your-mongodb-uri
FIREBASE_STORAGE_BUCKET=your-bucket-name.appspot.com
FIREBASE_SERVICE_ACCOUNT_BASE64=base64-encoded-service-account-json
```

> 🛡️ Keep your credentials safe. Use `base64` encoding for Firebase keys in production.

---

## 🛠️ How to Run Locally

### 1. Clone the repo

```
git clone https://github.com/your-username/audioatlas.git
cd audioatlas
```

### 2. Install dependencies

* Backend:

```
cd server
npm install
```

* Frontend:

```
cd ..
npm install
```

### 3. Start development servers

* Backend:

```
cd server
npm run dev
```

* Frontend:

```
npm run dev
```

---

## 🌐 Deployment

* Deploy server on [Render](https://render.com)
* Deploy frontend on [Render](https://render.com)
* Add all necessary `.env` variables in Render/Vercel project settings

---

## 💡 Future Plans

* Authentication system (OAuth / Firebase Auth)
* Admin dashboard for reviewing tasks
* Stripe integration for monetization
* Audio waveform visualizer

---

## 🙌 Credits

Crafted with care by Ashrarul Haque

---
