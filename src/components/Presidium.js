import React from "react";
import "../styles/table.css";

class Presidium extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let places = [];
        for (let i = 0; i < this.props.placesCount; ++i) {
            places.push(
                <td key={i}>
                    <span className="table-places-cell">
                    </span>
                </td>);
        }

        return (
            <React.Fragment>
                <h3 className="text-center">Президиум</h3>
                <table className="table-places">
                    <tbody>
                        <tr>{places}</tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default Presidium;