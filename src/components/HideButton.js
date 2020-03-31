import React from "react";

// http://www.i2symbol.com/symbols/brackets

class HideButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: this.props.hidden,
        }
    }

    handleClick = () => {
        this.setState(state => ({ hidden: !state.hidden }), () => this.props.handleClick(this.state.hidden));;
    }

    render() {
        const button = this.state.hidden ? "&#xFE40;" : "&#xFE3F;"
        const top = this.state.hidden ? "0.2em" : "-0.3em";;
        return (
            <span style={{
                display: "block",
                position: this.props.position,
                top: top,
                right: "0.3em",
                cursor: "pointer",
                fontSize: "1.5em",
            }}
                onClick={this.handleClick}
                dangerouslySetInnerHTML={{ __html: button }} />
        );
    }
}

export default HideButton;