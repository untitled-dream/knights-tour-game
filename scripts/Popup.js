export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        
        this.boundEscapeCloseHandler = this._handleEscClose.bind(this);
    }

    setEventListener() {
        this._popup.addEventListener("mousedown", (evt) => this._handleOverlayClose(evt));
    }

    open() {
        document.addEventListener("keydown", this.boundEscapeCloseHandler);
        this._popup.classList.add("popup_opened");
    }

    close() {
        document.removeEventListener("keydown", this.boundEscapeCloseHandler);
        this._popup.classList.remove("popup_opened");
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            this.close();
        }
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }
}