import React from "react";

// http://www.i2symbol.com/symbols/brackets

class HideButton extends React.Component {
    constructor(props) {
        super(props);
        this.lineStyle = { stroke: "rgb(0, 0, 0)", strokeWidth: "2" };
        this.arrowDown = (
            <svg width="1em" height="0.75em">
                <line x1="0" y1="0" x2="50%" y2="100%" style={this.lineStyle} />
                <line x1="50%" y1="100%" x2="100%" y2="0" style={this.lineStyle} />
            </svg>
        )
        this.arrowUp = (
            <svg width="1em" height="0.75em">
                <line x1="0" y1="100%" x2="50%" y2="0" style={this.lineStyle} />
                <line x1="50%" y1="0" x2="100%" y2="100%" style={this.lineStyle} />
            </svg>
        )
        this.state = {
            hidden: this.props.hidden,
            hideButton: this.arrowUp
        }
    }

    handleClick = () => {
        this.setState(state => ({
            hidden: !state.hidden,
        }), () => this.props.handleClick(this.state.hidden));;
    }

    render() {
        const button = this.state.hidden ? this.arrowDown : this.arrowUp;
        return (
            <span style={{
                display: "block",
                position: this.props.position,
                top: "0.2em",
                right: "0.5em",
                cursor: "pointer",
            }}
                onClick={this.handleClick}>
                {button}
            </span>
        );
    }
}

export default HideButton;