import React, {Component} from "react";

class StudentDetails extends Component {
    render() {
        return (
            <div>
                <h1>Test {this.props.match.params.id}</h1>
            </div>
        );
    }
}

export default StudentDetails;