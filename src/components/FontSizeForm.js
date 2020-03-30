import React from "react";

const FontSizeForm = ({ fontSize, onFontSizeChange }) => (
    <form className="border rounded p-2 mt-2">
        <h4 className="text-center">Размер шрифта</h4>
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
    </form>
);

export default FontSizeForm;