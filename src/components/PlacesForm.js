import React from "react";
import ColorPicker from "./ColorPicker";

const PlacesForm = ({
    name, handleNameChange,
    row, handleRowChange,
    sector, handleSectorChange,
    place, handlePlaceChange,
    handleAddButtonClicked,
    handleRemovePersonButtonClicked,
    handleClearPlaceButtonClicked,
    handleReplaceButtonClicked,
    handleResetButtonClicked,
    handleSaveButtonClicked,
    handleLoadButtonClicked,
    handleFillButtonClicked
}) => (
        <form>
            <h4 className="text-center">Распределение мест</h4>
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
                <div className="col-2">
                    <div className="form-group">
                        <label>Сектор:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={sector}
                            onChange={handleSectorChange} />
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label>Ряд:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={row}
                            onChange={handleRowChange} />
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label>Место:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={place}
                            onChange={handlePlaceChange} />
                    </div>
                </div>
                <div className="col-2">
                    <div className="form-group">
                        <label>Цвет:</label>
                        <ColorPicker />
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
                        onClick={handleRemovePersonButtonClicked}>
                        Удалить участника
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
                        onClick={handleReplaceButtonClicked}>
                        Заменить
                    </button>
                    <button
                        className="btn btn-primary btn-sm mr-2"
                        type="reset"
                        onClick={handleFillButtonClicked}>
                        Заполнить пустые
                    </button>
                    <button
                        className="btn btn-primary btn-sm mr-2"
                        type="reset"
                        onClick={handleResetButtonClicked}>
                        Очистить
                    </button>
                    <button
                        className="btn btn-primary btn-sm mr-2"
                        type="reset"
                        onClick={handleSaveButtonClicked}>
                        Сохранить
                    </button>
                    <label className="btn btn-primary btn-sm m-0">
                        Загрузить <input type="file" accept="application/json" onChange={handleLoadButtonClicked} hidden />
                    </label>
                </div>
            </div>
        </form>
    );

export default PlacesForm;