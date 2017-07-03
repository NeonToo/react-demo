import React, {Component} from 'react';
import Dialog from './../components/Dialog';

class DialogDemo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const buttons = [{
            type: 'default',
            text: 'Cancel',
            onClick: function(e) {
                console.log("Cancel");
            }
        }, {
            type: 'primary',
            text: 'Confirm',
            onClick: function(e) {
                console.log("Confirm");
            }
        }];

        return (
            <Dialog title={'Dialog Demo'} buttons={buttons}>This is a Dialog</Dialog>
        );
    }
}

export default DialogDemo;