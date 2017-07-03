import React, {Component} from 'react';
import Button from './../components/Button';

class ButtonDemo extends Component {
    constructor(props) {
        super(props);
    }

    handlePress() {
        console.log("Button Pressed");
    }

    render() {
        return (
            <div className="weui-btn-area">
                <Button >Default Button</Button>
                <Button type="primary">Primary Button</Button>
                <Button type="warn">Warn Button</Button>
                <Button disabled={true}>Disabled Button</Button>
                <Button size="mini">Mini Button</Button>
                <Button plain={true}>Plain Button</Button>
                <Button plain={true} type="primary">Plain Primary Button</Button>
                <Button element="button">Button Element</Button>
                <Button onClick={(oEvent) => this.handlePress(oEvent)}>Press Handler</Button>
            </div>
        );
    }
}

export default ButtonDemo;