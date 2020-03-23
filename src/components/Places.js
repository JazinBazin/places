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

    handleNameChange = e => this.setState({ name: e.target.value });

    handleSectorChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value) && value) this.setState({ sector: value });
    }

    handleRowChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ row: value });
    }

    handlePlaceChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ place: value });
    }

    handleAddButtonClicked = () => {
        if (this.checkName() && this.checkSector &&
            this.checkRow() && this.checkPlace() &&
            this.checkPlaceTaken()) {
            this.setState(state => ({
                mapNamesToPlaces: {
                    [state.name]: {
                        "sector": state.sector - 1,
                        "row": state.row - 1,
                        "place": state.place - 1
                    },
                    ...state.mapNamesToPlaces
                },
                sectors: state.sectors.map((sector, index) => {
                    if (index == state.sector - 1)
                        return sector.map((row, index) => {
                            if (index == state.row - 1)
                                return row.map((name, index) => {
                                    if (index == state.place - 1)
                                        return state.name;
                                    else return name;
                                });
                            else return row;
                        })
                    else return sector;
                })
            }), () => console.log(this.state.mapNamesToPlaces, this.state.sectors));
        }
    };

    handleRemovePerson = () => {
        if (this.checkName() && this.checkPersonExists()) {
            this.setState(state => ({
                mapNamesToPlaces: Object.keys(state.mapNamesToPlaces)
                    .reduce((result, key) => {
                        if (key !== state.name)
                            result[key] = state.mapNamesToPlaces[key];
                        return result;
                    }, {}),
                sectors: state.sectors.map(sector => {
                    return sector.map(row => {
                        return row.map(name => {
                            if (name == state.name)
                                return undefined;
                            else return name;
                        })
                    })
                })
            }), () => console.log(this.state.mapNamesToPlaces, this.state.sectors));
        }
    }

    handleClearPlace = () => {
        if (this.checkSector() && this.checkRow() && this.checkPlace() && this.checkPlaceEmpty()) {
            this.setState(state => ({
                mapNamesToPlaces: Object.keys(state.mapNamesToPlaces)
                    .reduce((result, name) => {
                        if (state.mapNamesToPlaces[name].sector != state.sector - 1 ||
                            state.mapNamesToPlaces[name].row != state.row - 1 ||
                            state.mapNamesToPlaces[name].place != state.place - 1)
                            result[name] = state.mapNamesToPlaces[name];
                        return result;
                    }, {}),
                sectors: state.sectors.map((sector, index) => {
                    if (index == state.sector - 1)
                        return sector.map((row, index) => {
                            if (index == state.row - 1)
                                return row.map((name, index) => {
                                    if (index == state.place - 1)
                                        return undefined;
                                    else return name;
                                });
                            else return row;
                        })
                    else return sector;
                })
            }), () => console.log(this.state.mapNamesToPlaces, this.state.sectors));
        }
    }

    handleReplaceButtonClicked = () => {
        if (this.checkName() && this.checkSector &&
            this.checkRow() && this.checkPlace() &&
            this.checkPlaceEmpty()) {
            this.setState(state => ({
                mapNamesToPlaces: Object.keys(state.mapNamesToPlaces)
                    .reduce((result, name) => {
                        if (state.mapNamesToPlaces[name].sector == state.sector - 1 &&
                            state.mapNamesToPlaces[name].row == state.row - 1 &&
                            state.mapNamesToPlaces[name].place == state.place - 1)
                            result[state.name] = state.mapNamesToPlaces[name];
                        else
                            result[name] = state.mapNamesToPlaces[name];
                        return result;
                    }, {}),
                sectors: state.sectors.map((sector, index) => {
                    if (index == state.sector - 1)
                        return sector.map((row, index) => {
                            if (index == state.row - 1)
                                return row.map((name, index) => {
                                    if (index == state.place - 1)
                                        return state.name;
                                    else return name;
                                });
                            else return row;
                        })
                    else return sector;
                })
            }), () => console.log(this.state.mapNamesToPlaces, this.state.sectors));
        }
    }

    handleResetButtonClicked = () => {
        this.setState({
            name: "",
            sector: "",
            row: "",
            place: ""
        });
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
                    <div className="col-6 border rounded p-2 mt-2 mr-2">
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
                                        onClick={this.handleRemovePerson}>
                                        Удалить участника
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        type="button"
                                        onClick={this.handleClearPlace}>
                                        Освободить место
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        type="button"
                                        onClick={this.handleReplaceButtonClicked}>
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

    checkName = () => {
        const name = this.state.name;
        if (name.length == 0) {
            this.showModalWindow("Распределение мест", "Введите фамилию");
            return false;
        }
        return true;
    }

    checkSector = () => {
        const sector = this.state.sector;
        if (sector.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер сектора");
            return false;
        }
        if (sector > 3) {
            this.showModalWindow("Распределение мест",
                "Номер сектора должен быть в диапазоне от 1 до 3 включительно");
            return false;
        }
        return true;
    }

    checkRow = () => {
        const row = this.state.row;
        const sector = this.state.sector;
        if (row.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер ряда");
            return false;
        }
        if (row > this.state.sectorSizes[sector].rows) {
            this.showModalWindow("Распределение мест",
                `Номер ряда в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.state.sectorSizes[sector].rows} включительно`);
            return false;
        }
        return true;
    }

    checkPlace = () => {
        const sector = this.state.sector;
        const place = this.state.place;
        if (place.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер места");
            return false;
        }
        if (place > this.state.sectorSizes[sector].cols) {
            this.showModalWindow("Распределение мест",
                `Номер места в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.state.sectorSizes[sector].cols} включительно`);
            return false;
        }
        return true;
    }

    checkPlaceTaken = () => {
        const sector = this.state.sector;
        const row = this.state.row;
        const place = this.state.place;
        if (this.state.sectors[sector - 1][row - 1][place - 1] !== undefined) {
            this.showModalWindow("Распределение мест",
                `Узазанное место занято: ${this.state.sectors[sector - 1][row - 1][place - 1]}`);
            return false;
        }
        return true;
    }

    checkPlaceEmpty = () => {
        const sector = this.state.sector;
        const row = this.state.row;
        const place = this.state.place;
        if (this.state.sectors[sector - 1][row - 1][place - 1] === undefined) {
            this.showModalWindow("Распределение мест", "Узазанное место свободно");
            return false;
        }
        return true;
    }

    checkPersonExists = () => {
        if (this.state.mapNamesToPlaces[this.state.name] === undefined) {
            this.showModalWindow("Распределение мест", "Указанного участника не существует");
            return;
        }
        return true;
    }

    checkIsNumberOrEmpty = (value) => {
        if (value == "") return "";
        const number = Number(value);
        if (number && number >= 1) return number;
        return NaN;
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

    createSector = (rows, cols) => {
        return Array(rows).fill().map(() => Array(cols).fill());
    }
}

export default Places;