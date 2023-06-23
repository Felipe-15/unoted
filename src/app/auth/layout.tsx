"use client";
import Image from "next/image";
import drawImage from "../../../public/home-draw.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-background-900 h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <section className="hidden md:flex flex-col h-full w-full items-center justify-center">
        <div className="flex flex-col gap-4 items-center justify-center p-4">
          <Image
            src={drawImage}
            width={350}
            height={350}
            alt="Imagem de duas pessoas segurando uma anotação"
            className="max-w-[350px] w-full"
          />
          <h3 className="text-secondary-500 text-4xl max-w-[500px]">
            Larga o <span className="text-primary-500">post-it</span>, economiza
            papel e <span className="text-primary-500">vem pra cá!</span>
          </h3>
        </div>
      </section>
      {children}
    </main>
  );
}
