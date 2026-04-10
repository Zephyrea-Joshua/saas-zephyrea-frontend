"use client";

import React, { type RefObject } from "react";
import Link from "next/link";
import { ZephyreaIsotipoLogo } from "@/components/zephyrea-isotipo-logo";
import {
  SAAS_PRODUCT,
  SAAS_RESOURCES,
  SAAS_SOLUTIONS,
} from "@/components/zephyrea-nav-data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MotionDrawer from "@/components/ui/motion-drawer";
import { TimelineAnimation } from "@/components/ui/timeline-animation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { NavMegaPanel } from "@/components/nav-mega-panel";
import {
  WhatsappGlyphIcon,
  WHATSAPP_CHAT_HREF as WHATSAPP_START_HREF,
} from "@/components/whatsapp-icon";
import {
  Users,
  GraduationCap,
  BarChart3,
  ClipboardCheck,
  LayoutGrid,
  Building2,
  ShoppingBag,
  Briefcase,
  MapPin,
  HelpCircle,
  BookOpen,
  Rss,
  Tag,
  MessageCircle,
  ChevronRight,
  FileText,
  Cookie,
} from "lucide-react";

const navItemBase = cn(
  "inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-zinc-100 outline-none transition-colors",
  "hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent",
  "data-open:bg-zinc-800/90 data-popup-open:bg-zinc-800/90",
  "[&_svg]:text-zinc-300"
);

const megaShellClass =
  "box-border w-full min-w-0 max-w-[min(100vw-1.5rem,56rem)] p-0";

const whatsappCtaIconClass = cn(
  "size-6 shrink-0 text-white",
  "transition-[filter] duration-200 ease-out",
  "group-hover:brightness-110"
);

type ZephyreaNavbarProps = {
  timelineRef: RefObject<HTMLDivElement | null>;
};

