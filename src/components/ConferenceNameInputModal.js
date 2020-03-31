import React from "react";
import "../styles/modal.css";

class ConferenceNameInputModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conferenceName: this.props.conferenceName ? this.props.conferenceName : "",
            conferenceNameErrorMessage: ""
        }
        this.inputConferenceName = React.createRef();
    }

    componentDidMount() {
        this.inputConferenceName.current.focus();
    }

    handleConferenceNameChange = e => this.setState({
        conferenceName: e.target.value
    });

    handleOkClicked = () => {
        if (this.state.conferenceName.length == 0) {
            this.setState({
                conferenceNameErrorMessage: 'Заполните поле "Название конференции"'
            });
            return;
        }
        this.props.handleConfirmClicked(this.state.conferenceName);
    }

    render() {
        return (
            <div className="modal-window">
                <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                        <div className="card">
                            <div className="card-body">
                                <label>Название конференции:</label>
                                <textarea
                                    rows="7"
                                    cols="50"
                                    ref={this.inputConferenceName}
                                    className="form-control"
                                    value={this.state.conferenceName}
                                    onChange={this.handleConferenceNameChange}
                                />
                                <span style={{ color: "red" }}>
                                    {this.state.conferenceNameErrorMessage}
                                </span>
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
            </div >
        );
    }
}

export default ConferenceNameInputModal;