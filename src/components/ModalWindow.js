import React from "react";
import "../styles/modal.css";

const ModalWindow = ({ title, text, handleCloseClicked }) => (
    <div className="modal-window">
        <div className="row justify-content-center mt-3">
            <div className="col-auto">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{text}</p>
                    </div>
                    <div className="card-footer">
                        <div className="row justify-content-end">
                            <button
                                className="btn btn-primary btn-sm"
                                type="button"
                                onClick={handleCloseClicked}>
                                Хорошо
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </div>
);

export default ModalWindow;