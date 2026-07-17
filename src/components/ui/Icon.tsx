import {
  Award,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  Compass,
  Eye,
  Globe,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Mail,
  MapPin,
  Megaphone,
  Mic,
  Phone,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "../../types/content";

const iconMap: Record<IconName, LucideIcon> = {
  "book-open": BookOpen,
  compass: Compass,
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  "heart-handshake": HeartHandshake,
  building: Building,
  globe: Globe,
  mic: Mic,
  users: Users,
  award: Award,
  target: Target,
  eye: Eye,
  sparkles: Sparkles,
  shield: Shield,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  megaphone: Megaphone,
  calendar: Calendar,
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 1.75,
}: IconProps) {
  const Component = iconMap[name] ?? Sparkles;
  return (
    <Component size={size} className={className} strokeWidth={strokeWidth} />
  );
}
