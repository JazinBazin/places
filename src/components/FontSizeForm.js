import React, { useState } from "react";
import HideButton from "./HideButton";

const FontSizeForm = ({ fontSize, onFontSizeChange }) => {
    const [hidden, setHidden] = useState(false);
    const display = hidden ? "none" : "block";

    return (
        <form
            className="border rounded p-2 mt-2"
            style={{ position: "relative" }}>
            <h4 className="text-center mb-0">Размер шрифта</h4>
            <HideButton handleClick={setHidden} position="absolute"/>
            <div style={{ display: display }} >
                <div className="form-row mt-2">
                    <input
                        type="range"
                        className="custom-range"
                        min="0.5"
                        max="1.5"
                        step="0.01"
                        value={fontSize}
                        onChange={onFontSizeChange} />
                </div>
            </div>
        </form>
    );
}

export default FontSizeForm;