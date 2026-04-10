"use client";

import React, { type RefObject } from "react";
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

const navItemBase = cn(
  "inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-zinc-100 outline-none transition-colors",
  "hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent",
  "data-open:bg-zinc-800/90 data-popup-open:bg-zinc-800/90",
  "[&_svg]:text-zinc-300"
);

/** Sin left/transform: el positioner de Base UI ya alinea; el translate cortaba el panel a la izquierda. */
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

  const shellClass = cn(
    "fixed left-0 right-0 top-0 z-[100] grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-6 py-3 transition-[background-color,backdrop-filter,border-color] duration-300 md:gap-4 md:px-10",
    scrolled
      ? "border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40"
      : "border-b border-transparent bg-transparent"
  );

  if (isMobile) {
    return (
      <header className={shellClass}>
        <div className="min-w-0 justify-self-start">
        <MotionDrawer
          direction="left"
          width={300}
          backgroundColor="#000000"
          clsBtnClassName="border-r border-neutral-900 bg-neutral-800 text-white"
          contentClassName="border-r border-neutral-900 bg-black text-white"
          btnClassName="relative left-0 top-0 w-fit bg-zinc-800 p-2 text-white"
        >
          <nav className="space-y-5 text-sm">
            <div className="flex items-center gap-2 text-white">
              <ZephyreaIsotipoLogo
                variant={scrolled ? "bar" : "hero"}
                className="h-8 w-8 shrink-0"
              />
              <span className="font-medium">AetherOZ</span>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Producto
              </p>
              <div className="flex flex-col gap-1">
                {SAAS_PRODUCT.slice(0, 5).map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="rounded-md py-1.5 text-zinc-200 hover:bg-white/5"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Soluciones
              </p>
              <div className="flex flex-col gap-1">
                {SAAS_SOLUTIONS.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="rounded-md py-1.5 text-zinc-200 hover:bg-white/5"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Recursos
              </p>
              <div className="flex flex-col gap-1">
                {SAAS_RESOURCES.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="rounded-md py-1.5 text-zinc-200 hover:bg-white/5"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#pricing"
              className="block rounded-md py-2 font-medium text-zinc-100 hover:bg-white/5"
            >
              Precios
            </a>
            <a
              href="#contact"
              className="block rounded-md py-2 font-medium text-zinc-100 hover:bg-white/5"
            >
              Contacto
            </a>
          </nav>
        </MotionDrawer>
        </div>

        <ZephyreaIsotipoLogo
          variant={scrolled ? "bar" : "hero"}
          className="h-10 w-10 shrink-0 justify-self-center"
        />

        <TimelineAnimation
          once={true}
          as="a"
          href={WHATSAPP_START_HREF}
          target="_blank"
          rel="noopener noreferrer"
          animationNum={3}
          timelineRef={timelineRef}
          className="group relative z-10 inline-flex w-fit justify-self-end items-center gap-3 rounded-full bg-[#25D366] px-5 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 active:scale-[0.98] md:gap-3.5 md:px-7 md:py-3 md:text-lg"
          aria-label="Empezar: abrir WhatsApp (+52 5651912612)"
        >
          <WhatsappGlyphIcon className={whatsappCtaIconClass} />
          <span className="text-sm font-medium leading-none">Empezar</span>
        </TimelineAnimation>
      </header>
    );
  }

  return (
    <header className={shellClass}>
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
