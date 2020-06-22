import React, {Component} from "react";
import gql from "graphql-tag";
import styles from './styles/students.module.css'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {Mutation} from 'react-apollo'

const POST_STUDENT = gql`
    mutation CreateUser($input: StudentInput!) {
        createStudentWithInput(input: $input) {
            firstName,
            lastName
        }
    }
`;

class NewStudent extends Component {
    state = {
        lastName: '',
        firstName: '',
        email: '',
    }

    render() {
        let { lastName, firstName, email } = this.state;
        return (
            <div className="text-center">
                <h1>Nouvel utilisateur</h1>
                <div className="container border shadow rounded">
                    <Mutation mutation={POST_STUDENT}>
                        {addUser => (
                            <Form onSubmit={event => {
                                event.preventDefault();
                                addUser({
                                    variables: {
                                        input: {
                                            firstName: firstName.value,
                                            lastName: lastName.value,
                                            email: email.value,
                                        }
                                    }
                                }).then(() => this.props.history.push('/students'));
                                firstName.value = '';
                                lastName.value = '';
                                email.value = '';
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
                                        <label>Email</label>
                                        <input ref={node => {
                                            email = node
                                        }} type="text" className="form-control"
                                               style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
                                    </Form.Group>
                                </Form.Row>
                                <button className="btn btn-outline-light d-flex m-auto" type="submit">Valider</button>
                            </Form>
                        )}
                    </Mutation>
                </div>
            </div>
        );
    }
}

export default NewStudent;