import React from "react";
import { TwitterPicker } from 'react-color';

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: "#0693E3"
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState(state => ({
            displayColorPicker: !state.displayColorPicker
        }));
    }

    handleClose = () => {
        this.setState({ displayColorPicker: false });
    }

    handleChange = (color) => {
        this.setState({ color: color.hex });
    }

    render() {
        const colorPicker = this.state.displayColorPicker
            ? (
                <div
                    className="row"
                    style={{
                        position: "fixed",
                        padding: "0.5em 0",
                        zIndex: 1,
                        backgroundColor: "white",
                        borderRadius: "0.5em",
                        border: "0.05em solid #ededed"
                    }}>
                    <div className="col pr-0">
                        <TwitterPicker
                            color={this.state.color}
                            triangle="top-left"
                            onChange={this.handleChange} />
                    </div>
                    <div
                        className="col-auto pl-2 pr-2"
                        onClick={this.handleClose}>
                        <button
                            onClick={this.handleClose}
                            style={{ fontSize: "2em" }}
                            type="button" className="close"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
            : null;
        return (
            <React.Fragment>
                <input
                    type="color"
                    className="form-control"
                    onClick={this.handleClick}
                    value={this.state.color}
                    onChange={() => { }} />
                {colorPicker}
            </React.Fragment>
        )
    }
};

export default ColorPicker;