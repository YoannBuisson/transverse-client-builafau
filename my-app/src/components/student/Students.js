import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Card from "react-bootstrap/Card";
import {Link, Route} from "react-router-dom";
import student_logo from './img/student.svg'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from './styles/students.module.css'
import Spinner from "react-bootstrap/Spinner";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import Modal from "react-bootstrap/Modal";

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

    if (loading) return <div className="status-warning"><Spinner animation="grow"/></div>;
    if (error) return <span className="status-error">ERROR</span>;
    return data.users.map(({_id, firstName, lastName, username}) => (
        <Card className={styles.card} border="primary" bg="dark">
            <Card.Header>{firstName} {lastName.toUpperCase()}</Card.Header>
            <Card.Body>
                <Card.Title>
                    Nom d'utilisateur
                </Card.Title>
                <Card.Text>
                    {username}
                </Card.Text>
                <Link to={`/students/${_id}`}>Détails</Link>
            </Card.Body>
        </Card>
    ));
}

class Students extends Component {
    render() {
        return (
            <div className={styles.students}>
                <h1>Etudiants</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    <ShowStudents/>
                </div>
                <Link className="btn btn-outline-dark text-white" to="/new/student">
                    <FontAwesomeIcon icon={faPlus}/>
                </Link>
            </div>
        )
    }
}

export default Students;