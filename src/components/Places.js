import React from "react";
import PlacesForm from "./PlacesForm";
import SearchForm from "./SearchForm";
import Sector from "./Sector";
import ModalWindow from "./ModalWindow";
import PlaceInputModal from "./PlaceInputModal";
import FontSizeForm from "./FontSizeForm";

/*
    1. Заголовок конференции
    2. Расположение экранов
    3. Скрытие формы для редактирования
    4. Поменять (добавить) цвета
*/

class Places extends React.Component {
    constructor(props) {
        super(props);

        this.sectorSizes = [
            { rows: 8, cols: 7 },
            { rows: 8, cols: 13 },
            { rows: 7, cols: 7 },
            { rows: 1, cols: 7 }];

        this.emptyPlace = { name: "", color: "#FFFFFF" };
        this.emptySectors = this.sectorSizes.map(sectorSize => {
            return this.createSector(sectorSize.rows, sectorSize.cols, this.emptyPlace);
        });

        this.state = {
            name: "",
            sector: "",
            row: "",
            place: "",
            color: "#ABB8C3",
            searchName: "",
            fillName: "",
            fillColor: "#FFFFFF",
            fontSize: 1,
            modalWindow: null,
            placeInputModal: null,
            sectors: this.emptySectors,
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
        if (this.checkName()) {
            this.removePerson();
        }
    }

    handleClearPlaceButtonClicked = () => {
        if (this.checkSector() && this.checkRow() && this.checkPlace()) {
            this.clearPlace();
        }
    }

    handleReplaceButtonClicked = () => {
        if (this.checkName() && this.checkSector() &&
            this.checkRow() && this.checkPlace() && this.checkPlaceEmpty()) {
            if (this.state.sectors[this.state.sector - 1][this.state.row - 1][this.state.place - 1].name === "")
                this.addPerson();
            else
                this.replacePerson();
        }
    }

    handleResetButtonClicked = () => {
        this.setState({
            name: "",
            sector: "",
            row: "",
            place: "",
            sectors: this.emptySectors
        });
    }

    handleSearchNameChanged = e => this.setState({ searchName: e.target.value });

    handleSearchButtonClicked = () => {
        if (this.checkSearchName()) {
            const found = this.state.sectors.some(
                (sector, sectorNumber) =>
                    sector.some((row, rowNumber) =>
                        row.some((place, placeNumber) => {
                            if (place.name == this.state.searchName) {
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
                sectors: data.sectors
            });
        }
        fileReader.readAsText(file, "UTF-8");
    }

    handleFillButtonClicked = () => {
        this.setState({
            placeInputModal: <PlaceInputModal
                handleConfirmClicked={this.handleFillEmpty}
                handleCloseClicked={this.handlePlaceInputModalClose} />
        });
    }

    handlePlaceClicked = (name, color, sector, row, place) => {
        this.setState({
            name,
            color,
            sector: sector + 1,
            row: row + 1,
            place: place + 1
        }, () => this.showPlaceInputModal());
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

    render() {
        const fontSizeValue = `${this.state.fontSize}em`;
        return (
            <React.Fragment>
                {this.state.modalWindow}
                {this.state.placeInputModal}
                <div className="row justify-content-center">
                    <div className="col-6 border rounded p-2 mt-2">
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
                            handleLoadButtonClicked={this.handleLoadButtonClicked}
                            handleFillButtonClicked={this.handleFillButtonClicked}
                            color={this.state.color} onColorChange={this.handleColorChange} />
                    </div>
                    <div className="col-3 ml-2">
                        <SearchForm
                            searchName={this.state.searchName}
                            handleSearchNameChanged={this.handleSearchNameChanged}
                            handleSearchButtonClicked={this.handleSearchButtonClicked} />
                        <FontSizeForm
                            fontSize={this.state.fontSize}
                            onFontSizeChange={this.handleFontSizeChanged} />
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
                <div className="row mt-4 mb-3">
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
                    <div style={{ width: "45%", marginLeft: "1%", marginRight: "1%" }}>
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
        if (sector > this.state.sectors.length) {
            this.showModalWindow("Распределение мест",
                "Номер сектора должен быть в диапазоне от 1 до 4 включительно");
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
        if (this.state.sectors[sector - 1][row - 1][place - 1].name.length != 0) {
            this.showModalWindow("Распределение мест",
                `Узазанное место занято: ${this.state.sectors[sector - 1][row - 1][place - 1].name}`);
            return false;
        }
        return true;
    }

    checkPlaceEmpty = () => {
        const sector = this.state.sector;
        const row = this.state.row;
        const place = this.state.place;
        if (this.state.sectors[sector - 1][row - 1][place - 1].name.length == 0) {
            this.showModalWindow("Распределение мест",
                "Узазанное место свободно");
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
            if (this.state.sectors[this.state.sector - 1][this.state.row - 1][this.state.place - 1].name.length == 0)
                this.addPerson();
            else
                this.replacePerson();
        });
    }

    handleFillEmpty = (name, color) => {
        this.setState(state => ({
            placeInputModal: null,
            fillName: name,
            fillColor: color
        }), () => this.fillEmpty());
    }

    fillEmpty = () => {
        this.setState(state => ({
            sectors: state.sectors.map(sector => sector.map(row => row.map(place => {
                return place.name ? place : { name: state.fillName, color: state.fillColor };
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

    addPerson = () => {
        this.setState(state => ({
            sectors: state.sectors.map((sector, index) => {
                if (index == state.sector - 1)
                    return sector.map((row, index) => {
                        if (index == state.row - 1)
                            return row.map((place, index) => {
                                if (index == state.place - 1)
                                    return { name: state.name, color: state.color };
                                else return place;
                            });
                        else return row;
                    })
                else return sector;
            })
        }), () => console.log(this.state.sectors));
    }

    replacePerson = () => {
        this.setState(state => ({
            sectors: state.sectors.map((sector, index) => {
                if (index == state.sector - 1)
                    return sector.map((row, index) => {
                        if (index == state.row - 1)
                            return row.map((place, index) => {
                                if (index == state.place - 1)
                                    return { name: state.name, color: state.color };
                                else return place;
                            });
                        else return row;
                    })
                else return sector;
            })
        }), () => console.log(this.state.sectors));
    }

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
        }), () => console.log(this.state.sectors));
    }

    clearPlace = () => {
        this.setState(state => ({
            sectors: state.sectors.map((sector, index) => {
                if (index == state.sector - 1)
                    return sector.map((row, index) => {
                        if (index == state.row - 1)
                            return row.map((place, index) => {
                                if (index == state.place - 1)
                                    return { ...this.emptyPlace };
                                else return place;
                            });
                        else return row;
                    })
                else return sector;
            })
        }), () => console.log(this.state.sectors));
    }
}

export default Places;