import React from "react";

const SectorCell = ({ fontSize, sector, row, column, onPlaceClick, name }) => (
    <td onClick={() => onPlaceClick(name, sector, row, column)}>
        <span className="table-places-cell">
            <span style={{ fontSize: fontSize }}>{name}</span>
        </span>
    </td>
);

export default SectorCell;