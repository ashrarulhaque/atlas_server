// components/ServerWakingUp.tsx
export default function ServerWakingUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000503] text-[#f4f6f7] px-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2 animate-pulse">Please Wait...</h2>
        <p className="text-[#f4f6f7]/80">
          The server is waking up from sleep. This may take a few seconds.
        </p>
      </div>
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
