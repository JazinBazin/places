import React from "react";

const SectorCell = ({ fontSize, sector, row, column, onPlaceClick, place }) => (
    <td
        style={{ backgroundColor: place.color }}
        onClick={() => onPlaceClick(place.name, place.color, sector, row, column)}>
        <span className="table-places-cell">
            <span style={{ fontSize: fontSize }}>{place.name}</span>
        </span>
    </td>
);

export default SectorCell;