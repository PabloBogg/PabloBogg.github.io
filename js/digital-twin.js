/* ==========================================================
   DIGITAL TWIN
   Pablo Boggetti
   ========================================================== */


/* ==========================================================
   CONFIGURACIÓN
   ========================================================== */

const CONFIG = {

    // URL pública del Dashboard de Databricks
    dashboardURL:
        "https://dbc-ef267b9d-7959.cloud.databricks.com/dashboardsv3/01f195d5b3a51d9d9e6ba67eaefec7a5/published?o=7474658992504872",

    // URL pública del visor Speckle
    speckleURL:
        "https://app.speckle.systems/projects/f137b369f7/models/2b95176d19?embedToken=777397bc683d2a0f246023a039e2dcf332792e1745"

};


/* ==========================================================
   INICIALIZACIÓN
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

    loadSpeckle();

    createToolbar();

});


/* ==========================================================
   CARGAR DASHBOARD
   ========================================================== */

function loadDashboard() {

    const iframe =
        document.querySelector(".dashboard-frame iframe");

    if (!iframe) return;

    iframe.src = CONFIG.dashboardURL;

}


/* ==========================================================
   CARGAR MODELO SPECKLE
   ========================================================== */

function loadSpeckle() {

    const iframe =
        document.querySelector(".viewer-frame iframe");

    if (!iframe) return;

    iframe.src = CONFIG.speckleURL;

}


/* ==========================================================
   TOOLBAR
   ========================================================== */

function createToolbar() {

    const dashboard =
        document.querySelector(".dashboard-frame");

    const viewer =
        document.querySelector(".viewer-frame");

    if (dashboard)
        dashboard.prepend(createButtons(
            "Dashboard",
            CONFIG.dashboardURL
        ));

    if (viewer)
        viewer.prepend(createButtons(
            "Modelo 3D",
            CONFIG.speckleURL
        ));

}


/* ==========================================================
   BOTONES
   ========================================================== */

function createButtons(title, url) {

    const toolbar =
        document.createElement("div");

    toolbar.className =
        "digital-toolbar";

    const titleElement =
        document.createElement("h3");

    titleElement.textContent =
        title;

    toolbar.appendChild(titleElement);


    const buttons =
        document.createElement("div");

    buttons.className =
        "toolbar-buttons";


    /* Abrir */

    const openButton =
        document.createElement("button");

    openButton.textContent =
        "Abrir";

    openButton.addEventListener(
        "click",
        () => {

            window.open(
                url,
                "_blank"
            );

        }
    );


    /* Pantalla completa */

    const fullButton =
        document.createElement("button");

    fullButton.textContent =
        "Pantalla completa";

    fullButton.addEventListener(
        "click",
        () => {

            const iframe =
                toolbar.nextElementSibling;

            if (!iframe) return;

            if (iframe.requestFullscreen)
                iframe.requestFullscreen();

        }
    );


    buttons.appendChild(openButton);

    buttons.appendChild(fullButton);

    toolbar.appendChild(buttons);

    return toolbar;

}


/* ==========================================================
   MENSAJE DE CARGA
   ========================================================== */

window.addEventListener("load", () => {

    console.log(
        "Digital Twin cargado correctamente."
    );

});


/* ==========================================================
   PREPARADO PARA IA
   ========================================================== */

function askAI(question) {

    console.log(
        "Pregunta:",
        question
    );

    /*
        Próxima etapa:

        Conectar con:

        - Databricks Genie

        o

        - OpenAI API

    */

}


/* ==========================================================
   FUTURO
   ========================================================== */

/*

Funciones previstas:

highlightAsset()

focusAsset()

openAlarm()

showMaintenance()

filterDashboard()

syncSpeckle()

syncDatabricks()

*/
