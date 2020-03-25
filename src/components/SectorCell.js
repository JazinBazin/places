import React from "react";

const SectorCell = ({ sector, row, column, onPlaceClick, children }) => (
    <td onClick={() => onPlaceClick(sector, row, column)}>
        {children}
    </td>
);

export default SectorCell;