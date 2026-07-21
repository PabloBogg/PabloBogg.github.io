const languageButtons = document.querySelectorAll(".language-button");

const translations = {
  es: {
    backPortfolio: "Volver al portfolio",

    heroEyebrow: "Ingeniería eléctrica · Revit · Metodología BIM",
    heroTitle: "Modelado BIM de una Subestación Eléctrica de 132 kV",
    heroDescription:
      "Desarrollo de un modelo tridimensional en Autodesk Revit para representar los principales equipos, estructuras e instalaciones de una subestación eléctrica.",

    tagSubstation: "Subestaciones",
    tagModeling: "Modelado 3D",

    projectLabel: "Proyecto",
    projectValue: "Modelado BIM de subestación",
    voltageLabel: "Nivel de tensión",
    roleLabel: "Rol",
    roleValue: "Modelador BIM",
    softwareLabel: "Software principal",

    contextNumber: "01 · Contexto",
    contextTitle: "Representación digital de una instalación eléctrica",
    contextParagraph1:
      "Las subestaciones eléctricas incluyen equipos y estructuras que deben ubicarse y relacionarse correctamente dentro de una instalación. El modelado tridimensional facilita la comprensión espacial del proyecto.",
    contextParagraph2:
      "En este trabajo se utilizó Autodesk Revit para representar una subestación de 132 kV y organizar sus principales componentes dentro de un modelo BIM.",

    objectiveNumber: "02 · Objetivo",
    objectiveTitle: "Desarrollar un modelo BIM organizado y navegable",
    objectiveParagraph:
      "El objetivo fue modelar en Revit los principales elementos de una subestación eléctrica de 132 kV, logrando una representación tridimensional clara de su configuración general.",

    participationNumber: "03 · Mi participación",
    participationTitle: "Actividades desarrolladas durante el proyecto",

    participationItem1Title: "Modelado en Revit",
    participationItem1Description:
      "Desarrollo del modelo tridimensional de la subestación utilizando Autodesk Revit.",

    participationItem2Title: "Equipamiento eléctrico",
    participationItem2Description:
      "Incorporación y ajuste de los principales equipos eléctricos representados en el modelo.",

    participationItem3Title: "Estructuras",
    participationItem3Description:
      "Modelado de estructuras y elementos necesarios para representar la configuración general de la instalación.",

    participationItem4Title: "Organización del modelo",
    participationItem4Description:
      "Organización de vistas, elementos y familias para mantener una estructura de trabajo clara dentro de Revit.",

    scopeNumber: "04 · Alcance",
    scopeTitle: "Principales elementos representados",

    scopeItem1Title: "Patio de 132 kV",
    scopeItem1Description:
      "Representación general del patio eléctrico y de la distribución espacial de sus componentes.",

    scopeItem2Title: "Equipos principales",
    scopeItem2Description:
      "Modelado de equipos eléctricos incluidos dentro del alcance disponible del proyecto.",

    scopeItem3Title: "Estructuras metálicas",
    scopeItem3Description:
      "Incorporación de pórticos, soportes y otras estructuras visibles.",

    scopeItem4Title: "Vistas del modelo",
    scopeItem4Description:
      "Preparación de vistas tridimensionales y gráficas para mostrar la configuración de la subestación.",

    workflowNumber: "05 · Flujo de trabajo",
    workflowTitle: "Proceso utilizado para desarrollar el modelo",

    workflowItem1Title: "Revisión de información",
    workflowItem1Description:
      "Análisis de la información y referencias disponibles para comprender la configuración de la instalación.",

    workflowItem2Title: "Preparación del modelo",
    workflowItem2Description:
      "Configuración inicial del archivo, niveles, vistas y organización general del proyecto.",

    workflowItem3Title: "Modelado",
    workflowItem3Description:
      "Desarrollo progresivo de equipos, estructuras y demás elementos incluidos en el alcance.",

    workflowItem4Title: "Revisión visual",
    workflowItem4Description:
      "Comprobación de la ubicación, orientación y relación entre los principales componentes modelados.",

    toolsNumber: "06 · Herramientas",
    toolsTitle: "Herramientas utilizadas",
    revitDescription:
      "Modelado tridimensional y organización del modelo BIM",
    autocadDescription:
      "Consulta de información gráfica y documentación de referencia",
    bimMethodologyTitle: "Metodología BIM",
    bimMethodologyDescription:
      "Organización digital de los elementos y de la información del modelo",

    galleryNumber: "07 · Galería",
    galleryTitle: "Imágenes del modelo",
    galleryIntroduction:
      "Vistas generales y detalles obtenidos a partir del modelo desarrollado en Autodesk Revit.",
    galleryCaption1: "Vista general de la subestación",
    galleryCaption2: "Equipamiento eléctrico",
    galleryCaption3: "Detalle del modelo",

    resultsNumber: "08 · Resultado",
    resultsTitle:
      "Representación tridimensional organizada de la subestación",

    result1Title: "Modelo navegable",
    result1Description:
      "Visualización tridimensional de la instalación y de sus principales componentes.",

    result2Title: "Mejor comprensión espacial",
    result2Description:
      "Lectura más clara de la ubicación y relación entre equipos y estructuras.",

    result3Title: "Información organizada",
    result3Description:
      "Estructuración de los elementos dentro de un entorno BIM.",

    result4Title: "Base digital",
    result4Description:
      "Modelo preparado para continuar incorporando información o documentación cuando sea necesario.",

    nextProjectLabel: "Próximo proyecto",
    nextProjectTitle:
      "Dashboard de gestión y confiabilidad de activos",

    footerText:
      "Ingeniería Eléctrica · BIM · Confiabilidad · Analítica de Datos"
  },

  en: {
    backPortfolio: "Back to portfolio",

    heroEyebrow: "Electrical engineering · Revit · BIM methodology",
    heroTitle: "BIM Modeling of a 132 kV Electrical Substation",
    heroDescription:
      "Development of a three-dimensional Autodesk Revit model representing the main equipment, structures and installations of an electrical substation.",

    tagSubstation: "Substations",
    tagModeling: "3D Modeling",

    projectLabel: "Project",
    projectValue: "BIM substation modeling",
    voltageLabel: "Voltage level",
    roleLabel: "Role",
    roleValue: "BIM Modeler",
    softwareLabel: "Main software",

    contextNumber: "01 · Context",
    contextTitle: "Digital representation of an electrical installation",
    contextParagraph1:
      "Electrical substations include equipment and structures that must be correctly located and related within the installation. Three-dimensional modeling facilitates the spatial understanding of the project.",
    contextParagraph2:
      "Autodesk Revit was used to represent a 132 kV substation and organize its main components within a BIM model.",

    objectiveNumber: "02 · Objective",
    objectiveTitle: "Develop an organized and navigable BIM model",
    objectiveParagraph:
      "The objective was to model the main elements of a 132 kV electrical substation in Revit, producing a clear three-dimensional representation of its general configuration.",

    participationNumber: "03 · My contribution",
    participationTitle: "Activities developed during the project",

    participationItem1Title: "Revit modeling",
    participationItem1Description:
      "Development of the three-dimensional substation model using Autodesk Revit.",

    participationItem2Title: "Electrical equipment",
    participationItem2Description:
      "Incorporation and adjustment of the main electrical equipment represented in the model.",

    participationItem3Title: "Structures",
    participationItem3Description:
      "Modeling of structures and elements required to represent the general configuration of the installation.",

    participationItem4Title: "Model organization",
    participationItem4Description:
      "Organization of views, elements and families to maintain a clear working structure within Revit.",

    scopeNumber: "04 · Scope",
    scopeTitle: "Main elements represented",

    scopeItem1Title: "132 kV switchyard",
    scopeItem1Description:
      "General representation of the switchyard and the spatial distribution of its components.",

    scopeItem2Title: "Main equipment",
    scopeItem2Description:
      "Modeling of the electrical equipment included within the available project scope.",

    scopeItem3Title: "Steel structures",
    scopeItem3Description:
      "Incorporation of gantries, supports and other visible structures.",

    scopeItem4Title: "Model views",
    scopeItem4Description:
      "Preparation of three-dimensional and graphical views showing the substation configuration.",

    workflowNumber: "05 · Workflow",
    workflowTitle: "Process used to develop the model",

    workflowItem1Title: "Information review",
    workflowItem1Description:
      "Analysis of the available information and references to understand the installation configuration.",

    workflowItem2Title: "Model preparation",
    workflowItem2Description:
      "Initial configuration of the file, levels, views and general project organization.",

    workflowItem3Title: "Modeling",
    workflowItem3Description:
      "Progressive development of the equipment, structures and other elements included in the scope.",

    workflowItem4Title: "Visual review",
    workflowItem4Description:
      "Verification of the location, orientation and relationship between the main modeled components.",

    toolsNumber: "06 · Tools",
    toolsTitle: "Tools used",
    revitDescription:
      "Three-dimensional modeling and BIM model organization",
    autocadDescription:
      "Review of graphical information and reference documentation",
    bimMethodologyTitle: "BIM Methodology",
    bimMethodologyDescription:
      "Digital organization of model elements and information",

    galleryNumber: "07 · Gallery",
    galleryTitle: "Model images",
    galleryIntroduction:
      "General views and details obtained from the model developed in Autodesk Revit.",
    galleryCaption1: "General substation view",
    galleryCaption2: "Electrical equipment",
    galleryCaption3: "Model detail",

    resultsNumber: "08 · Result",
    resultsTitle:
      "Organized three-dimensional representation of the substation",

    result1Title: "Navigable model",
    result1Description:
      "Three-dimensional visualization of the installation and its main components.",

    result2Title: "Improved spatial understanding",
    result2Description:
      "Clearer reading of the location and relationship between equipment and structures.",

    result3Title: "Organized information",
    result3Description:
      "Structuring of the elements within a BIM environment.",

    result4Title: "Digital foundation",
    result4Description:
      "Model prepared for additional information or documentation to be incorporated when required.",

    nextProjectLabel: "Next project",
    nextProjectTitle:
      "Electrical asset management and reliability dashboard",

    footerText:
      "Electrical Engineering · BIM · Reliability · Data Analytics"
  }
};

function setLanguage(language) {
  const dictionary = translations[language];

  if (!dictionary) {
    return;
  }

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("portfolioLanguage", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
});

const savedLanguage = localStorage.getItem("portfolioLanguage");
setLanguage(savedLanguage === "en" ? "en" : "es");
