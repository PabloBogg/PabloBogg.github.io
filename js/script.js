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
  "Ingeniería eléctrica, confiabilidad y soluciones digitales para infraestructuras energéticas.",

expertiseIntroduction:
  "Integro experiencia técnica en sistemas eléctricos con herramientas digitales para desarrollar proyectos, evaluar activos y transformar datos en decisiones.",

electricalEngineeringTitle:
  "Ingeniería eléctrica",

electricalEngineeringDescription:
  "Desarrollo y apoyo técnico para proyectos eléctricos, subestaciones, instalaciones de alta tensión y documentación de ingeniería.",

electricalItem1:
  "Subestaciones y sistemas de potencia",

electricalItem2:
  "Equipamiento de alta tensión",

electricalItem3:
  "Documentación y análisis técnico",

electricalItem4:
  "Apoyo a proyectos de ingeniería",

reliabilityTitle:
  "Confiabilidad de activos",

reliabilityDescription:
  "Evaluación de condición y diagnóstico de activos críticos para optimizar mantenimiento, disponibilidad y toma de decisiones.",

reliabilityItem1:
  "Mantenimiento predictivo",

reliabilityItem2:
  "Monitoreo basado en condición",

reliabilityItem3:
  "Análisis de ensayos eléctricos",

reliabilityItem4:
  "Gestión y priorización de activos",

analyticsTitle:
  "Analítica aplicada a ingeniería",

analyticsDescription:
  "Procesamiento, visualización y análisis de datos técnicos para generar indicadores, reportes y modelos de apoyo a decisiones.",

analyticsItem4:
  "Machine Learning y modelos predictivos",

digitalEngineeringTitle:
  "Ingeniería digital",

digitalEngineeringDescription:
  "Aplicación de BIM, automatización y gestión de información para mejorar la coordinación y el desarrollo de proyectos eléctricos.",

digitalItem3:
  "Metodología BIM",

digitalItem4:
  "Automatización y gestión de información",

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

    expertiseLabel: "Specialties",

expertiseTitle:
  "Electrical engineering, reliability and digital solutions for energy infrastructure.",

expertiseIntroduction:
  "I combine technical experience in electrical systems with digital tools to develop projects, assess assets and transform data into decisions.",

electricalEngineeringTitle:
  "Electrical Engineering",

electricalEngineeringDescription:
  "Technical development and support for electrical projects, substations, high-voltage installations and engineering documentation.",

electricalItem1:
  "Substations and power systems",

electricalItem2:
  "High-voltage equipment",

electricalItem3:
  "Technical analysis and documentation",

electricalItem4:
  "Electrical engineering project support",

reliabilityTitle:
  "Asset Reliability",

reliabilityDescription:
  "Condition assessment and diagnosis of critical assets to improve maintenance, availability and decision-making.",

reliabilityItem1:
  "Predictive maintenance",

reliabilityItem2:
  "Condition-based monitoring",

reliabilityItem3:
  "Electrical test analysis",

reliabilityItem4:
  "Asset management and prioritization",

analyticsTitle:
  "Engineering Analytics",

analyticsDescription:
  "Processing, visualization and analysis of technical data to develop indicators, reports and decision-support models.",

analyticsItem4:
  "Machine Learning and predictive models",

digitalEngineeringTitle:
  "Digital Engineering",

digitalEngineeringDescription:
  "Application of BIM, automation and information management to improve coordination and electrical project development.",

digitalItem3:
  "BIM methodology",

digitalItem4:
  "Automation and information management",

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
