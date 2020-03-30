import React from "react";
import SectorCell from "./SectorCell";
import "../styles/table.css";


const Sector = ({ fontSize, sector, sectorSize, sectorNumber, onPlaceClick, showHeaders }) => {
    let headers = null

    if (showHeaders) {
        let placeHeaders = [<th key={0}>Место</th>];
        for (let i = 0; i < sectorSize.cols; ++i) {
            placeHeaders.push(<th key={i + 1}>{i + 1}</th>);
        }
        headers = (
            <thead>
                <tr>
                    {placeHeaders}
                </tr>
            </thead>
        );
    }

    let places = [];
    for (let i = 0; i < sectorSize.rows; ++i) {
        let row = showHeaders
            ? [<th key={0}>Ряд {i + 1}</th>]
            : [];
        for (let j = 0; j < sectorSize.cols; ++j) {
            const place = sector[i][j];
            row.push(
                <SectorCell
                    fontSize={fontSize}
                    key={j + 1}
                    place={place}
                    sector={sectorNumber - 1}
                    row={i}
                    column={j}
                    onPlaceClick={onPlaceClick} />
            );
        }
        places.push(<tr key={i}>{row}</tr>);
    }

    return (
        <table className="table-places">
            {headers}
            <tbody>
                {places}
            </tbody>
        </table>
    );
};

export default Sector;