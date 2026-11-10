/* ==========================================================================
   Alejo Gómez — hoja de vida
   Interacciones mínimas: índice, impresión, reveal y año en curso.
   Sin dependencias.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Índice desplegable ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  const closeBtn = menu ? menu.querySelector(".menu__close") : null;

  function openMenu() {
    if (!menu) return;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    const first = menu.querySelector("a");
    if (first) first.focus();
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    toggle.focus();
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
    });
  }

  /* ---------- Guardar / imprimir ---------- */
  document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => window.print());
  });

  /* ---------- Año en curso ---------- */
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = year;
  });

  /* ---------- Aparición al hacer scroll ---------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sections = document.querySelectorAll(".section, .ledger");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("reveal", "is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );

  sections.forEach((section) => observer.observe(section));
})();
