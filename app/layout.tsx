import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Cormorant_Infant, Nunito_Sans } from "next/font/google";
import rawData from "@/data/templates.json";
import type { LegalTemplateData } from "@/types/templates.types";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

const cormorant = Cormorant_Infant({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], fallback: ["Georgia", "serif"], variable: "--font-cormorant-infant" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], fallback: ["Arial", "sans-serif"], variable: "--font-nunito-sans" });

const templateData: LegalTemplateData = rawData;
const sectionData = templateData.categories.Legal.sections;
const commonData = templateData.common;
const headerData = sectionData.Header?.variants?.LegalHeader1;

const fontVariables = {
  "--font-primary": commonData.theme.fonts.primary,
  "--font-heading": commonData.theme.fonts.heading,
} as CSSProperties;

export const metadata: Metadata = {
  title: commonData.metadata.title,
  description: commonData.metadata.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={commonData.metadata.lang}
      style={fontVariables}
      data-scroll-behavior="smooth"
      // Root font size: 16px, and from 1024px up it follows the 1440px design (1rem = 1/90 of the screen, at most 16px),
      // so 1024px shows exactly the 1440px layout, only smaller. Every size on the page is in rem, so it all scales together.
      // Header and footer links scroll smoothly to their section on this one page.
      // Everything clickable gets the pointer; with reduced motion turned on nothing animates.
      className={`${cormorant.variable} ${nunito.variable} h-full scroll-smooth antialiased [-webkit-tap-highlight-color:transparent] [font-size:16px] lg:[font-size:min(16px,calc(100vw/90))] [&_:where(a[href],button:not(:disabled),select,[role=button],summary)]:cursor-pointer motion-reduce:scroll-auto motion-reduce:[&_*]:!duration-[0.01ms]`}
    >
      <body className="min-h-full">
        <ScrollReveal />
        {/*
          The whole site sits in one frame, at most 1920px wide and centred. Up to 1920px it fills the screen, so
          nothing changes; on wider screens or when the browser is zoomed out the page stays in the middle with
          equal space on both sides instead of stretching.
          --section-gap is the one space above and below every section: 2.5rem on phones, 3.5rem on tablets and
          2.5rem on desktop (40px at 1440px; it scales with the page, see the font size above), so each section fits on one screen.
        */}
        <div className="mx-auto min-h-screen w-full max-w-[1920px] overflow-x-clip bg-[var(--color-bg-main)] [--section-gap:2.5rem] sm:[--section-gap:3.5rem] lg:[--section-gap:2.5rem]">
          <Header data={headerData} ui={commonData.globalUI} />
          {children}
          <Footer data={commonData.Footer} company={commonData.company} links={headerData?.navigation} />
        </div>
      </body>
    </html>
  );
}
