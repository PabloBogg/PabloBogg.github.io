/* ==========================================================
   DIGITAL TWIN - SUBESTACIÓN 132 kV
   Archivo: digital-twin.js

   Fuente de datos:
   GitHub Pages /data/*.json

   Visualización:
   Apache ECharts
========================================================== */


/* ==========================================================
   01. CONFIGURACIÓN
========================================================== */

const DATA_PATH = "../data";

const DATA_FILES = {
    kpis: `${DATA_PATH}/kpis.json`,
    risk: `${DATA_PATH}/assets_by_risk.json`,
    types: `${DATA_PATH}/assets_by_type.json`,
    temperature: `${DATA_PATH}/top_temperature.json`,
    critical: `${DATA_PATH}/critical_assets.json`,
    alarms: `${DATA_PATH}/active_alarms.json`,
    maintenance: `${DATA_PATH}/maintenance.json`
};


/* ==========================================================
   02. COLORES
========================================================== */

const COLORS = {
    primary: "#123b4a",
    accent: "#5b9f8a",
    cyan: "#38bdf8",

    green: "#10b981",
    yellow: "#f59e0b",
    orange: "#f97316",
    red: "#ef4444",

    blue: "#0ea5e9",

    text: "#d8e1e7",
    textSoft: "#93a4af",

    grid: "rgba(255,255,255,0.08)",
    background: "#0b1820",
    surface: "#10232d"
};


/* ==========================================================
   03. INICIO
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    console.log(
        "Digital Twin - iniciando dashboard..."
    );

    try {

        await loadDashboard();

        console.log(
            "Digital Twin cargado correctamente."
        );

    } catch (error) {

        console.error(
            "Error cargando Digital Twin:",
            error
        );

        showDashboardError();

    }

});


/* ==========================================================
   04. CARGA GENERAL
========================================================== */

async function loadDashboard() {

    const [
        kpis,
        risk,
        types,
        temperature,
        critical,
        alarms,
        maintenance
    ] = await Promise.all([

        loadJSON(DATA_FILES.kpis),

        loadJSON(DATA_FILES.risk),

        loadJSON(DATA_FILES.types),

        loadJSON(DATA_FILES.temperature),

        loadJSON(DATA_FILES.critical),

        loadJSON(DATA_FILES.alarms),

        loadJSON(DATA_FILES.maintenance)

    ]);


    /* KPIs */

    renderKPIs(kpis);


    /* Gráficos */

    renderRiskChart(risk);

    renderAssetTypeChart(types);

    renderCriticalAssetsChart(critical);

    renderTemperatureChart(temperature);


    /* Tablas opcionales */

    renderAlarmTable(alarms);

    renderMaintenanceTable(maintenance);


    /* Fecha de actualización */

    renderLastUpdate();

}


/* ==========================================================
   05. LEER JSON
========================================================== */

async function loadJSON(url) {

    const response = await fetch(
        `${url}?v=${Date.now()}`
    );

    if (!response.ok) {

        throw new Error(
            `No se pudo cargar ${url}. HTTP ${response.status}`
        );

    }

    return await response.json();

}


/* ==========================================================
   06. UTILIDADES
========================================================== */

function number(value, fallback = 0) {

    const result = Number(value);

    return Number.isFinite(result)
        ? result
        : fallback;

}


function formatNumber(value, decimals = 0) {

    return new Intl.NumberFormat(
        "es-AR",
        {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }
    ).format(
        number(value)
    );

}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function normalizeArray(data) {

    if (Array.isArray(data)) {
        return data;
    }

    if (data && typeof data === "object") {
        return [data];
    }

    return [];

}


/* ==========================================================
   07. KPIs
========================================================== */

