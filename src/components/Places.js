import React from "react";
import PlacesForm from "./PlacesForm";
import SearchForm from "./SearchForm";
import Sector from "./Sector";
import ModalWindow from "./ModalWindow";
import NameInputModal from "./NameInputModal";

class Places extends React.Component {
    constructor(props) {
        super(props);

        this.sectorSizes = [
            { rows: 8, cols: 7 },
            { rows: 8, cols: 13 },
            { rows: 7, cols: 7 }];

        this.state = {
            name: "",
            sector: "",
            row: "",
            place: "",
            searchName: "",
            modalWindow: null,
            nameInputModal: null,
            mapNamesToPlaces: {},
            sectors: [
                this.createSector(this.sectorSizes[0].rows, this.sectorSizes[0].cols),
                this.createSector(this.sectorSizes[1].rows, this.sectorSizes[1].cols),
                this.createSector(this.sectorSizes[2].rows, this.sectorSizes[2].cols)],
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
            this.addPerson();
        }
    };

    handleRemovePersonButtonClicked = () => {
        if (this.checkName() && this.checkPersonExists()) {
            this.removePerson();
        }
    }

    handleClearPlaceButtonClicked = () => {
        if (this.checkSector() && this.checkRow() && this.checkPlace() && this.checkPlaceEmpty()) {
            this.clearPlace();
        }
    }

    handleReplaceButtonClicked = () => {
        if (this.checkName() && this.checkSector() &&
            this.checkRow() && this.checkPlace() &&
            this.checkPlaceEmpty()) {
            this.replacePerson();
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
            this.showModalWindow("Поиск по участнику",
                `${this.state.searchName}: сектор ${personPlace.sector + 1} ряд ${personPlace.row + 1} место ${personPlace.place + 1}`);
        }
    }

    handleSaveButtonClicked = () => {
        const data = {
            "mapNamesToPlaces": this.state.mapNamesToPlaces,
            "sectors": this.state.sectors
        };

        const blob = new Blob([JSON.stringify(data)], { type: "application/json;charset=utf-8" });
        this.saveTextAsFile(blob, "Места.json");
    }

    handleLoadButtonClicked = (e) => {
        const file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            const data = JSON.parse(fileReader.result);
            this.setState({
                mapNamesToPlaces: data.mapNamesToPlaces,
                sectors: data.sectors
            });
        }
        fileReader.readAsText(file, "UTF-8");
    }

    render() {
        return (
            <React.Fragment>
                {this.state.modalWindow}
                {this.state.nameInputModal}
                <div className="row justify-content-center">
                    <div className="col-5 border rounded p-2 mt-2 mr-2">
                        <PlacesForm
                            name={this.state.name} handleNameChange={this.handleNameChange}
                            row={this.state.row} handleRowChange={this.handleRowChange}
                            sector={this.state.sector} handleSectorChange={this.handleSectorChange}
                            place={this.state.place} handlePlaceChange={this.handlePlaceChange}
                            handleAddButtonClicked={this.handleAddButtonClicked}
                            handleRemovePersonButtonClicked={this.handleRemovePersonButtonClicked}
                            handleClearPlaceButtonClicked={this.handleClearPlaceButtonClicked}
                            handleReplaceButtonClicked={this.handleReplaceButtonClicked}
                            handleResetButtonClicked={this.handleResetButtonClicked}
                            handleSaveButtonClicked={this.handleSaveButtonClicked}
                            handleLoadButtonClicked={this.handleLoadButtonClicked} />
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
                            sectorSize={this.sectorSizes[0]}
                            sectorNumber={1}
                            onPlaceClick={this.handlePlaceClicked} />
                    </div>
                    <div style={{ width: "46%", marginLeft: "1%", marginRight: "1%" }}>
                        <Sector
                            sector={this.state.sectors[1]}
                            sectorSize={this.sectorSizes[1]}
                            sectorNumber={2}
                            onPlaceClick={this.handlePlaceClicked} />
                    </div>
                    <div style={{ width: "24%", marginLeft: "1%", marginRight: "1%" }}>
                        <Sector
                            sector={this.state.sectors[2]}
                            sectorSize={this.sectorSizes[2]}
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
            this.showModalWindow("Распределение мест", "Введите участника");
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
        if (row > this.sectorSizes[sector - 1].rows) {
            this.showModalWindow("Распределение мест",
                `Номер ряда в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.sectorSizes[sector - 1].rows} включительно`);
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
        if (place > this.sectorSizes[sector - 1].cols) {
            this.showModalWindow("Распределение мест",
                `Номер места в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.sectorSizes[sector - 1].cols} включительно`);
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
            this.showModalWindow("Распределение мест", "Введите участника для поиска");
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

    handlePlaceClicked = (sector, row, place) => {
        this.setState({
            sector: sector + 1,
            row: row + 1,
            place: place + 1
        });
        this.showNameInputModal();
    }

    showNameInputModal = () => {
        this.setState({
            nameInputModal: <NameInputModal
                handleNameEntered={this.handleNameInputReturnData}
                handleCloseClicked={this.handleNameInputModalClose} />
        });
    }

    handleNameInputReturnData = (name) => {
        this.setState({
            nameInputModal: null,
            name: name
        }, () => {
            if (this.state.sectors[this.state.sector - 1][this.state.row - 1][this.state.place - 1] === undefined)
                this.addPerson();
            else
                this.replacePerson();
        });
    }

    handleNameInputModalClose = () => this.setState({ nameInputModal: null });

    createSector = (rows, cols) => {
        return Array(rows).fill().map(() => Array(cols).fill());
    }

    saveTextAsFile(blob, fileName) {
        let downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.innerHTML = "Сохранить";
        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(blob);
        }
        else {
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.onclick = (event) => document.body.removeChild(event.target);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    }

    addPerson = () => {
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

    replacePerson = () => {
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

    removePerson = () => {
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

    clearPlace = () => {
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

export default Places;