import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using a professional font
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar"; // Import what we made
import { Footer } from "@/components/layout/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banjar Giri Manik System",
  description: "Sistem Informasi Manajemen Krama Banjar Sorowako",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* 1. Navbar stays at the top */}
        <Navbar /> 
        
        {/* 2. 'children' is the page content (e.g., your Card Grid) */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* 3. Footer stays at the bottom */}
        <Footer />
      </body>
    </html>
  );
}