import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import styles from './styles/students.module.css'
import Spinner from 'react-bootstrap/Spinner';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {AUTH_TOKEN} from '../../constants';

const GET_STUDENTS = gql`
    {
        students {
            _id
            firstName
            lastName
            email
        }
    }
`;

function ShowStudents() {
    const {loading, error, data } = useQuery(GET_STUDENTS);

    if (loading) return <div className="status-warning"><Spinner animation="grow"/></div>;
    if (error) return <span className="status-error">ERROR</span>;
    return data.students.map(({_id, firstName, lastName, email}) => (
        <Card className={styles.card} border="white" bg="info">
            <Card.Header>{firstName} {lastName.toUpperCase()}</Card.Header>
            <Card.Body>
                <Card.Title>
                    Email
                </Card.Title>
                <Card.Text>
                    {email}
                </Card.Text>
                <Link to={`/students/${_id}`} className="text-white font-weight-bold">Détails</Link>
            </Card.Body>
        </Card>
    ));
}

class Students extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <div className={styles.students}>
                <h1>Etudiants</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    <ShowStudents/>
                </div>
                {authToken && (
                    <Link className="btn btn-outline-dark text-white" to="/new/student">
                        <FontAwesomeIcon icon={faPlus}/>
                    </Link>
                )}
            </div>
        )
    }
}

export default Students;