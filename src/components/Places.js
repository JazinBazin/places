import React from "react";
import ModalWindow from "./ModalWindow";


class Places extends React.Component {
    constructor(props) {
        super(props);
        const sectorSizes = [
            { rows: 8, cols: 7 },
            { rows: 8, cols: 13 },
            { rows: 7, cols: 7 }];

        this.state = {
            mapNamesToPlaces: {},
            sectors: [
                this.createSector(sectorSizes[0].rows, sectorSizes[0].cols),
                this.createSector(sectorSizes[1].rows, sectorSizes[1].cols),
                this.createSector(sectorSizes[2].rows, sectorSizes[2].cols)],
            sectorSizes: sectorSizes,
            name: "",
            sector: "",
            row: "",
            place: "",
            searchName: "",
            modalWindow: null
        };
    }

    createSector = (rows, cols) => {
        return Array(rows).fill().map(() => Array(cols).fill());
    }

    showModalWindow = (title, text) => {
        this.setState({
            modalWindow: <ModalWindow
                title={title}
                text={text}
                handleCloseClicked={this.handleModalWindowClose} />
        });
    }

    handleModalWindowClose = () => this.setState({ modalWindow: null });

    checkIsNumberOrEmpty = (value) => {
        if (value == "") return "";
        const number = Number(value);
        if (number && number >= 1) return number;
        return NaN;
    }

    handleNameChange = e => this.setState({ name: e.target.value });

    handleSectorChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value) && value) this.setState({ sector: value });
    }

    handleRowChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ sector: value });
    }

    handlePlaceChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ sector: value });
    }

    handleAddButtonClicked = () => {
        if (this.state.name.length == 0) {
            this.showModalWindow("Распределение мест", "Введите фамилию");
            return;
        }
        if (this.state.sector.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер сектора");
            return;
        }
        if (this.state.sector > 3) {
            this.showModalWindow("Распределение мест", "Номер сектора должен быть в диапазоне от 1 до 3 включительно");
            return;
        }
        if (this.state.row.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер ряда");
            return;
        }
        if (this.state.row > this.state.sectorSizes[this.state.sector].rows) {
            this.showModalWindow("Распределение мест", "Номер ряда в секторе " + this.state.sector + " должен быть в диапазоне от 1 до " + this.state.sectorSizes[this.state.sector].rows + " включительно");
            return;
        }
        if (this.state.place.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер места");
            return;
        }
        this.setState(state => ({
            mapNamesToPlaces: {
                [state.name]: {
                    "sector": state.sector,
                    "row": state.row,
                    "place": state.place
                },
                ...state.mapNamesToPlaces
            }
        }));
    };

    handleResetButtonClicked = () => {
        this.setState({
            name: null,
            sector: null,
            row: null,
            place: null
        });
    }

    handleDeleteButtonClicked = () => {
        alert("Delete");
    }

    handeReplaceButtonClicked = () => {
        alert("Replace");
    }

    handleSearchNameChanged = e => this.setState({ searchName: e.target.value });

    handleSearchButtonClicked = () => {
        alert("Search");
    }

    render() {
        return (
            <React.Fragment>
                {this.state.modalWindow}
                <div className="row justify-content-center">
                    <div className="col-4 border rounded p-2 mt-2 mr-2">
                        <form>
                            <h4 className="text-center">Распределение мест</h4>
                            <div className="form-row mt-2">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Фамилия:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.name}
                                            onChange={this.handleNameChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Ряд:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.row}
                                            onChange={this.handleRowChange} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Сектор:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.sector}
                                            onChange={this.handleSectorChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Место:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.place}
                                            onChange={this.handlePlaceChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row justify-content-center">
                                <div className="col-auto">
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        type="button"
                                        onClick={this.handleAddButtonClicked}>
                                        Добавить
                                </button>
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        type="button"
                                        onClick={this.handleDeleteButtonClicked}>
                                        Удалить
                                </button>
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        type="button"
                                        onClick={this.handeReplaceButtonClicked}>
                                        Заменить
                                </button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="reset"
                                        onClick={this.handleResetButtonClicked}>
                                        Очистить
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-4 ">
                        <form className="border rounded p-2 mt-2">
                            <h4 className="text-center">Поиск по фамилии</h4>
                            <div className="form-row mt-2">
                                <div className="col">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.searchName}
                                        placeholder="Фамилия"
                                        onChange={this.handleSearchNameChanged} />
                                </div>
                                <div className="col-auto">
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={this.handleSearchButtonClicked}>
                                        Поиск
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Places;