function renderKPIs(data) {

    const rows = normalizeArray(data);

    if (!rows.length) {
        return;
    }

    const kpi = rows[0];


    setText(
        "health-index",
        formatNumber(
            kpi.Average_Health_Index,
            1
        )
    );


    setText(
        "total-assets",
        formatNumber(
            kpi.Total_Assets
        )
    );


    setText(
        "high-risk-assets",
        formatNumber(
            kpi.High_Risk_Assets
        )
    );


    setText(
        "active-alarms",
        formatNumber(
            kpi.Active_Alarms
        )
    );


    /* Compatibilidad con futuros KPI */

    setText(
        "medium-risk-assets",
        formatNumber(
            kpi.Medium_Risk_Assets
        )
    );


    setText(
        "low-risk-assets",
        formatNumber(
            kpi.Low_Risk_Assets
        )
    );


    setText(
        "overdue-maintenance",
        formatNumber(
            kpi.Overdue_Maintenance
        )
    );


    setText(
        "upcoming-maintenance",
        formatNumber(
            kpi.Upcoming_Maintenance
        )
    );

}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* ==========================================================
   08. DISTRIBUCIÓN DE RIESGO
========================================================== */

function renderRiskChart(data) {

    const container =
        document.getElementById(
            "risk-chart"
        );

    if (!container) {
        return;
    }


    const rows =
        normalizeArray(data);


    const chartData =
        rows.map(item => ({

            name:
                item.Risk_Level,

            value:
                number(
                    item.Asset_Count
                )

        }));


    const chart =
        echarts.init(container);


    chart.setOption({

        backgroundColor:
            "transparent",

        tooltip: {

            trigger:
                "item",

            formatter:
                "{b}<br>{c} activos ({d}%)"

        },

        legend: {

            bottom:
                0,

            left:
                "center",

            textStyle: {
                color:
                    COLORS.textSoft
            }

        },

        color: chartData.map(item => {

            if (
                item.name === "BAJO"
            ) return COLORS.green;

            if (
                item.name === "MEDIO"
            ) return COLORS.yellow;

            if (
                item.name === "ALTO"
            ) return COLORS.red;

            return COLORS.accent;

        }),

        series: [

            {

                name:
                    "Riesgo",

                type:
                    "pie",

                radius:
                    [
                        "45%",
                        "70%"
                    ],

                center:
                    [
                        "50%",
                        "45%"
                    ],

                avoidLabelOverlap:
                    true,

                itemStyle: {

                    borderRadius:
                        4,

                    borderColor:
                        COLORS.background,

                    borderWidth:
                        2

                },

                label: {

                    show:
                        true,

                    color:
                        COLORS.text,

                    formatter:
                        "{c}"

                },

                emphasis: {

                    label: {

                        show:
                            true,

                        fontSize:
                            16,

                        fontWeight:
                            "bold"

                    }

                },

                data:
                    chartData

            }

        ]

    });


    registerResize(chart);

}


/* ==========================================================
   09. ACTIVOS POR TIPO
========================================================== */

function renderAssetTypeChart(data) {

    const container =
        document.getElementById(
            "type-chart"
        );

    if (!container) {
        return;
    }


    const rows =
        normalizeArray(data)
            .sort(
                (a, b) =>
                    number(b.Asset_Count)
                    -
                    number(a.Asset_Count)
            );


    const labels =
        rows.map(
            row =>
                row.Asset_Type
        );


    const values =
        rows.map(
            row =>
                number(
                    row.Asset_Count
                )
        );


    const chart =
        echarts.init(container);


    chart.setOption({

        backgroundColor:
            "transparent",

        tooltip: {

            trigger:
                "axis",

            axisPointer: {
                type:
                    "shadow"
            }

        },

        grid: {

            left:
                55,

            right:
                25,

            top:
                25,

            bottom:
                90

        },

        xAxis: {

            type:
                "category",

            data:
                labels,

            axisLabel: {

                color:
                    COLORS.textSoft,

                rotate:
                    30,

                fontSize:
                    10

            },

            axisLine: {

                lineStyle: {
                    color:
                        COLORS.grid
                }

            },

            axisTick: {
                show:
                    false
            }

        },

        yAxis: {

            type:
                "value",

            minInterval:
                1,

            axisLabel: {
                color:
                    COLORS.textSoft
            },

            splitLine: {

                lineStyle: {
                    color:
                        COLORS.grid
                }

            }

        },

        series: [

            {

                name:
                    "Activos",

                type:
                    "bar",

                data:
                    values,

                barMaxWidth:
                    60,

                itemStyle: {

                    color:
                        COLORS.green,

                    borderRadius:
                        [
                            4,
                            4,
                            0,
                            0
                        ]

                },

                label: {

                    show:
                        true,

                    position:
                        "top",

                    color:
                        COLORS.text,

                    fontWeight:
                        600

                }

            }

        ]

    });


    registerResize(chart);

}


