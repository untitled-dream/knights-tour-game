const gameResultPopup = document.querySelector("#game-result-popup");
const popupMessage = document.querySelector(".popup__message");

export function openGameResultPopup(message) {
    gameResultPopup.classList.add("popup_opened");

    popupMessage.textContent = message;

    setEventListener();
}

function setEventListener() {
    gameResultPopup.addEventListener("mousedown", handleOverlayClose);
    document.addEventListener("keydown", handleModalEscapePress);
}

function closeGameResultPopup(popup) {
    popup.classList.remove("popup_opened");

    document.removeEventListener("keydown", handleModalEscapePress);
}

function handleOverlayClose(evt) {
    const popupClosedByBackdrop = evt.target;

    if (popupClosedByBackdrop.classList.contains("popup_opened")) {
        closeGameResultPopup(popupClosedByBackdrop);
    }
}

function handleModalEscapePress(evt) {
    if (evt.key === "Escape") {
        closeGameResultPopup(gameResultPopup)
    }
}

document.querySelector(".popup__close-button").addEventListener("click", () => closeGameResultPopup(gameResultPopup));