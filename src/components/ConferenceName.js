import React from "react";

const ConferenceName = ({ onCLick, children }) => (
    <pre
        style={{ cursor: "pointer" }}
        onClick={onCLick}
        className="h3 text-center">
        {children}
    </pre>
);

export default ConferenceName;