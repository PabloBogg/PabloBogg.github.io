// JavaScript Portfolio Pablo Boggetti
const menuButton = document.querySelector(".menu-button");
const navigationArea = document.querySelector(".navigation-area");
const languageButtons = document.querySelectorAll(".language-button");

const translations = {
  es: {
    navAbout: "Sobre mí",
    navExpertise: "Especialidades",
    navProjects: "Proyectos",
    navResearch: "Investigación",
    navContact: "Contacto",

    heroEyebrow:
      "Ingeniería Eléctrica · Confiabilidad de Activos · Analítica de Datos",

    heroTitle:
      "Transformando datos de ingeniería en mejores decisiones para infraestructuras eléctricas críticas.",

    heroDescription:
      "Ingeniero Electricista con experiencia en diagnóstico de activos de alta tensión, mantenimiento basado en condición y análisis de datos técnicos aplicados a sistemas eléctricos.",

    viewProjects: "Ver proyectos",
    downloadCV: "Descargar CV",

    tagPowerSystems: "Sistemas eléctricos",
    tagConditionMonitoring: "Monitoreo de condición",

    profileRole: "Ingeniero Electricista",
    profileLocation: "Córdoba, Argentina",
    explore: "Explorar",

    aboutLabel: "Sobre mí",
    aboutTitle:
      "Experiencia en ingeniería combinada con una mirada orientada a los datos.",
    aboutText:
      "Esta sección será desarrollada durante el Sprint 2.",

    expertiseLabel: "Especialidades",
    expertiseTitle:
      "Confiabilidad de activos, sistemas eléctricos y analítica aplicada a ingeniería.",
    expertiseText:
      "Esta sección será desarrollada durante el Sprint 2.",

    projectsLabel: "Proyectos",
    projectsTitle:
      "Proyectos aplicados de ingeniería eléctrica y análisis de datos.",
    projectsText:
      "Los casos de estudio serán incorporados durante el Sprint 3.",

    researchLabel: "Investigación",
    researchTitle:
      "Investigación, colaboración técnica y aprendizaje continuo.",
    researchText:
      "Esta sección incluirá actividades de CIGRE e investigaciones técnicas.",

    footerProfile:
      "Ingeniería Eléctrica · Confiabilidad de Activos · Analítica de Datos",

    emailLabel: "Correo:",
    phoneLabel: "Teléfono:",
    locationLabel: "Ubicación:",
    emailLink: "Correo"
  },

  en: {
    navAbout: "About",
    navExpertise: "Expertise",
    navProjects: "Projects",
    navResearch: "Research",
    navContact: "Contact",

    heroEyebrow:
      "Electrical Engineering · Asset Reliability · Data Analytics",

    heroTitle:
      "Transforming engineering data into better decisions for critical electrical infrastructure.",

    heroDescription:
      "Electrical Engineer with experience in high-voltage asset diagnostics, condition-based maintenance and technical data analysis applied to power systems.",

    viewProjects: "View Projects",
    downloadCV: "Download CV",

    tagPowerSystems: "Power Systems",
    tagConditionMonitoring: "Condition Monitoring",

    profileRole: "Electrical Engineer",
    profileLocation: "Córdoba, Argentina",
    explore: "Explore",

    aboutLabel: "About",
    aboutTitle:
      "Engineering experience combined with data-driven thinking.",
    aboutText:
      "This section will be developed during Sprint 2.",

    expertiseLabel: "Expertise",
    expertiseTitle:
      "Asset reliability, electrical systems and engineering analytics.",
    expertiseText:
      "This section will be developed during Sprint 2.",

    projectsLabel: "Projects",
    projectsTitle:
      "Applied projects in electrical engineering and data analytics.",
    projectsText:
      "Project case studies will be added during Sprint 3.",

    researchLabel: "Research",
    researchTitle:
      "Research, technical collaboration and continuous learning.",
    researchText:
      "This section will include CIGRE activities and technical research.",

    footerProfile:
      "Electrical Engineering · Asset Reliability · Data Analytics",

    emailLabel: "Email:",
    phoneLabel: "Phone:",
    locationLabel: "Location:",
    emailLink: "Email"
  }
};

function setLanguage(language) {
  const selectedTranslation = translations[language];

  if (!selectedTranslation) {
    return;
  }

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translationKey = element.dataset.i18n;
    const translatedText = selectedTranslation[translationKey];

    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("portfolioLanguage", language);
}

if (menuButton && navigationArea) {
  menuButton.addEventListener("click", () => {
    const isExpanded =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isExpanded)
    );

    navigationArea.classList.toggle("navigation-open");
  });
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

const savedLanguage =
  localStorage.getItem("portfolioLanguage");

setLanguage(savedLanguage === "en" ? "en" : "es");
