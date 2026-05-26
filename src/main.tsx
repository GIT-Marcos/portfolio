import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChevronUp } from "lucide-react";
import "./index.css";
import App from "./App";
import { rawUserData } from "./data/user-data";
import { SectionNav } from "./components/nav/SectionNav";
import { navigationItems } from "./data/navigation";

// ── Item 9: JSON-LD Structured Data ──
function injectJsonLd() {
  const { personal_info, techs } = rawUserData;
  const contact = personal_info.contact;
  const links = contact?.links;

  const sameAs: string[] = [];
  if (links?.linkedin) sameAs.push(links.linkedin);
  if (links?.github) sameAs.push(links.github);

  const knowsAbout = [...techs];

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal_info.name,
    jobTitle: personal_info.role,
    description: personal_info.bio,
    knowsAbout,
  };

  if (contact?.location) {
    jsonLd.address = { "@type": "PostalAddress", addressLocality: contact.location };
  }
  if (contact?.email) {
    jsonLd.email = contact.email;
  }
  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd, null, 2);
  document.head.appendChild(script);
}

// ── Item 19: Back-to-Top Button ──
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
      }}
      aria-label="Volver al inicio"
      className={`fixed bottom-6 right-6 z-50 rounded-full border border-sky-500/30 bg-sky-500/20 p-2.5 text-sky-400 backdrop-blur-sm transition-all duration-300 hover:bg-sky-500/30 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

// ── Item 11: Scroll Animation Observer ──
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── App Shell ──
function AppShell() {
  useScrollAnimation();

  return (
    <>
      <SectionNav items={navigationItems} />
      <App />
      <BackToTop />
    </>
  );
}

// ── Bootstrap ──
injectJsonLd();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppShell />
  </StrictMode>
);
