import type { Metadata } from "next";
import { Fredoka, Playfair_Display, Montserrat, Architects_Daughter } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "My Fav App",
  description: "A special surprise for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${playfair.variable} ${montserrat.variable} ${architectsDaughter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
