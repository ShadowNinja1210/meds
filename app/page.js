import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-24 py-20">
      <section className="flex flex-col gap-10 items-center">
        <h1 className=" text-4xl font-bold">
          <span className=" text-yellow-500">Med</span>
          <span className=" text-cyan-500">ici</span>
          <span className=" text-red-500">nes</span>
        </h1>
        <picture>
          <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp" type="image/webp" />
          <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.gif" alt="🧐" width="70" height="70" />
        </picture>
      </section>
      <section className="flex flex-col items-center gap-20">
        <Link href="/papa">
          <button className="px-4 py-2 text-lg font-medium rounded-lg bg-yellow-500">Papa</button>
        </Link>
        <Link href="/mamma">
          <button className="px-4 py-2 text-lg font-medium rounded-lg bg-cyan-500">Mamma</button>
        </Link>
        <Link href="/mummy">
          <button className="px-4 py-2 text-lg font-medium rounded-lg bg-red-500">Mummy</button>
        </Link>
      </section>
    </main>
  );
}