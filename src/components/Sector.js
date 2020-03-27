import React from "react";
import SectorCell from "./SectorCell";
import "../styles/table.css";


const Sector = ({ sector, sectorSize, sectorNumber, onPlaceClick }) => {
    let placeHeaders = [<th key={0}>Место</th>];
    for (let i = 0; i < sectorSize.cols; ++i) {
        placeHeaders.push(<th key={i + 1}>{i + 1}</th>);
    }

    let places = [];
    for (let i = 0; i < sectorSize.rows; ++i) {
        let row = [<th key={0}>Ряд {i + 1}</th>]
        for (let j = 0; j < sectorSize.cols; ++j) {
            const person = sector[i][j] ? sector[i][j] : "";
            row.push(
                <SectorCell
                    key={j + 1}
                    sector={sectorNumber - 1}
                    row={i}
                    column={j}
                    onPlaceClick={onPlaceClick} >
                    <span className="table-places-cell">
                        {person}
                    </span>
                </SectorCell>
            );
        }
        places.push(<tr key={i}>{row}</tr>);
    }

    return (
        <React.Fragment>
            <h4 className=" lead text-center">Сектор {sectorNumber}</h4>
            <table className="table-places">
                <thead>
                    <tr>
                        {placeHeaders}
                    </tr>
                </thead>
                <tbody>
                    {places}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default Sector;