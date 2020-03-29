import React from "react";

const SectorCell = ({ sector, row, column, onPlaceClick, name }) => (
    <td onClick={() => onPlaceClick(name, sector, row, column)}>
        <span className="table-places-cell">
            {name}
        </span>
    </td>
);

export default SectorCell;