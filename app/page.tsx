import rawData from "@/data/templates.json";
import type { LegalTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutUs } from "@/components/sections/AboutUs";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Team } from "@/components/sections/Team";
import { Cta } from "@/components/sections/Cta";
import { Contact } from "@/components/sections/Contact";

const templateData: LegalTemplateData = rawData;
const sectionData = templateData.categories.Legal.sections;
const commonData = templateData.common;

/*
  One landing page with a section for each page of the Aurelian Legal website (no blog, no Book Appointment
  page): every button leads to the Contact Us form in the contact section.
  The ids match the header and footer links in templates.json ("#about" → id="about"); scroll-mt keeps
  each section clear of the fixed header when a link scrolls to it.
*/
export default function Home() {
  return (
    <main>
      <div id="home">
        <HeroSection data={sectionData.Hero?.variants?.LegalHero1} />
      </div>
      <div id="about" className="scroll-mt-[4.5rem]">
        <AboutUs data={sectionData.AboutUs?.variants?.LegalAboutUs1} />
        <WhyChooseUs data={sectionData.WhyChooseUs?.variants?.LegalWhyChooseUs1} />
      </div>
      <div id="practice-areas" className="scroll-mt-[4.5rem]">
        <PracticeAreas data={sectionData.PracticeAreas?.variants?.LegalPracticeAreas1} />
      </div>
      <div id="team" className="scroll-mt-[4.5rem]">
        <Team data={sectionData.Team?.variants?.LegalTeam1} />
        <Cta data={sectionData.Cta?.variants?.LegalCta1} />
      </div>
      <div id="contact" className="scroll-mt-[4.5rem]">
        <Contact
          data={sectionData.Contact?.variants?.LegalContact1}
          form={sectionData.EnquiryForm?.variants?.LegalEnquiryForm1}
          company={commonData.company}
        />
      </div>
    </main>
  );
}
