import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-between items-start min-h-screen bg-black text-white font-sans px-12 py-16">
      {/* ---------- Left side: company / contact info ---------- */}
      <div className="flex flex-col space-y-6 md:w-1/3">
        <h1 className="text-lg font-semibold">hochburg</h1>
        <p className="text-gray-400 text-sm">branding and communication</p>

        <div>
          <p>Hochburg</p>
          <p>Hirschstraße 27</p>
          <p>70173 Stuttgart</p>
        </div>

        <div>
          <p className="text-gray-400">+ 49 711 722 333 60</p>
          <p className="text-gray-400">hello@hochburg.design</p>
        </div>

        <Link href="/shop" className="text-sm underline hover:text-gray-300">
          visit our shop
        </Link>

        <div className="flex space-x-4 text-xs text-gray-600">
          <Link href="/imprint">imprint</Link>
          <Link href="/privacy">privacy</Link>
        </div>
      </div>

      {/* ---------- Right side: large navigation words ---------- */}
      <div className="flex flex-col items-start md:items-end mt-16 md:mt-0 md:w-2/3 text-right">
        <NavWord text="projects" href="/projects" />
        <NavWord text="jobs" href="/jobs" />
        <NavWord text="about" href="/about" />
        <NavWord text="gallery" href="/gallery" />
      </div>
    </main>
  );
}

/* ---------- Mini component for large bold navigation words ---------- */
function NavWord({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="relative group text-6xl md:text-8xl font-extrabold leading-tight text-gray-700 hover:text-white transition-colors"
    >
      {text}
      {/* underline hover effect : */}
      <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-white transition-all group-hover:w-full"></span>
    </Link>
  );
}
