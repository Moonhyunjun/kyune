import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kyune.kr"),
  title: {
    default: "KYUNE — 하루를 정돈하는 리추얼 오브제",
    template: "%s | KYUNE",
  },
  description:
    "정돈에서 시작되는 웰니스. 아침과 밤의 리추얼에 정해진 자리를 만드는 오브제, KYUNE.",
  openGraph: {
    title: "KYUNE — 하루를 정돈하는 리추얼 오브제",
    description:
      "모든 습관에 정해진 자리를. 아침과 밤의 리추얼을 담는 오브제.",
    url: "https://www.kyune.kr",
    siteName: "KYUNE",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <ScrollReveal />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
