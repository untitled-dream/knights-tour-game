export const gameResultPopup = document.querySelector("#game-result-popup");
const popupMessage = document.querySelector(".popup__message");

export function openGameResultPopup(message) {
    gameResultPopup.classList.add("popup_opened");

    popupMessage.textContent = message;

    setEventListener();
}

function setEventListener() {
    document.addEventListener("keydown", handleModalEscapePress);
    gameResultPopup.addEventListener("mousedown", handleOverlayClose);
}

export function closeGameResultPopup() {
    gameResultPopup.classList.remove("popup_opened");

    document.removeEventListener("keydown", handleModalEscapePress);
}

function handleOverlayClose(evt) {
    const popupClosedByBackdrop = evt.target;

    if (popupClosedByBackdrop.classList.contains("popup_opened")) {
        closeGameResultPopup();
    }
}

function handleModalEscapePress(evt) {
    if (evt.key === "Escape") {
        closeGameResultPopup();
    }
}

document.querySelectorAll("#close").forEach(closeButton => 
    closeButton.addEventListener("click", () => closeGameResultPopup())
);