import React from "react";

const ModalWindow = ({ title, text, handleCloseClicked }) => (
    <div style={{
        position: "fixed",
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
    }}>
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