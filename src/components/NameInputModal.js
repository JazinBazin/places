import React from "react";
import "../styles/modal.css";

class NameInputModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name ? props.name : "",
            errorMessage: ""
        }
        this.inputNameField = React.createRef();
    }

    componentDidMount() {
        this.inputNameField.current.focus();
    }

    handleNameChange = e => this.setState({ name: e.target.value });

    handleOkClicked = () => {
        if (!this.props.allowEmpty)
            if (!this.props.allowEmpty && this.state.name.length == 0) {
                this.setState({
                    errorMessage: 'Заполните поле "Участник"'
                })
                return;
            }
        this.props.handleNameEntered(this.state.name);
    }

    handleKeyPressed = e => {
        if (e.key == "Enter") {
            this.handleOkClicked();
        }
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
                                    ref={this.inputNameField}
                                    className="form-control"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                    onKeyPress={this.handleKeyPressed}
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