/* ==========================================================
   10. ACTIVOS MÁS CRÍTICOS
========================================================== */

function renderCriticalAssetsChart(data) {

    const container =
        document.getElementById(
            "critical-chart"
        );

    if (!container) {
        return;
    }


    let rows =
        normalizeArray(data);


    /*
        Priorizamos Ranking.
        Si no existe, usamos Health_Index.
    */

    rows.sort(
        (a, b) => {

            if (
                a.Ranking !== undefined
                &&
                b.Ranking !== undefined
            ) {

                return (
                    number(a.Ranking)
                    -
                    number(b.Ranking)
                );

            }

            return (
                number(a.Health_Index)
                -
                number(b.Health_Index)
            );

        }
    );


    rows =
        rows.slice(
            0,
            10
        );


    /*
        Para barras horizontales,
        invertimos el array.
    */

    rows.reverse();


    const labels =
        rows.map(
            row =>
                row.Asset_Key
        );


    const values =
        rows.map(
            row =>
                number(
                    row.Health_Index
                )
        );


    const chart =
        echarts.init(container);


    chart.setOption({

        backgroundColor:
            "transparent",

        tooltip: {

            trigger:
                "axis",

            axisPointer: {
                type:
                    "shadow"
            },

            formatter:
                params => {

                    const index =
                        params[0].dataIndex;

                    const row =
                        rows[index];

                    return `
                        <strong>${escapeHTML(row.Asset_Key)}</strong><br>
                        Tipo: ${escapeHTML(row.Asset_Type)}<br>
                        Índice de salud: ${formatNumber(row.Health_Index, 1)}<br>
                        Riesgo: ${escapeHTML(row.Risk_Level)}
                    `;

                }

        },

        grid: {

            left:
                90,

            right:
                35,

            top:
                20,

            bottom:
                45

        },

        xAxis: {

            type:
                "value",

            min:
                0,

            max:
                100,

            name:
                "Índice de salud",

            nameLocation:
                "middle",

            nameGap:
                30,

            nameTextStyle: {
                color:
                    COLORS.textSoft
            },

            axisLabel: {
                color:
                    COLORS.textSoft
            },

            splitLine: {

                lineStyle: {
                    color:
                        COLORS.grid
                }

            }

        },

        yAxis: {

            type:
                "category",

            data:
                labels,

            axisLabel: {

                color:
                    COLORS.text,

                fontSize:
                    10

            },

            axisLine: {
                show:
                    false
            },

            axisTick: {
                show:
                    false
            }

        },

        series: [

            {

                type:
                    "bar",

                data:
                    values,

                barMaxWidth:
                    18,

                itemStyle: {

                    color:
                        COLORS.orange,

                    borderRadius:
                        [
                            0,
                            5,
                            5,
                            0
                        ]

                },

                label: {

                    show:
                        true,

                    position:
                        "right",

                    color:
                        COLORS.text,

                    formatter:
                        ({ value }) =>
                            formatNumber(
                                value,
                                1
                            )

                }

            }

        ]

    });


    registerResize(chart);

}


/* ==========================================================
   11. TOP TEMPERATURAS
========================================================== */

