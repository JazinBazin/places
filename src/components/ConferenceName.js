import React from "react";

/* СХЕМА РАЗМЕЩЕНИЯ УЧАСТНИКОВ
IV Военно-научной конференции
"Роботизация Вооруженных Сил Российской Федерации"
от Министерства обороны Российской Федерации */

const ConferenceName = ({ onCLick, children }) => (
    <pre
        style={{ cursor: "pointer" }}
        onClick={onCLick}
        className="h3 text-center">
        {children}
    </pre>
);

export default ConferenceName;