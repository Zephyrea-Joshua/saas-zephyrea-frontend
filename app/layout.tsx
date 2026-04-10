import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ZephyreaShaderBackground } from "@/components/zephyrea-shader-background";

const montserrat = Montserrat({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AetherCore | Reclutamiento, capacitación y recursos humanos",
  description:
    "Reclutamiento, capacitación y recursos humanos en un solo sistema: vacantes, formación y trámites del día a día.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", montserrat.variable)}
    >
      <body className="bg-background text-foreground relative flex min-h-full flex-col">
        <ZephyreaShaderBackground />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