function renderTemperatureChart(data) {

    const container =
        document.getElementById(
            "temperature-chart"
        );

    if (!container) {
        return;
    }


    const rows =
        normalizeArray(data);


    /*
        El JSON puede contener todo el histórico.

        Seleccionamos la medición más reciente
        disponible para cada Asset_Key.
    */

    const latestByAsset =
        new Map();


    rows.forEach(row => {

        const asset =
            row.Asset_Key;

        if (!asset) {
            return;
        }


        const timestamp =
            new Date(
                row.Timestamp
            );


        const previous =
            latestByAsset.get(asset);


        if (
            !previous
            ||
            timestamp
                >
            new Date(
                previous.Timestamp
            )
        ) {

            latestByAsset.set(
                asset,
                row
            );

        }

    });


    let latest =
        Array.from(
            latestByAsset.values()
        );


    latest.sort(
        (a, b) =>
            number(b.Temperature_C)
            -
            number(a.Temperature_C)
    );


    latest =
        latest.slice(
            0,
            10
        );


    /*
        Barra horizontal:
        temperatura mayor arriba.
    */

    latest.reverse();


    const labels =
        latest.map(
            row =>
                row.Asset_Key
        );


    const values =
        latest.map(
            row =>
                number(
                    row.Temperature_C
                )
        );


    const chart =
        echarts.init(container);


    chart.setOption({

        backgroundColor:
            "transparent",

        tooltip: {

            trigger:
                "axis",

            axisPointer: {
                type:
                    "shadow"
            },

            formatter:
                params => {

                    const index =
                        params[0].dataIndex;

                    const row =
                        latest[index];

                    return `
                        <strong>${escapeHTML(row.Asset_Key)}</strong><br>
                        Tipo: ${escapeHTML(row.Asset_Type)}<br>
                        Temperatura: ${formatNumber(row.Temperature_C, 1)} °C<br>
                        Fecha: ${escapeHTML(formatDate(row.Timestamp))}
                    `;

                }

        },

        grid: {

            left:
                85,

            right:
                65,

            top:
                20,

            bottom:
                50

        },

        xAxis: {

            type:
                "value",

            name:
                "Temperatura (°C)",

            nameLocation:
                "middle",

            nameGap:
                32,

            nameTextStyle: {
                color:
                    COLORS.textSoft
            },

            axisLabel: {
                color:
                    COLORS.textSoft
            },

            splitLine: {

                lineStyle: {
                    color:
                        COLORS.grid
                }

            }

        },

        yAxis: {

            type:
                "category",

            data:
                labels,

            axisLabel: {
                color:
                    COLORS.text
            },

            axisLine: {
                show:
                    false
            },

            axisTick: {
                show:
                    false
            }

        },

        series: [

            {

                name:
                    "Temperatura",

                type:
                    "bar",

                data:
                    values,

                barMaxWidth:
                    22,

                itemStyle: {

                    color: {

                        type:
                            "linear",

                        x:
                            0,

                        y:
                            0,

                        x2:
                            1,

                        y2:
                            0,

                        colorStops: [

                            {
                                offset:
                                    0,

                                color:
                                    COLORS.blue
                            },

                            {
                                offset:
                                    1,

                                color:
                                    COLORS.cyan
                            }

                        ]

                    },

                    borderRadius:
                        [
                            0,
                            5,
                            5,
                            0
                        ]

                },

                label: {

                    show:
                        true,

                    position:
                        "right",

                    color:
                        COLORS.text,

                    formatter:
                        ({ value }) =>
                            `${formatNumber(value, 1)} °C`

                }

            }

        ]

    });


    registerResize(chart);

}


/* ==========================================================
   12. ALARMAS
========================================================== */

function renderAlarmTable(data) {

    const container =
        document.getElementById(
            "active-alarms-table"
        );

    /*
        Si todavía no agregaste esta tabla
        al HTML, simplemente no hacemos nada.
    */

    if (!container) {
        return;
    }


    const rows =
        normalizeArray(data)
            .sort(
                (a, b) =>
                    new Date(
                        b.Timestamp
                    )
                    -
                    new Date(
                        a.Timestamp
                    )
            )
            .slice(
                0,
                15
            );


    if (!rows.length) {

        container.innerHTML =
            `<p class="dashboard-empty">
                No existen alarmas activas.
            </p>`;

        return;

    }


    const html = `

        <table class="dashboard-table">

            <thead>

                <tr>

                    <th>Fecha</th>

                    <th>Activo</th>

                    <th>Tipo</th>

                    <th>Parámetro</th>

                    <th>Severidad</th>

                    <th>Estado</th>

                </tr>

            </thead>

            <tbody>

                ${rows.map(row => `

                    <tr>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    row.Timestamp
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.Asset_Key
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.Asset_Type
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.Parameter
                            )}
                        </td>

                        <td>

                            <span class="
                                severity-badge
                                severity-${String(
                                    row.Severity
                                ).toLowerCase()}
                            ">

                                ${escapeHTML(
                                    row.Severity
                                )}

                            </span>

                        </td>

                        <td>
                            ${escapeHTML(
                                row.Alarm_Status
                            )}
                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;


    container.innerHTML =
        html;

}


