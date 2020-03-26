import React from "react";
import "../styles/upload.css";

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
    handleLoadButtonClicked
}) => (
        <form>
            <h4 className="text-center">Распределение мест</h4>
            <div className="form-row mt-2">
                <div className="col">
                    <div className="form-group">
                        <label>Участник:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={name}
                            onChange={handleNameChange} />
                    </div>
                    <div className="form-group">
                        <label>Ряд:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={row}
                            onChange={handleRowChange} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label>Сектор:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={sector}
                            onChange={handleSectorChange} />
                    </div>
                    <div className="form-group">
                        <label>Место:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={place}
                            onChange={handlePlaceChange} />
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
                        onClick={handleResetButtonClicked}>
                        Очистить
                    </button>
                    <button
                        className="btn btn-primary btn-sm mr-2"
                        type="reset"
                        onClick={handleSaveButtonClicked}>
                        Сохранить
                    </button>
                    <div class="upload-btn-wrapper">
                        <button class="btn btn-primary btn-sm">Загрузить</button>
                        <input type="file" accept="application/json" onChange={handleLoadButtonClicked} />
                    </div>
                </div>
            </div>
        </form>
    );

export default PlacesForm;