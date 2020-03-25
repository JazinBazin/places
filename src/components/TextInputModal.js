import React from "react";
import "../styles/modal.css";

const TextInputModal = ({ title, handleCloseClicked }) => (
    <div className="modal-window">
        <div className="row justify-content-center mt-3">
            <div className="col-auto">
                <div className="card">
                    <div className="card-body">
                        <label>{title}</label>
                        <div className="row">
                            <div className="col">
                                <input
                                    className="form-control"
                                    type="text"
                                />
                            </div>
                            <div className="col-auto">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={handleCloseClicked}>
                                    ОК
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </div>
);

export default TextInputModal;