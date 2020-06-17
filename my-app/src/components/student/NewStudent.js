import React, {Component} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import styles from './styles/students.module.css'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const ADD_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUserWithInput(input: $input) {
            firstName,
            lastName
        }
    }
`;

function AddUser() {
    let lastName, firstName, username, password;
    const [addUser, {data}] = useMutation(ADD_USER);

    return (
        <Form onSubmit={event => {
            event.preventDefault();
            addUser({
                variables: {
                    input: {
                        firstName: firstName.value,
                        lastName: lastName.value,
                        username: username.value,
                        password: password.value
                    }
                }
            }).then(r => this.props.history.push('/students'));
            firstName.value = '';
            lastName.value = '';
            username.value = '';
            password.value = '';
        }} className={styles.formStudent}>
            <Form.Row>
                <Form.Group as={Col}>
                    <label>Nom</label>
                    <input ref={node => {
                        lastName = node
                    }} type="text" className="form-control"
                           style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <label>Prénom</label>
                    <input ref={node => {
                        firstName = node
                    }} type="text" className="form-control"
                           style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <label>Nom d&#39;utilisateur</label>
                    <input ref={node => {
                        username = node
                    }} type="text" className="form-control"
                           style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <label>Mot de passe</label>
                    <input ref={node => {
                        password = node
                    }} type="password" className="form-control"
                           style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
                </Form.Group>
            </Form.Row>
            <button className="btn btn-outline-light d-flex m-auto" type="submit">Valider</button>
        </Form>
    );
}

class NewStudent extends Component {
    render() {
        return (
            <div className="text-center">
                <h1>Nouvel utilisateur</h1>
                <div className="container border shadow rounded">
                    <AddUser/>
                </div>
            </div>
        );
    }
}

export default NewStudent;