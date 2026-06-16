import {
  Code,
  FileText,
  Image as ImageIcon,
  Layers,
  Layout,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Printer,
  Shirt,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  monitor: Monitor,
  smartphone: Smartphone,
  code: Code,
  "pen-tool": PenTool,
  palette: Palette,
  layout: Layout,
  layers: Layers,
  printer: Printer,
  shirt: Shirt,
  image: ImageIcon,
  "file-text": FileText,
  megaphone: Megaphone,
};

export function ServiceIcon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = (name && ICONS[name]) || Sparkles;
  return <Icon className={className} strokeWidth={1.5} />;
}
