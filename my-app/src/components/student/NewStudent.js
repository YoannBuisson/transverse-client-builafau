import React, {Component} from "react";
import gql from "graphql-tag";
import styles from './styles/students.module.css'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {useMutation} from 'react-apollo'
import {changeRoute} from "../App";
import TextField from "@material-ui/core/TextField";
import {Box, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const POST_STUDENT = gql`
    mutation CreateUser($input: StudentInput!) {
        createStudentWithInput(input: $input) {
            firstName,
            lastName
        }
    }
`;
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

function CreateStudent({arg}) {
    let lastName, firstName, email;
    const [createStudentWithInput] = useMutation(
        POST_STUDENT,
        {
            update(cache, {data: {createStudentWithInput}}) {
                const {students} = cache.readQuery({query: GET_STUDENTS});
                cache.writeQuery({
                    query: GET_STUDENTS,
                    data: {students: students.concat([createStudentWithInput])},
                });
            }
        }
    );

    return (
        <Box boxShadow={3} className={`text-center rounded ${styles.formBox}`} p="1em 0" m="25% 0">
            <h1 className={styles.formTitle}>Nouvel étudiant</h1>
            <Form onSubmit={e => {
                e.preventDefault();
                createStudentWithInput({
                    variables: {
                        input: {
                            firstName: firstName.value,
                            lastName: lastName.value,
                            email: email.value,
                        }
                    }
                }).then(() => {
                    changeRoute(arg, '/students');
                });
                email.value = '';
                lastName.value = '';
                firstName.value = '';
            }}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="text" label="Prénom" variant="outlined" inputRef={node => {
                            firstName = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="text" label="Nom" variant="outlined" inputRef={node => {
                            lastName = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="email" label="Email" variant="outlined" inputRef={node => {
                            email = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>
                <Button className={styles.btnCreate} type="submit" variant="contained">Confirmer</Button>
            </Form>
        </Box>
    )
}

class NewStudent extends Component {
    render() {
        return (
            <Container maxWidth="sm" className={styles.newStudentContainer}>
                <CreateStudent arg={this.props}/>
            </Container>
        )
    }
}

export default NewStudent;