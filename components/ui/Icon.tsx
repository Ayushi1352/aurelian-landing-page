import type { IconType } from "react-icons";
import { FaRegCircle } from "react-icons/fa";
import {
  LuArrowRight,
  LuAward,
  LuCalendarCheck,
  LuCheck,
  LuChevronDown,
  LuHeartHandshake,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhone,
  LuScale,
  LuShieldCheck,
  LuX,
} from "react-icons/lu";
import { RiFacebookFill, RiInstagramLine, RiLinkedinFill, RiTwitterXLine, RiYoutubeFill } from "react-icons/ri";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  LuArrowRight,
  LuAward,
  LuCalendarCheck,
  LuCheck,
  LuChevronDown,
  LuHeartHandshake,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhone,
  LuScale,
  LuShieldCheck,
  LuX,
  RiFacebookFill,
  RiInstagramLine,
  RiLinkedinFill,
  RiTwitterXLine,
  RiYoutubeFill,
};

type Props = {
  name: string;
  className?: string;
};

export const Icon = ({ name, className }: Props) => {
  const Glyph = icons[name];
  if (!Glyph) {
    if (process.env.NODE_ENV !== "production") console.warn(`Icon "${name}" is not in components/ui/Icon.tsx`);
    return <FaRegCircle aria-hidden="true" className={className} />;
  }
  return <Glyph aria-hidden="true" focusable="false" className={className} />;
};
