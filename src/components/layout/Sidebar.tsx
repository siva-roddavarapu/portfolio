// src/components/layout/Sidebar.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ProfileHeader } from "@/components/common/ProfileHeader";
import { NAV_ITEMS } from "@/modules/navigation/constants/nav.constants";
import { NavItem } from "@/modules/navigation/types/nav.types";
import { usePortfolio } from "@/modules/user/hooks/usePortfolio";
import { Brackets } from "../sections/hero/components/Brackets";

/* ─────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────────────────────── */

const profileVariants = {
  hidden: { opacity: 0, x: -24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Stagger parent for nav items
const navContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.42 },
  },
};

// Each nav item: blurs + slides in from the left
const navItemVariants = {
  hidden: { opacity: 0, x: -32, filter: "blur(5px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 16,
    } as const,
  },
};

// Stagger parent for social icons
const socialContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.75 },
  },
};

// Each social icon: rises up from below
const socialIconVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
    } as const,
  },
};

/* ─────────────────────────────────────────────────────────────
   SOCIAL ICON LINK
───────────────────────────────────────────────────────────── */

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SocialLink = ({ href, label, icon }: SocialLinkProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={socialIconVariants}
      className="relative"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <a
        href={href}
        target={href.startsWith("mailto") ? undefined : "_blank"}
        rel="noreferrer"
        aria-label={label}
        className="flex items-center justify-center w-9 h-9 rounded-lg
                   focus-visible:outline-none transition-all duration-200"
        style={{
          color: hovered ? "var(--color-accent)" : "var(--color-text-muted)",
          background: hovered ? "rgba(var(--color-accent-rgb), 0.1)" : "transparent",
          border: hovered
            ? "1px solid rgba(var(--color-accent-rgb), 0.28)"
            : "1px solid transparent",
          transform: hovered ? "translateY(-3px)" : "translateY(0px)",
        }}
      >
        {icon}
      </a>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px]
                       font-mono whitespace-nowrap px-2 py-1 rounded
                       pointer-events-none z-50"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-accent)",
              border: "1px solid rgba(var(--color-accent-rgb), 0.22)",
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   VERTICAL CONNECTOR
   Grows downward — links nav to the social icon row
───────────────────────────────────────────────────────────── */

const VerticalConnector = () => (
  <motion.div
    className="w-px"
    style={{ background: "rgba(var(--color-accent-rgb), 0.18)" }}
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 52, opacity: 1 }}
    transition={{ delay: 0.68, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  />
);

/* ─────────────────────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────────────────────── */

export const Sidebar = () => {
  const { status, location, socialLinks } = usePortfolio();
  const [active, setActive] = useState<string>("hero");

  // Build social list from hook — undefined entries are skipped
  const socials: SocialLinkProps[] = [
    socialLinks.github && {
      href: socialLinks.github,
      label: "GitHub",
      icon: <FaGithub size={16} />,
    },
    socialLinks.linkedin && {
      href: socialLinks.linkedin,
      label: "LinkedIn",
      icon: <FaLinkedinIn size={16} />,
    },
    socialLinks.instagram && {
      href: socialLinks.instagram,
      label: "Instagram",
      icon: <FaInstagram size={16} />,
    },
    socialLinks.email && {
      href: `mailto:${socialLinks.email}`,
      label: "Email",
      icon: <HiMail size={17} />,
    },
  ].filter(Boolean) as SocialLinkProps[];

  // Scroll-spy
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const handleScroll = () => {
      const scrollY = container.scrollTop + 200;
      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);
        if (!section) continue;
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
          setActive(item.id);
          break;
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const container = document.getElementById("scroll-container");
    const section = document.getElementById(id);
    if (!container || !section) return;
    const offset =
      section.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop;
    container.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[40%] max-w-[420px] flex-col justify-between px-10 py-16">
      {/* ── TOP ── */}
      <div>
        {/* Profile header */}
        <motion.div variants={profileVariants} initial="hidden" animate="show">
          <motion.p
            className="text-sm font-mono mb-4"
            style={{ color: "var(--color-text-muted)" }}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.45 }}
          >
            <Brackets>Hi, I&apos;m</Brackets>
          </motion.p>

          <ProfileHeader />
        </motion.div>

        {/* Status + location */}
        <motion.div
          className="mt-6 space-y-2"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.34, duration: 0.45 }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--color-accent)" }}
                animate={{ scale: [1, 2.2, 1], opacity: [0.65, 0, 0.65] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                className="relative rounded-full w-full h-full"
                style={{ background: "var(--color-accent)" }}
              />
            </span>
            <span className="text-xs font-mono" style={{ color: "var(--color-text-secondary)" }}>
              {status}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <HiLocationMarker
              size={13}
              style={{ color: "var(--color-text-muted)" }}
              className="shrink-0"
            />
            <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
              {location}
            </span>
          </div>
        </motion.div>

        {/* Nav */}
        <motion.nav
          className="mt-14 space-y-5"
          variants={navContainerVariants}
          initial="hidden"
          animate="show"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item: NavItem) => {
            const isActive = active === item.id;

            return (
              <motion.div key={item.id} variants={navItemVariants}>
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  {/* Line — width animated by active state */}
                  <motion.span
                    className="h-px block"
                    animate={{
                      width: isActive ? 72 : 28,
                      background: isActive
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />

                  {/* Label */}
                  <motion.span
                    className="text-sm font-mono tracking-[0.08em] uppercase"
                    animate={{
                      color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                      x: isActive ? 6 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    whileHover={{
                      color: "var(--color-text-primary)",
                      x: 6,
                      transition: { duration: 0.15 },
                    }}
                  >
                    {item.label}
                  </motion.span>
                </button>
              </motion.div>
            );
          })}
        </motion.nav>
      </div>

      {/* ── BOTTOM ── */}
      <div>
        {/* Vertical line → social icons */}
        <div className="flex flex-col items-start mb-2">
          <VerticalConnector />

          <motion.div
            className="flex items-center gap-1 mt-3"
            variants={socialContainerVariants}
            initial="hidden"
            animate="show"
          >
            {socials.map((s) => (
              <SocialLink key={s.label} {...s} />
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px mb-5 mt-5"
          style={{ background: "rgba(var(--color-accent-rgb), 0.08)" }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        />

        {/* Theme toggle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.4 }}
          className="mb-4"
        >
          <ThemeToggle />
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-[11px] font-mono"
          style={{ color: "var(--color-text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.12, duration: 0.4 }}
        >
          © {new Date().getFullYear()} Siva Vasanth
        </motion.p>
      </div>
    </aside>
  );
};
