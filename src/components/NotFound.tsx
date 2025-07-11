import { Link } from 'react-router-dom';
import { ArrowLeft, Music, Zap, Headphones } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#193661] via-[#3471cb] to-[#000503] text-[#f4f6f7] px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-extrabold mb-4 animate-pulse">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="mb-6 text-[#f4f6f7]/80 font-bold">
          Oops! The page you’re trying to access doesn’t exist, or the render server has temporarily shut down. Please wait a few seconds and try refreshing.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#d1a95b] text-[#000503] font-medium hover:bg-[#f4f6f7] hover:text-[#193661] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Headphones className="h-16 w-16 text-white animate-bounce" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Music className="h-12 w-12 text-white animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Zap className="h-14 w-14 text-white animate-bounce" style={{ animationDelay: '2s' }} />
        </div>
    </div>
  );
}
