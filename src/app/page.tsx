import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-7xl font-bold tracking-wide">Dietto</h1>
      <div className="flex gap-2">
        <Link className="text-2xl hover:underline" href="/auth/login">
          Login
        </Link>
        <Link className="text-2xl hover:underline" href="/auth/signup">
          Cadastro
        </Link>
      </div>
    </div>
  );
}
