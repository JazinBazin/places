import React from "react";

const ConferenceName = ({ onCLick, children }) => (
    <h3
        style={{ cursor: "pointer" }}
        onClick={onCLick}
        className="text-center">
        {children}
    </h3>
);

export default ConferenceName;