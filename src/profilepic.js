import React from "react";

export default class Profilepic extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log("imageurl:", this.props.imageurl);
        let imageurl = this.props.imageurl || "/img/socialnetwork.jpg";
        console.log("image after: ||", this.props.imageurl);
        return (
            <div className="profilepiccomponenet">
                <img onClick={this.props.showModal} src={imageurl} />
            </div>
        );
    }
}
/*<h2>   inside the div with the classname profilepiccomponenet
     I am the presentational component. My name is: //{" "}
    {this.props.first} {this.props.last}
</h2> */
