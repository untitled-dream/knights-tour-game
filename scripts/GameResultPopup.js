import Popup from "./Popup.js";

export default class GameResultPopup extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._resultMessage = document.querySelector(".popup__message");
        this._buttonReset = this._popup.querySelector("#reset");
        this._buttonClose = this._popup.querySelector("#close");
    }

    setEventListener() {
        super.setEventListener();

        this._buttonClose.addEventListener("click", () => this.close())
    }

    open(message) {
        super.open();
        this._resultMessage.textContent = message;
    }

    close() {
        super.close();
    }
}