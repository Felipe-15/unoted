import "./globals.css";
import { mukta } from "./fonts";

export const metadata = {
  title: "Unoted",
  description:
    "A melhor forma de organizar sua vida. Comece agora, é rápido e fácil!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={mukta.className}>{children}</body>
    </html>
  );
}
