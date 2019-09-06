import React from "react";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdited: false
        };
        this.showBioEditor = this.showBioEditor.bind(this);
    }
    showBioEditor() {
        this.setState({
            isEdited: true
            // this.showModal = true;
            // this.imageId = imagesId;
        });
    }
    render() {
        let elem;
        if (this.state.isEdited) {
            elem = (
                <div className="bioeditor">
                    {this.props.bio}
                    <textarea onChange={this.handleChange} />
                    <button onClick={this.handleClick}>Edit</button>
                </div>
            );
        } else {
            elem = (
                <div className="bioeditor">
                    <h1>Add your bio!</h1>
                    <button onClick={this.showBioEditor}>Add</button>
                </div>
            );
        }
        return elem;
    }
}

// = (
//     <div>
//         {this.props.bio}
//         <button></button>
//     </div>
