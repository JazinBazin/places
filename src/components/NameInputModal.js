import React from "react";
import "../styles/modal.css";

class NameInputModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            errorMessage: ""
        }
    }

    handleNameChange = e => this.setState({ name: e.target.value });

    handleOkClicked = () => {
        if (this.state.name.length == 0) {
            this.setState({
                errorMessage: 'Заполните поле "Участник"'
            })
            return;
        }
        this.props.handleNameEntered(this.state.name);
    }

    render() {
        return (
            <div className="modal-window">
                <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                        <div className="card">
                            <div className="card-body">
                                <label>Участник:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                                <span style={{ color: "red" }}>{this.state.errorMessage}</span>
                            </div>
                            <div className="card-footer">
                                <div className="row justify-content-end">
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        type="button"
                                        onClick={this.handleOkClicked}>
                                        ОК
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                        onClick={this.props.handleCloseClicked}>
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        );
    }
}

export default NameInputModal;