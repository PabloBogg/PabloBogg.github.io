const API_URL = "http://127.0.0.1:8000";

const messages = document.getElementById("chatMessages");
const textarea = document.getElementById("question");
const sendButton = document.getElementById("sendButton");

async function sendQuestion(question) {

    if (!question.trim()) return;

    addUserMessage(question);

    textarea.value = "";

    const loading = addAssistantMessage("Pensando...");

    try {

        const response = await fetch(`${API_URL}/ask`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });

        const data = await response.json();

        loading.innerHTML = formatText(data.response);

    }

    catch (error) {

        loading.innerHTML =
            "❌ No fue posible conectar con el asistente.";

        console.error(error);

    }

}

function addUserMessage(text) {

    const div = document.createElement("div");

    div.className = "user-message";

    div.innerHTML = `
        <p>${text}</p>
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}

function addAssistantMessage(text) {

    const div = document.createElement("div");

    div.className = "assistant-message";

    div.innerHTML = `
        <p>${text}</p>
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

    return div;

}

function formatText(text){

    return text.replace(/\n/g,"<br>");

}

sendButton.addEventListener("click",()=>{

    sendQuestion(textarea.value);

});

textarea.addEventListener("keydown",(e)=>{

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        sendQuestion(textarea.value);

    }

});

document.querySelectorAll(".prompt-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        sendQuestion(btn.innerText);

    });

});
