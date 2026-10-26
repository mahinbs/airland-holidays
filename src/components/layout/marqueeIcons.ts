import {
  Award, Bell, Camera, CheckCircle2, Clock, CreditCard, Crown, Flame, Gift, Globe, Handshake, Headphones, Heart,
  Hotel, Luggage, MapPin, Megaphone, Percent, Phone, Plane, Ship, ShieldCheck, Sparkles, Star, Tag, Target,
  TrendingUp, Trophy, Users, Zap, type LucideIcon,
} from 'lucide-react';

/** Fixed icon set offered by the CMS icon picker for utility-bar announcements. */
export const MARQUEE_ICONS: Record<string, LucideIcon> = {
  Plane, Trophy, Globe, Zap, Target, Phone, Award, Clock, Users, Star, ShieldCheck, Sparkles, Ship, Hotel, Gift,
  Megaphone, Handshake, MapPin, CreditCard, Percent, Tag, Flame, Bell, Headphones, Crown, Heart, CheckCircle2,
  TrendingUp, Luggage, Camera,
};

export const MARQUEE_ICON_NAMES = Object.keys(MARQUEE_ICONS);
