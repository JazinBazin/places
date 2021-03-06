import React from "react";
import PlacesForm from "./PlacesForm";
import SearchForm from "./SearchForm";
import Sector from "./Sector";
import ModalWindow from "./ModalWindow";
import PlaceInputModal from "./PlaceInputModal";
import FontSizeForm from "./FontSizeForm";
import ConferenceName from "./ConferenceName";
import ConferenceNameInputModal from "./ConferenceNameInputModal";
import HideButton from "./HideButton";
import Screen from "./Screen";

class Places extends React.Component {

    //+++
    constructor(props) {
        super(props);

        this.sectorSizes = [
            { rows: 8, cols: 7 },
            { rows: 8, cols: 13 },
            { rows: 7, cols: 7 },
            { rows: 1, cols: 7 }];

        this.emptyPlace = { name: "", color: "#FFFFFF", fontColor: "#000000" };
        this.emptySectors = this.sectorSizes.map(sectorSize => {
            return this.createSector(sectorSize.rows, sectorSize.cols, this.emptyPlace);
        });

        this.wallLineStyle = { stroke: "rgb(0,0,0)", strokeWidth: "4" };
        this.doorLineStyle = { stroke: "rgb(0,0,0)", strokeWidth: "2" };

        this.highlightColor = "#FF0000";

        this.state = {
            name: "",
            sector: "",
            rowFrom: "",
            rowTo: "",
            placeFrom: "",
            placeTo: "",
            color: "#F5CBA7",
            sectors: this.emptySectors,
            searchName: "",
            fillName: "",
            fillColor: "#E5E7E9",
            fontSize: 1,
            formsHidden: false,
            conferenceName: 'СХЕМА РАЗМЕЩЕНИЯ УЧАСТНИКОВ\n' +
                'IV Военно-научной конференции\n' +
                '"Роботизация Вооруженных Сил Российской Федерации"\n' +
                'от Министерства обороны Российской Федерации',
            modalWindow: null,
            placeInputModal: null,
            conferenceNameInputModal: null,
        };
    }

    ///+++
    checkSector = () => {
        const sector = this.state.sector;
        if (sector.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер сектора");
            return false;
        }
        if (sector > this.state.sectors.length) {
            this.showModalWindow("Распределение мест",
                `Номер сектора должен быть в диапазоне от 1 до ${this.state.sectors.length} включительно`);
            return false;
        }
        return true;
    }

    //+++
    checkRow = () => {
        const sector = this.state.sector;
        const rowFrom = this.state.rowFrom;
        const rowTo = this.state.rowTo;
        if (rowFrom.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер начального ряда");
            return false;
        }
        if (rowTo.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер конечного ряда");
            return false;
        }
        if (rowFrom > this.sectorSizes[sector - 1].rows || rowTo > this.sectorSizes[sector - 1].rows) {
            this.showModalWindow("Распределение мест",
                `Номер ряда в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.sectorSizes[sector - 1].rows} включительно`);
            return false;
        }
        if (rowFrom > rowTo) {
            this.showModalWindow("Распределение мест",
                "Номер начального ряда должен быть меньше либо равен номеру конечного ряда");
            return false;
        }
        return true;
    }

    //+++
    checkPlace = () => {
        const sector = this.state.sector;
        const placeFrom = this.state.placeFrom;
        const placeTo = this.state.placeTo;
        if (placeFrom.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер начального места");
            return false;
        }
        if (placeTo.length == 0) {
            this.showModalWindow("Распределение мест", "Введите номер конечного места");
            return false;
        }
        if (placeFrom > this.sectorSizes[sector - 1].cols || placeTo > this.sectorSizes[sector - 1].cols) {
            this.showModalWindow("Распределение мест",
                `Номер места в секторе ${sector} должен быть в диапазоне от 1
                 до ${this.sectorSizes[sector - 1].cols} включительно`);
            return false;
        }
        if (placeFrom > placeTo) {
            this.showModalWindow("Распределение мест",
                "Номер начального места должен быть меньше либо равен номеру конечного места");
            return false;
        }
        return true;
    }

