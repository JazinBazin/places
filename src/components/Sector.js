import React from "react";

const Sector = ({ sector, sectorSize, sectorNumber }) => {
    let placeHeaders = [<th key={0}>Ряд/Место</th>];
    for (let i = 0; i < sectorSize.cols; ++i) {
        placeHeaders.push(<th key={i + 1}>{i + 1}</th>);
    }

    let places = [];
    for (let i = 0; i < sectorSize.rows; ++i) {
        let row = [<th key={0}>{i + 1}</th>]
        for (let j = 0; j < sectorSize.cols; ++j) {
            const person = sector[i][j] ? sector[i][j] : "";
            row.push(<td style={{ wordWrap: "break-word", flexGrow: "0", flexShrink: "0" }} key={j + 1}>{person}</td>);
        }
        places.push(<tr key={i}>{row}</tr>);
    }

    return (
        <React.Fragment>
            <h2 className="text-center">Сектор {sectorNumber}</h2>
            <div class="table-responsive">
                <table className="table table-striped table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            {placeHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {places}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export default Sector;