export interface ThemeFonts {
  primary: string;
  heading: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  lang: string;
}

export interface GlobalUIData {
  mainNav: string;
  mobileNav: string;
  openMenu: string;
  closeMenu: string;
  backToTop: string;
}

export interface LinkData {
  label: string;
  href: string;
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface SizedImageData extends ImageData {
  width: number;
  height: number;
}

/** A heading split into parts; highlighted parts show in the brand colour. */
export interface HeadingPart {
  text: string;
  highlight: boolean;
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  lines: string[];
  href: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface CompanyData {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
}

export interface FooterData {
  logo: SizedImageData;
  tagline: string;
  menuTitle: string;
  contactTitle: string;
  copyright: string;
}

export interface CommonData {
  theme: ThemeData;
  metadata: SiteMetadataData;
  globalUI: GlobalUIData;
  company: CompanyData;
  Footer?: FooterData;
}

export interface HeaderData {
  brand: {
    name: string;
    logo: SizedImageData;
  };
  navigation: LinkData[];
  cta: LinkData;
}

export interface HeroData {
  title: string;
  description: string;
  button: LinkData;
  image: ImageData;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface TextPoint {
  title: string;
  text: string;
}

export interface AboutUsData {
  label: string;
  title: HeadingPart[];
  description: string;
  points: TextPoint[];
  image: ImageData;
  badge: StatItem;
  stats: StatItem[];
}

export interface WhyChooseItem extends TextPoint {
  icon: string;
}

export interface WhyChooseUsData {
  label: string;
  title: HeadingPart[];
  description: string;
  image: ImageData;
  items: WhyChooseItem[];
  button: LinkData;
}

export interface PracticeCard {
  title: string;
  subtitle: string;
  image: string;
}

export interface PracticeAreasData {
  label: string;
  title: HeadingPart[];
  description: string;
  cardButton: string;
  cardLink: string;
  cards: PracticeCard[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface TeamData {
  label: string;
  title: HeadingPart[];
  description: string;
  members: TeamMember[];
}

export interface CtaData {
  label: string;
  title: string;
  description: string;
  button: LinkData;
}

export interface ContactData {
  label: string;
  title: HeadingPart[];
  description: string;
  form: {
    title: string;
    description: string;
  };
}

export interface EnquiryFormData {
  fields: {
    name: string;
    email: string;
    phone: string;
    practiceArea: string;
    date: string;
    time: string;
    details: string;
  };
  practiceOptions: string[];
  timeOptions: string[];
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

type Section<Variant extends string, Data> = {
  variants?: { [Name in Variant]?: Data };
};

export interface LegalSections {
  Header?: Section<"LegalHeader1", HeaderData>;
  Hero?: Section<"LegalHero1", HeroData>;
  AboutUs?: Section<"LegalAboutUs1", AboutUsData>;
  WhyChooseUs?: Section<"LegalWhyChooseUs1", WhyChooseUsData>;
  PracticeAreas?: Section<"LegalPracticeAreas1", PracticeAreasData>;
  Team?: Section<"LegalTeam1", TeamData>;
  Cta?: Section<"LegalCta1", CtaData>;
  Contact?: Section<"LegalContact1", ContactData>;
  EnquiryForm?: Section<"LegalEnquiryForm1", EnquiryFormData>;
}

export interface TemplateComponentEntry {
  key: string;
  component: string;
}

export interface TemplateComponents {
  shared: {
    Header: string;
    Footer: string;
  };
  pages: Record<string, { components: TemplateComponentEntry[] }>;
}

export interface LegalCategory {
  sections: LegalSections;
  templateComponents: TemplateComponents;
}

export interface LegalTemplateData {
  common: CommonData;
  categories: {
    Legal: LegalCategory;
  };
}