    //+++
    checkPlaceTaken = () => {
        const sector = this.state.sector - 1;
        const rowFrom = this.state.rowFrom - 1;
        const rowTo = this.state.rowTo;
        const placeFrom = this.state.placeFrom - 1;
        const placeTo = this.state.placeTo;

        for (let row = rowFrom; row < rowTo; ++row) {
            for (let place = placeFrom; place < placeTo; ++place) {
                if (this.state.sectors[sector][row][place].name.length != 0) {
                    this.showModalWindow("Распределение мест",
                        `Узазанное место занято - ${this.state.sectors[sector][row][place].name} (сектор ${sector + 1}, ряд ${row + 1}, место ${place + 1})`);
                    return false;
                }
            }
        }
        return true;
    }

    //+++
    checkPlaceEmpty = () => {
        const sector = this.state.sector - 1;
        const rowFrom = this.state.rowFrom - 1;
        const rowTo = this.state.rowTo;
        const placeFrom = this.state.placeFrom - 1;
        const placeTo = this.state.placeTo;

        for (let row = rowFrom; row < rowTo; ++row) {
            for (let place = placeFrom; place < placeTo; ++place) {
                if (this.state.sectors[sector][row][place].name.length == 0) {
                    this.showModalWindow("Распределение мест",
                        `Узазанное место свободно (сектор ${sector + 1}, ряд ${row + 1}, место ${place + 1})`);
                    return false;
                }
            }
        }
        return true;
    }