/* ==========================================================
   13. MANTENIMIENTO
========================================================== */

function renderMaintenanceTable(data) {

    const container =
        document.getElementById(
            "maintenance-table"
        );

    if (!container) {
        return;
    }


    const rows =
        normalizeArray(data)
            .sort(
                (a, b) =>
                    new Date(
                        a.Next_General_Maintenance
                    )
                    -
                    new Date(
                        b.Next_General_Maintenance
                    )
            )
            .slice(
                0,
                15
            );


    if (!rows.length) {

        container.innerHTML =
            `<p class="dashboard-empty">
                No existen mantenimientos disponibles.
            </p>`;

        return;

    }


    const html = `

        <table class="dashboard-table">

            <thead>

                <tr>

                    <th>Activo</th>

                    <th>Tipo</th>

                    <th>Último mantenimiento</th>

                    <th>Próximo mantenimiento</th>

                    <th>Estado</th>

                </tr>

            </thead>

            <tbody>

                ${rows.map(row => `

                    <tr>

                        <td>
                            ${escapeHTML(
                                row.Asset_Key
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.Asset_Type
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    row.Last_General_Maintenance
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                formatDate(
                                    row.Next_General_Maintenance
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                row.Maintenance_Status
                            )}
                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;


    container.innerHTML =
        html;

}


/* ==========================================================
   14. FORMATO DE FECHA
========================================================== */

function formatDate(value) {

    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(value);

    }

    return new Intl.DateTimeFormat(
        "es-AR",
        {
            year:
                "numeric",

            month:
                "2-digit",

            day:
                "2-digit"
        }
    ).format(date);

}


/* ==========================================================
   15. ÚLTIMA ACTUALIZACIÓN
========================================================== */

function renderLastUpdate() {

    const element =
        document.getElementById(
            "dashboard-last-update"
        );

    if (!element) {
        return;
    }


    const now =
        new Date();


    element.textContent =
        new Intl.DateTimeFormat(
            "es-AR",
            {
                dateStyle:
                    "medium",

                timeStyle:
                    "short"
            }
        ).format(now);

}


/* ==========================================================
   16. RESPONSIVE ECHARTS
========================================================== */

const charts =
    [];


function registerResize(chart) {

    charts.push(chart);

}


window.addEventListener(
    "resize",
    debounce(
        () => {

            charts.forEach(
                chart => {

                    chart.resize();

                }
            );

        },
        150
    )
);


function debounce(
    callback,
    delay
) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer =
            setTimeout(
                () =>
                    callback(...args),
                delay
            );

    };

}


/* ==========================================================
   17. ERROR GENERAL
========================================================== */

function showDashboardError() {

    const dashboard =
        document.getElementById(
            "digital-dashboard"
        );

    if (!dashboard) {
        return;
    }


    dashboard.insertAdjacentHTML(
        "afterbegin",
        `

        <div class="dashboard-error">

            <strong>
                No fue posible cargar los datos.
            </strong>

            <span>
                Verifique que los archivos JSON estén publicados
                correctamente en la carpeta /data del repositorio.
            </span>

        </div>

        `
    );

}


/* ==========================================================
   18. SPECKLE
========================================================== */

/*
   El visor Speckle continúa funcionando
   de manera independiente.

   Si ya tenés iframe:

   <div class="viewer-frame">
       <iframe ...></iframe>
   </div>

   No hace falta modificar nada acá.
*/


/* ==========================================================
   FIN
========================================================== */
