import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
        Página não encontrada
      </h1>
      <Image
        src="/assets/404.svg"
        alt="404 not found"
        width={300}
        height={300}
        className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 animate-pulse"
      />
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mt-6 text-center max-w-md">
        Ops! A página que você está procurando não existe.
      </p>
    </div>
  )
}