import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Card from "react-bootstrap/Card";
import {Link, Route} from "react-router-dom";
import student_logo from './img/student.svg'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const GET_STUDENTS = gql`
    {
        users {
            _id
            firstName
            lastName
            username
        }
    }
`;

function ShowStudents() {
    const {loading, error, data, networkStatus} = useQuery(GET_STUDENTS);

    if (loading) return <span className="status-warning">LOADING</span>;
    if (error) return <span className="status-error">ERROR</span>;
    return data.users.map(({_id, firstName, lastName, username}) => (
        <div className="border rounded shadow" style={{padding: "0.5em", margin: "0.5em", width: "30vw"}}>
            <Row>
                <Col style={{paddingBottom: "0.5em"}}>
                    <span>{firstName} {lastName}</span>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <img src={student_logo} alt="student logo"/>
                </Col>
                <Col md={7} className="d-flex flex-column" style={{fontSize: "0.7em"}}>
                    <span>Nom d'utilisateur : <strong>{username}</strong></span>
                </Col>
            </Row>
        </div>
    ));
}

class Students extends Component {
    render() {
        return (
            <div style={{width: "100%", height: "70vh"}}>
                <h1>Etudiants</h1>
                <div className="d-flex justify-content-around flex-wrap">
                    <ShowStudents/>
                </div>
            </div>
        )
    }
}

export default Students;