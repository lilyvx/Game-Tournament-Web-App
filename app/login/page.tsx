// app/login/page.tsx
export default function LoginPage() {
  return (
    // ---------- 1 ----------
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      {/* ---------- 2 ---------- */}
      <div className="relative w-full max-w-sm p-10 rounded-full bg-gradient-to-br from-zinc-900 to-black shadow-[0_0_80px_rgba(255,255,255,0.05)]">
        {/* ---------- 3 ---------- */}
        <h1 className="text-center text-2xl tracking-[0.3em] font-light mb-10">
          Tournaments 
        </h1>

        {/* ---------- 4 ---------- */}
        <form className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-200 mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="mark.johnson@thecosaur.com"
              className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-400 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="bg-transparent border-b border-gray-600 focus:border-white outline-none py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-400 hover:bg-white hover:text-black font-medium py-2 rounded transition-colors"
          >
            SIGN IN
          </button>
        </form>

        {/* ---------- 5 ---------- */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-white underline hover:text-gray-300">
            Sign up
          </a>
        </p>

        {/* ---------- 6 ---------- */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <button className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:border-white transition-colors">
            ✓
          </button>
        </div>
      </div>
    </main>
  );
}
