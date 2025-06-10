import Image from "next/image";
import Link from "next/link";

export function Error404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-5">
      <h1 className="text-5xl font-semibold mb-6">Error 404</h1>
      <h2 className="text-3xl mb-5">¡Ups! No se ha encontrado la vivienda</h2>
      <Image
        src={`/assets/404-not-found.jpg`}
        width={450}
        height={450}
        alt="404"
        className="rounded-lg shadow-light"
      ></Image>
      <div className="text-center mt-5">
        <Link href={"/"} className="px-3 py-2 bg-secondary text-white rounded-lg">Volver a la home</Link>
      </div>
    </div>
  );
}