    //+++
    handleSectorChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ sector: value });
    }

    //+++
    handleRowFromChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ rowFrom: value });
    }

    //+++
    handleRowToChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ rowTo: value });
    }

    //+++
    handlePlaceFromChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ placeFrom: value });
    }

    //+++
    handlePlaceToChange = e => {
        const value = this.checkIsNumberOrEmpty(e.target.value);
        if (!isNaN(value)) this.setState({ placeTo: value });
    }

    //+++
    handleAddButtonClicked = () => {
        if (this.checkName() && this.checkSector() &&
            this.checkRow() && this.checkPlace() &&
            this.checkPlaceTaken()) {
            this.addPerson();
        }
    };

    //+++
    handleRemovePersonButtonClicked = () => {
        if (this.checkName()) {
            this.removePerson();
        }
    }

    //+++
    handleClearPlaceButtonClicked = () => {
        if (this.checkSector() && this.checkRow() && this.checkPlace()) {
            this.clearPlace();
        }
    }

    //+++
    handleReplaceButtonClicked = () => {
        if (this.checkName() && this.checkSector() &&
            this.checkRow() && this.checkPlace()) {
            this.replacePerson();
        }
    }

    //+++
    handleResetButtonClicked = () => {
        this.setState({
            name: "",
            sector: "",
            rowFrom: "",
            rowTo: "",
            placeFrom: "",
            placeTo: "",
            sectors: this.emptySectors
        });
    }

    //+++
    handlePlaceClicked = (name, color, sector, row, place) => {
        this.setState({
            name,
            color,
            sector: sector + 1,
            rowFrom: row + 1,
            rowTo: row + 1,
            placeFrom: place + 1,
            placeTo: place + 1
        }, () => this.showPlaceInputModal());
    }

    //+++
    handleUpdatePersonClicked = () => {
        if (this.checkName()) {
            this.setState({
                placeInputModal: <PlaceInputModal
                    name={this.state.name}
                    color={this.state.color}
                    handleConfirmClicked={this.updatePerson}
                    handleCloseClicked={this.handlePlaceInputModalClose} />
            });
        }
    }

    render() {
        const fontSizeValue = `${this.state.fontSize}em`;
        const display = this.state.formsHidden ? "none" : "flex";

        return (
            <React.Fragment>
                {this.state.modalWindow}
                {this.state.placeInputModal}
                {this.state.conferenceNameInputModal}
                <div style={{ position: "relative" }}>
                    <HideButton handleClick={this.handleHideButtonClicked} position="fixed" hidden={this.state.formsHidden} />
                    <div style={{ display: display }} className="row justify-content-center align-items-start">
                        <div className="col-7">
                            <PlacesForm
                                name={this.state.name} handleNameChange={this.handleNameChange}
                                sector={this.state.sector} handleSectorChange={this.handleSectorChange}
                                rowFrom={this.state.rowFrom} handleRowFromChange={this.handleRowFromChange}
                                rowTo={this.state.rowTo} handleRowToChange={this.handleRowToChange}
                                placeFrom={this.state.placeFrom} handlePlaceFromChange={this.handlePlaceFromChange}
                                placeTo={this.state.placeTo} handlePlaceToChange={this.handlePlaceToChange}
                                handleAddButtonClicked={this.handleAddButtonClicked}
                                handleRemovePersonButtonClicked={this.handleRemovePersonButtonClicked}
                                handleClearPlaceButtonClicked={this.handleClearPlaceButtonClicked}
                                handleReplaceButtonClicked={this.handleReplaceButtonClicked}
                                handleResetButtonClicked={this.handleResetButtonClicked}
                                handleSaveButtonClicked={this.handleSaveButtonClicked}
                                handleLoadButtonClicked={this.handleLoadButtonClicked}
                                handleFillButtonClicked={this.handleFillButtonClicked}
                                color={this.state.color} onColorChange={this.handleColorChange}
                                handleUpdatePersonClicked={this.handleUpdatePersonClicked}
                                handleCalculateButtonClicked={this.handleCalculateButtonClicked} />
                        </div>
                        <div className="col-3 ml-2">
                            <FontSizeForm
                                fontSize={this.state.fontSize}
                                onFontSizeChange={this.handleFontSizeChanged} />
                            <SearchForm
                                searchName={this.state.searchName}
                                handleSearchNameChanged={this.handleSearchNameChanged}
                                handleSearchButtonClicked={this.handleSearchButtonClicked} />
                        </div>
                    </div>
                    <div id="print">


                        <div className="row mt-2 mb-2 justify-content-center">
                            <ConferenceName
                                onCLick={this.handleConferenceNameClick}>
                                {this.state.conferenceName}
                            </ConferenceName>
                        </div>
                        <div style={{
                            borderLeft: "0.1em solid black",
                            borderRight: "0.1em solid black"
                        }} className="mb-3">
                            <svg height="2em" width="100%">
                                <line x1="0" y1="0" x2="20%" y2="0" style={this.wallLineStyle} />
                                <line x1="20%" y1="0" x2="25%" y2="100%" style={this.doorLineStyle} />
                                <line x1="28%" y1="0" x2="70%" y2="0" style={this.wallLineStyle} />
                                <line x1="70%" y1="0" x2="75%" y2="100%" style={this.doorLineStyle} />
                                <line x1="78%" y1="0" x2="100%" y2="0" style={this.wallLineStyle} />
                            </svg>
                            <div className="pl-3 pr-3">
                                <div className="row mt-2 justify-content-between">
                                    <div className="col-auto">
                                        <Screen />
                                    </div>
                                    <div className="col-auto">
                                        <Screen />
                                    </div>
                                    <div className="col-auto">
                                        <Screen />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div style={{ width: "24%", margin: "0 auto" }}>
                                        <h3 className="text-center">Президиум</h3>
                                        <Sector
                                            fontSize={fontSizeValue}
                                            sector={this.state.sectors[3]}
                                            sectorSize={this.sectorSizes[3]}
                                            sectorNumber={4}
                                            onPlaceClick={this.handlePlaceClicked} />
                                    </div>
                                </div>
                                <div className="row mt-2 mb-3">
                                    <div style={{ width: "25%", marginLeft: "1%", marginRight: "0.5%" }}>
                                        <h4 className="lead text-center">Сектор 1</h4>
                                        <Sector
                                            showHeaders
                                            fontSize={fontSizeValue}
                                            sector={this.state.sectors[0]}
                                            sectorSize={this.sectorSizes[0]}
                                            sectorNumber={1}
                                            onPlaceClick={this.handlePlaceClicked} />
                                    </div>
                                    <div className="mt-5" style={{ width: "45%", marginLeft: "1%", marginRight: "1%" }}>
                                        <h4 className="lead text-center">Сектор 2</h4>
                                        <Sector
                                            showHeaders
                                            fontSize={fontSizeValue}
                                            sector={this.state.sectors[1]}
                                            sectorSize={this.sectorSizes[1]}
                                            sectorNumber={2}
                                            onPlaceClick={this.handlePlaceClicked} />
                                    </div>
                                    <div style={{ width: "25%", marginLeft: "0.5%", marginRight: "1%" }}>
                                        <h4 className="lead text-center">Сектор 3</h4>
                                        <Sector
                                            fontSize={fontSizeValue}
                                            showHeaders
                                            sector={this.state.sectors[2]}
                                            sectorSize={this.sectorSizes[2]}
                                            sectorNumber={3}
                                            onPlaceClick={this.handlePlaceClicked} />
                                    </div>
                                </div>
                                <div className="row mt-3 mb-1 justify-content-center">
                                    <div className="col-auto">
                                        <Screen />
                                    </div>
                                </div>
                            </div>
                            <svg height="2em" width="100%">
                                <line x1="0" y1="100%" x2="20%" y2="100%" style={this.wallLineStyle} />
                                <line x1="20%" y1="100%" x2="25%" y2="0" style={this.doorLineStyle} />
                                <line x1="28%" y1="100%" x2="70%" y2="100%" style={this.wallLineStyle} />
                                <line x1="70%" y1="100%" x2="75%" y2="0" style={this.doorLineStyle} />
                                <line x1="78%" y1="100%" x2="100%" y2="100%" style={this.wallLineStyle} />
                            </svg>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

    handleNameChange = e => this.setState({ name: e.target.value });

    handleSearchNameChanged = e => this.setState({ searchName: e.target.value });

    handleSearchButtonClicked = () => {
        if (this.checkSearchName()) {
            const found = this.state.sectors.some(
                (sector, sectorNumber) =>
                    sector.some((row, rowNumber) =>
                        row.some((place, placeNumber) => {
                            if (place.name.toLowerCase().includes(this.state.searchName.toLowerCase())) {
                                this.highlightPlace(sectorNumber, rowNumber, placeNumber);
                                const message = sectorNumber == 3
                                    ? `Президиум, место ${placeNumber + 1}`
                                    : `Сектор ${sectorNumber + 1}, ряд ${rowNumber + 1}, место ${placeNumber + 1}`
                                this.showModalWindow("Результат поиска", message);
                                return true;
                            }
                        })));
            if (!found)
                this.showModalWindow("Результат поиска", "Указанный участник не найден");
        }
    }

    handleSaveButtonClicked = () => {
        const data = {
            "conferenceName": this.state.conferenceName,
            "sectors": this.state.sectors,
            "fontSize": this.state.fontSize
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
                conferenceName: data.conferenceName,
                sectors: data.sectors,
                fontSize: data.fontSize
            });
        }
        fileReader.readAsText(file, "UTF-8");
    }

    handleFillButtonClicked = () => {
        this.setState({
            placeInputModal: <PlaceInputModal
                color={this.state.fillColor}
                handleConfirmClicked={this.handleFillEmpty}
                handleCloseClicked={this.handlePlaceInputModalClose} />
        });
    }

    handleFontSizeChanged = (e) => {
        this.setState({
            fontSize: e.target.value,
        });
    }

    handleColorChange = (color) => {
        this.setState({
            color: color
        });
    }

    handleConferenceNameClick = () => {
        this.setState({
            conferenceNameInputModal: <ConferenceNameInputModal
                conferenceName={this.state.conferenceName}
                handleConfirmClicked={this.handleConferenceNameConfirmed}
                handleCloseClicked={this.handleConferenceNameModalClose} />
        });
    }

    handleConferenceNameConfirmed = (conferenceName) => {
        this.setState({
            conferenceName: conferenceName,
            conferenceNameInputModal: null
        });
    }

    handleConferenceNameModalClose = () => {
        this.setState({ conferenceNameInputModal: null });
    }

    handleHideButtonClicked = (hidden) => {
        this.setState({ formsHidden: hidden });
    }

    handleCalculateButtonClicked = () => {
        if (this.checkName()) {
            const totalPersonCount = this.calculatePersons();
            this.showModalWindow("Подсчёт мест", `${this.state.name}: ${totalPersonCount}`);
        }
    }

    calculatePersons = () => {
        let totalCount = 0;
        this.state.sectors.forEach(sector => {
            sector.forEach(row => {
                row.forEach(place => {
                    if (place.name.toLowerCase().includes(this.state.name.toLowerCase()))
                        ++totalCount;
                });
            });
        });
        return totalCount;
    }

    checkName = () => {
        const name = this.state.name;
        if (name.length == 0) {
            this.showModalWindow("Распределение мест", "Введите участника");
            return false;
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

    showPlaceInputModal = () => {
        this.setState({
            placeInputModal: <PlaceInputModal
                allowEmpty
                name={this.state.name}
                color={this.state.color}
                handleConfirmClicked={this.handlePlaceDataConfirmed}
                handleCloseClicked={this.handlePlaceInputModalClose} />
        });
    }

    handlePlaceDataConfirmed = (name, color) => {
        this.setState({
            placeInputModal: null,
            name: name,
            color: color
        }, () => {
            this.replacePerson();
        });
    }

    handleFillEmpty = (name, color) => {
        this.setState({
            placeInputModal: null,
            fillName: name,
            fillColor: color
        }, () => this.fillEmpty());
    }

    fillEmpty = () => {
        this.setState(state => ({
            sectors: state.sectors.map(sector => sector.map(row => row.map(place => {
                return place.name ? place : { name: state.fillName, color: state.fillColor, fontColor: this.emptyPlace.fontColor };
            })))
        }));
    }

    handlePlaceInputModalClose = () => this.setState({ placeInputModal: null });

    createSector = (rows, cols, value) => {
        return Array(rows).fill().map(() => Array(cols).fill(value));
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

    //+++
    addPerson = () => {
        this.setState(state => ({
            sectors: state.sectors.map((sector, index) => {
                if (index == state.sector - 1)
                    return sector.map((row, index) => {
                        if (index >= state.rowFrom - 1 && index <= state.rowTo - 1)
                            return row.map((place, index) => {
                                if (index >= state.placeFrom - 1 && index <= state.placeTo - 1)
                                    return { name: state.name, color: state.color, fontColor: this.emptyPlace.fontColor };
                                else return place;
                            });
                        else return row;
                    })
                else return sector;
            })
        }));
    }

    //+++
    replacePerson = () => {
        this.setState(state => ({
            sectors: state.sectors.map((sector, index) => {
                if (index == state.sector - 1)
                    return sector.map((row, index) => {
                        if (index >= state.rowFrom - 1 && index <= state.rowTo - 1)
                            return row.map((place, index) => {
                                if (index >= state.placeFrom - 1 && index <= state.placeTo - 1)
                                    return { name: state.name, color: state.color, fontColor: this.emptyPlace.fontColor };
                                else return place;
                            });
                        else return row;
                    })
                else return sector;
            })
        }));
    }

    //+++
    removePerson = () => {
        this.setState(state => ({
            sectors: state.sectors.map(sector => {
                return sector.map(row => {
                    return row.map(place => {
                        if (place.name == state.name)
                            return { ...this.emptyPlace };
                        else return place;
                    })
                })
            })
        }));
    }

    //+++
    clearPlace = () => {
        this.setState(state => ({
            sectors: state.sectors.map((sector, index) => {
                if (index == state.sector - 1)
                    return sector.map((row, index) => {
                        if (index >= state.rowFrom - 1 && index <= state.rowTo - 1)
                            return row.map((place, index) => {
                                if (index >= state.placeFrom - 1 && index <= state.placeTo - 1)
                                    return { ...this.emptyPlace };
                                else return place;
                            });
                        else return row;
                    })
                else return sector;
            })
        }));
    }

    //+++
    highlightPlace = (sectorNumber, rowNumber, placeNumber) => {
        this.setState(state => ({
            sectors: state.sectors.map((sector, index) => {
                if (index == sectorNumber)
                    return sector.map((row, index) => {
                        if (index == rowNumber)
                            return row.map((place, index) => {
                                if (index == placeNumber)
                                    return { name: place.name, color: "#F6F895", fontColor: this.highlightColor };
                                else return place;
                            });
                        else return row;
                    })
                else return sector;
            })
        }));
    }

    //+++
    updatePerson = (name, color) => {
        this.setState(state => ({
            placeInputModal: null,
            sectors: state.sectors.map(sector => {
                return sector.map(row => {
                    return row.map(place => {
                        if (place.name == state.name)
                            return { name, color, fontColor: place.fontColor };
                        else return place;
                    })
                })
            }),
            name: name,
            color: color,
        }));
    }
}

export default Places;