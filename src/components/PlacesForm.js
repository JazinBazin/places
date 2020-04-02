import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import HideButton from "./HideButton";

const PlacesForm = ({
    name, handleNameChange,
    sector, handleSectorChange,
    rowFrom, handleRowFromChange,
    rowTo, handleRowToChange,
    placeFrom, handlePlaceFromChange,
    placeTo, handlePlaceToChange,
    handleAddButtonClicked,
    handleRemovePersonButtonClicked,
    handleClearPlaceButtonClicked,
    handleReplaceButtonClicked,
    handleResetButtonClicked,
    handleSaveButtonClicked,
    handleLoadButtonClicked,
    handleFillButtonClicked,
    color, onColorChange,
    handleUpdatePersonClicked,
    handleCalculateButtonClicked
}) => {
    const [hidden, setHidden] = useState(false);
    const display = hidden ? "none" : "block";
    return (
        <form
            className="border rounded p-2 mt-2"
            style={{ position: "relative" }}>
            <h4 className="text-center mb-0">Распределение мест</h4>
            <HideButton handleClick={setHidden} position="absolute" />
            <div style={{ display: display }}>
                <div className="form-row mt-2">
                    <div className="col-4">
                        <div className="form-group">
                            <label>Участник:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={name}
                                onChange={handleNameChange} />
                        </div>
                    </div>
                    <div className="col-1">
                        <div className="form-group">
                            <label>Сектор:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={sector}
                                onChange={handleSectorChange} />
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Ряд:</label>
                            <div className="form-row">
                                <div className="col-6">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="от"
                                        value={rowFrom}
                                        onChange={handleRowFromChange} />
                                </div>
                                <div className="col-6">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="до"
                                        value={rowTo}
                                        onChange={handleRowToChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Место:</label>
                            <div className="form-row">
                                <div className="col-6">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="от"
                                        value={placeFrom}
                                        onChange={handlePlaceFromChange} />
                                </div>
                                <div className="col-6">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="до"
                                        value={placeTo}
                                        onChange={handlePlaceToChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                        <div className="form-group">
                            <label>Цвет:</label>
                            <ColorPicker
                                color={color}
                                onColorChange={onColorChange} />
                        </div>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="col-auto">
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleAddButtonClicked}>
                            Добавить
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleReplaceButtonClicked}>
                            Заменить
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleUpdatePersonClicked}>
                            Изменить
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleClearPlaceButtonClicked}>
                            Освободить место
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleRemovePersonButtonClicked}>
                            Удалить
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleFillButtonClicked}>
                            Заполнить
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="reset"
                            onClick={handleResetButtonClicked}>
                            Очистить
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleCalculateButtonClicked}>
                            Подсчёт
                        </button>
                        <button
                            className="btn btn-primary btn-sm mr-2"
                            type="button"
                            onClick={handleSaveButtonClicked}>
                            Сохранить
                        </button>
                        <label className="btn btn-primary btn-sm m-0">
                            Загрузить <input type="file" accept="application/json" onChange={handleLoadButtonClicked} hidden />
                        </label>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default PlacesForm;