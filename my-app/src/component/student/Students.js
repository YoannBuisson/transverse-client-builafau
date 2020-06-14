import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Card from "react-bootstrap/Card";
import {Link, Route} from "react-router-dom";
import StudentDetails from "./StudentDetails";

const GET_STUDENTS = gql`
    {
        users {
            _id
            firstName
            lastName
        }
    }
`;

function ShowStudents() {
    const {loading, error, data, networkStatus} = useQuery(GET_STUDENTS);

    if (loading) return <span className="status-warning">LOADING</span>;
    if (error) return <span className="status-error">ERROR</span>;
    return data.users.map(({_id, firstName, lastName}) => (
        <Card style={{backgroundColor: "transparent"}} className="shadow border-secondary">
            <Card.Body>
                <Card.Title>{firstName}</Card.Title>
                <Card.Subtitle className="text-muted card-subtitle mb-2">{lastName}</Card.Subtitle>
                <Card.Text className="card-text">
                    Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget
                    metus.
                </Card.Text>
                <Link to={`/students/${_id}`} activeClassName="active">Détails</Link>
            </Card.Body>
        </Card>
    ));
}

class Students extends Component {
    render() {
        return (
            <div>
                <h1>Etudiants</h1>
                <div className="container d-flex">
                    <ShowStudents/>
                </div>
            </div>
        )
    }
}

export default Students;