export function ZephyreaNavbar({ timelineRef }: ZephyreaNavbarProps) {
  const scrolled = useScrolled(20);
  const isMobile = useMediaQuery("(max-width: 768px)");

  /**
   * El backdrop-blur NO va en el header directamente.
   * Si el header tuviera backdrop-filter, se convertiría en containing block para
   * position:fixed hijos (spec CSS) y el drawer quedaría encerrado en el header
   * al hacer scroll. El blur se aplica en un div hijo absoluto independiente.
   */
  const shellClass = cn(
    "fixed left-0 right-0 top-0 z-[100] grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-6 py-3 transition-[border-color] duration-300 md:gap-4 md:px-10",
    scrolled ? "border-b border-white/10" : "border-b border-transparent"
  );

  if (isMobile) {
    return (
      <header className={shellClass}>
        {/* Blur overlay — hijo absoluto para que backdrop-filter NO afecte al drawer */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300",
            scrolled
              ? "opacity-100 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40"
              : "opacity-0"
          )}
        />

        {/* Hamburger + drawer */}
        <div className="min-w-0 justify-self-start">
          <MotionDrawer
            direction="left"
            width={300}
            backgroundColor="#080808"
            clsBtnClassName="border border-white/10 bg-white/5 text-white/70 hover:text-white rounded-lg"
            contentClassName="border-r border-white/[0.07]"
            btnClassName="relative left-0 top-0 w-fit rounded-lg bg-white/8 p-2 text-white/80"
          >
            {/* ── Drawer interior ───────────────────────────────────── */}
            <nav className="flex h-full flex-col gap-0 text-sm">

              {/* Header */}
              <div className="mb-5 flex items-center gap-3 border-b border-white/[0.07] pb-5">
                <ZephyreaIsotipoLogo
                  variant="hero"
                  className="h-9 w-9 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-tight text-white">AetherCore</p>
                  <p className="text-[11px] leading-tight text-white/40">by Zephyrea</p>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="flex flex-1 flex-col gap-5 overflow-y-auto pb-4 pr-0.5 -mr-0.5">

                {/* Producto */}
                <NavDrawerSection
                  label="Producto"
                  icon={<LayoutGrid className="size-3" />}
                  items={SAAS_PRODUCT.slice(0, 5)}
                  itemIcons={[
                    <Users key="u" className="size-3.5" />,
                    <GraduationCap key="g" className="size-3.5" />,
                    <BarChart3 key="b" className="size-3.5" />,
                    <ClipboardCheck key="c" className="size-3.5" />,
                    <LayoutGrid key="l" className="size-3.5" />,
                  ]}
                />

                {/* Soluciones */}
                <NavDrawerSection
                  label="Soluciones"
                  icon={<Building2 className="size-3" />}
                  items={SAAS_SOLUTIONS}
                  itemIcons={[
                    <Users key="u" className="size-3.5" />,
                    <ShoppingBag key="s" className="size-3.5" />,
                    <Briefcase key="b" className="size-3.5" />,
                    <MapPin key="m" className="size-3.5" />,
                  ]}
                />

                {/* Recursos */}
                <NavDrawerSection
                  label="Recursos"
                  icon={<BookOpen className="size-3" />}
                  items={SAAS_RESOURCES.slice(0, 3)}
                  itemIcons={[
                    <HelpCircle key="h" className="size-3.5" />,
                    <BookOpen key="b" className="size-3.5" />,
                    <Rss key="r" className="size-3.5" />,
                  ]}
                />

                {/* Divider + main nav */}
                <div className="border-t border-white/[0.07] pt-3">
                  <div className="flex flex-col gap-0.5">
                    <NavDrawerLink href="#pricing" icon={<Tag className="size-3.5 shrink-0" />}>
                      Precios
                    </NavDrawerLink>
                    <NavDrawerLink href="#contact" icon={<MessageCircle className="size-3.5 shrink-0" />}>
                      Contacto
                    </NavDrawerLink>
                  </div>
                </div>
              </div>

              {/* Footer legal */}
              <div className="mt-2 border-t border-white/[0.06] pt-4">
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  Legal
                </p>
                <div className="flex flex-col gap-0.5">
                  <Link
                    href="/privacidad"
                    className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <FileText className="size-3 shrink-0" />
                    Aviso de Privacidad
                    <ChevronRight className="ml-auto size-3 opacity-0 transition-opacity group-hover:opacity-60" />
                  </Link>
                  <Link
                    href="/cookies"
                    className="group flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    <Cookie className="size-3 shrink-0" />
                    Política de Cookies
                    <ChevronRight className="ml-auto size-3 opacity-0 transition-opacity group-hover:opacity-60" />
                  </Link>
                </div>
              </div>

            </nav>
          </MotionDrawer>
        </div>

        {/* Logo centrado */}
        <ZephyreaIsotipoLogo
          variant={scrolled ? "bar" : "hero"}
          className="h-10 w-10 shrink-0 justify-self-center"
        />

        {/* Bug 1 fix — mobile: solo ícono en círculo, sin texto */}
        <TimelineAnimation
          once={true}
          as="a"
          href={WHATSAPP_START_HREF}
          target="_blank"
          rel="noopener noreferrer"
          animationNum={3}
          timelineRef={timelineRef}
          className="group flex size-11 items-center justify-center justify-self-end rounded-full bg-[#25D366] shadow-lg shadow-green-900/40 transition-colors hover:bg-[#20bd5a] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
          aria-label="Contactar por WhatsApp"
        >
          <WhatsappGlyphIcon className="size-[22px] shrink-0 text-white transition-[filter] duration-200 group-hover:brightness-110" />
        </TimelineAnimation>
      </header>
    );
  }

  return (
    <header className={shellClass}>
      {/* Blur overlay — separado del header para no romper fixed children */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300",
          scrolled
            ? "opacity-100 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40"
            : "opacity-0"
        )}
      />

      <TimelineAnimation
        once={true}
        animationNum={1}
        timelineRef={timelineRef}
        className="flex min-w-0 shrink-0 items-center justify-self-start gap-2"
      >
        <ZephyreaIsotipoLogo
          variant={scrolled ? "bar" : "hero"}
          className="h-10 w-10 shrink-0"
        />
      </TimelineAnimation>

      <TimelineAnimation
        once={true}
        animationNum={2}
        timelineRef={timelineRef}
        className="flex min-w-0 max-w-full justify-center justify-self-center overflow-x-auto"
      >
        <NavigationMenu align="center" className="max-w-none">
          <NavigationMenuList className="flex flex-nowrap items-center justify-center gap-0.5 md:gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemBase}>
                Producto
              </NavigationMenuTrigger>
              <NavigationMenuContent className={megaShellClass}>
                <NavMegaPanel
                  items={SAAS_PRODUCT}
                  asideEyebrow="Módulos"
                  asideTitle="Todo tu RH en un solo flujo"
                  asideDescription="Vacantes, formación, indicadores y cumplimiento conectados para que nada se pierda entre correos."
                />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemBase}>
                Soluciones
              </NavigationMenuTrigger>
              <NavigationMenuContent className={megaShellClass}>
                <NavMegaPanel
                  items={SAAS_SOLUTIONS}
                  asideEyebrow="Por tipo de empresa"
                  asideTitle="Soluciones que encajan con tu operación"
                  asideDescription="Desde RH central hasta tienda o franquicias, con visibilidad clara por sede o región."
                />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={navItemBase}>
                Recursos
              </NavigationMenuTrigger>
              <NavigationMenuContent className={megaShellClass}>
                <NavMegaPanel
                  items={SAAS_RESOURCES}
                  asideEyebrow="Soporte"
                  asideTitle="Documentación y novedades"
                  asideDescription="Guías, centro de ayuda, blog y estado del servicio para sacarle el máximo a la plataforma."
                />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#pricing" className={navItemBase}>
                Precios
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#contact" className={navItemBase}>
                Contacto
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </TimelineAnimation>

      <TimelineAnimation
        once={true}
        as="a"
        href={WHATSAPP_START_HREF}
        target="_blank"
        rel="noopener noreferrer"
        animationNum={3}
        timelineRef={timelineRef}
        className="group inline-flex w-fit shrink-0 justify-self-end items-center gap-3 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 active:scale-[0.98] md:gap-3 md:px-7 md:py-3"
        aria-label="Empezar: abrir WhatsApp (+52 5651912612)"
      >
        <WhatsappGlyphIcon className={whatsappCtaIconClass} />
        <span className="leading-none">Empezar</span>
      </TimelineAnimation>
    </header>
  );
}

// ─── Drawer sub-components ────────────────────────────────────────────────────

type NavDrawerSectionProps = {
  label: string;
  icon: React.ReactNode;
  items: { title: string; href: string }[];
  itemIcons: React.ReactNode[];
};

function NavDrawerSection({ label, icon, items, itemIcons }: NavDrawerSectionProps) {
  return (
    <div>
      <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
        {icon}
        {label}
      </p>
      <div className="flex flex-col gap-0">
        {items.map((item, i) => (
          <a
            key={item.title}
            href={item.href}
            className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-white/[0.07] text-white/50 transition-colors group-hover:bg-white/[0.12] group-hover:text-white/80">
              {itemIcons[i]}
            </span>
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

function NavDrawerLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/[0.06] hover:text-white"
    >
      <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/[0.08] text-white/60">
        {icon}
      </span>
      {children}
    </a>
  );
}
