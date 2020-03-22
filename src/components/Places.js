import React from "react";

class Places extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapNamesToPlaces: {},
            sectors: [],
            name: null,
            sector: null,
            row: null,
            place: null
        }
    }

    handleNameChange = e => this.setState({ name: e.target.value });

    handleSectorChange = e => this.setState({ sector: e.target.value });

    handleRowChange = e => this.setState({ row: e.target.value });

    handlePlaceChange = e => this.setState({ place: e.target.value });

    handleAddButtonClicked = () => {
        alert(this.state.name);
    }

    handleResetButtonClicked = () => {
        this.setState({
            name: null,
            sector: null,
            row: null,
            place: null
        });
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-4">
                    <form>
                        <div class="form-row">
                            <div class="col">
                                <div class="form-group">
                                    <label>Фамилия:</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.handleNameChange} />
                                </div>
                                <div class="form-group">
                                    <label>Сектор:</label>
                                    <input
                                        class="form-control"
                                        type="number"
                                        value={this.state.sector}
                                        onChange={this.handleSectorChange} />
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label>Ряд:</label>
                                    <input
                                        class="form-control"
                                        type="number"
                                        value={this.state.row}
                                        onChange={this.handleRowChange} />
                                </div>
                                <div class="form-group">
                                    <label>Место:</label>
                                    <input
                                        class="form-control"
                                        type="number"
                                        value={this.state.place}
                                        onChange={this.handlePlaceChange} />
                                </div>
                            </div>
                        </div>
                        <div class="form-row justify-content-end">
                            <div class="col-auto">
                                <button
                                    class="btn btn-primary btn-sm"
                                    type="button"
                                    onClick={this.handleAddButtonClicked}>
                                    Добавить
                                </button>
                                <button
                                    class="btn btn-primary btn-sm  ml-2"
                                    type="reset"
                                    onClick={this.handleResetButtonClicked}>
                                    Очистить
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Places;