import React from "react";
import PlacesForm from "./PlacesForm";
import SearchForm from "./SearchForm";
import Sector from "./Sector";
import ModalWindow from "./ModalWindow";
import TextInputModal from "./TextInputModal";

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
            modalWindow: null,
            textInputWindow: null,
        };
    }

    handleNameChange = e => this.setState({ name: e.target.value });

    handleSectorChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value))
            this.setState({ sector: value });
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
        if (this.checkName() && this.checkSector() &&
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

    handleRemovePersonButtonClicked = () => {
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

    handleClearPlaceButtonClicked = () => {
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
        if (this.checkName() && this.checkSector() &&
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
        if (this.checkSearchName() && this.checkPersonExists()) {
            const personPlace = this.state.mapNamesToPlaces[this.state.searchName];
            this.showModalWindow("Поиск по фамилии",
                `${this.state.searchName}: сектор ${personPlace.sector + 1} ряд ${personPlace.row + 1} место ${personPlace.place + 1}`);
        }
    }

    handlePlaceClicked = (sector, row, place) => {
        this.showTextInputWindow();
        // this.showModalWindow("", `${sector} ${row} ${place}`);
    }

    render() {
        return (
            <React.Fragment>
                {this.state.modalWindow}
                {this.state.textInputWindow}
                <div className="row justify-content-center">
                    <div className="col-4 border rounded p-2 mt-2 mr-2">
                        <PlacesForm
                            name={this.state.name} handleNameChange={this.handleNameChange}
                            row={this.state.row} handleRowChange={this.handleRowChange}
                            sector={this.state.sector} handleSectorChange={this.handleSectorChange}
                            place={this.state.place} handlePlaceChange={this.handlePlaceChange}
                            handleAddButtonClicked={this.handleAddButtonClicked}
                            handleRemovePersonButtonClicked={this.handleRemovePersonButtonClicked}
                            handleClearPlaceButtonClicked={this.handleClearPlaceButtonClicked}
                            handleReplaceButtonClicked={this.handleReplaceButtonClicked}
                            handleResetButtonClicked={this.handleResetButtonClicked} />
                    </div>
                    <div className="col-3">
                        <SearchForm searchName={this.state.searchName}
                            handleSearchNameChanged={this.handleSearchNameChanged}
                            handleSearchButtonClicked={this.handleSearchButtonClicked} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div style={{ width: "24%", marginLeft: "1%", marginRight: "1%" }}>
                        <Sector
                            sector={this.state.sectors[0]}
                            sectorSize={this.state.sectorSizes[0]}
                            sectorNumber={1}
                            onPlaceClick={this.handlePlaceClicked} />
                    </div>
                    <div style={{ width: "46%", marginLeft: "1%", marginRight: "1%" }}>
                        <Sector
                            sector={this.state.sectors[1]}
                            sectorSize={this.state.sectorSizes[1]}
                            sectorNumber={2}
                            onPlaceClick={this.handlePlaceClicked} />
                    </div>
                    <div style={{ width: "24%", marginLeft: "1%", marginRight: "1%" }}>
                        <Sector
                            sector={this.state.sectors[2]}
                            sectorSize={this.state.sectorSizes[2]}
                            sectorNumber={3}
                            onPlaceClick={this.handlePlaceClicked} />
                    </div>
                </div>
            </React.Fragment >
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
        if (row > this.state.sectorSizes[sector - 1].rows) {
            this.showModalWindow("Распределение мест",
                `Номер ряда в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.state.sectorSizes[sector - 1].rows} включительно`);
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
        if (place > this.state.sectorSizes[sector - 1].cols) {
            this.showModalWindow("Распределение мест",
                `Номер места в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.state.sectorSizes[sector - 1].cols} включительно`);
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

    checkSearchName = () => {
        const name = this.state.searchName;
        if (name.length == 0) {
            this.showModalWindow("Распределение мест", "Введите фамилию для поиска");
            return false;
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

    showTextInputWindow = () => {
        this.setState({
            textInputWindow: <TextInputModal
                title="Фамилия:"
                handleCloseClicked={this.handleTextInputWindowClose} />
        });
    }

    handleTextInputWindowClose = () => this.setState({ textInputWindow: null });

    createSector = (rows, cols) => {
        return Array(rows).fill().map(() => Array(cols).fill());
    }
}

export default Places;