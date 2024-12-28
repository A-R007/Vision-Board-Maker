document.getElementById("add-text").addEventListener("click", addText);
document.getElementById("add-image").addEventListener("click", addImage);
document.getElementById("generate-quote").addEventListener("click", generateQuote);
document.getElementById("export-board").addEventListener("click", exportBoard);
document.getElementById("theme-selector").addEventListener("change", changeTheme);
document.getElementById("music-toggle").addEventListener("click", toggleMusic);

function addText() {
    const text = prompt("Enter your text:");
    if (text) {
        const textElement = createDraggableElement("div", text);
        document.getElementById("board").appendChild(textElement);
    }
}

function addImage() {
    const url = prompt("Enter image URL:");
    if (url) {
        const imgElement = createDraggableElement("img");
        imgElement.src = url;
        document.getElementById("board").appendChild(imgElement);
    }
}

async function generateQuote() {
    const response = await fetch('/generate-quote');
    const data = await response.json();
    const quoteElement = createDraggableElement("div", `"${data.quote}"`);
    document.getElementById("board").appendChild(quoteElement);
}

function exportBoard() {
    html2canvas(document.getElementById("board")).then(canvas => {
        const link = document.createElement("a");
        link.download = "vision-board.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}

function changeTheme() {
    const theme = document.getElementById("theme-selector").value;
    document.body.setAttribute("data-theme", theme);
}

function toggleMusic() {
    const audio = document.getElementById("background-music") || new Audio("assets/music/background.mp3");
    audio.loop = true;
    if (audio.paused) {
        audio.play();
        document.getElementById("music-toggle").textContent = "🔇 Mute Music";
    } else {
        audio.pause();
        document.getElementById("music-toggle").textContent = "🎵 Play Music";
    }
}

function createDraggableElement(tag, content = "") {
    const element = document.createElement(tag);
    element.textContent = content;
    element.className = "draggable";
    interact(element).draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: "parent",
                endOnly: true,
            }),
        ],
        onmove: dragMoveListener,
    });
    return element;
}

function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}
