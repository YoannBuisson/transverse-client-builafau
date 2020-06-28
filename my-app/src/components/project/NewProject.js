import React, { Component } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Box, Button} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import {changeRoute} from "../App";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import styles from './styles/projects.module.css'
import Spinner from "react-bootstrap/Spinner";

const POST_PROJECT = gql`
    mutation createProjectWithInput($student: ID!, $input: ProjectInput!) {
        createProjectWithInput(_id: $student, input: $input) {
            name,
            description
        }
    }
`;

const GET_STUDENTS = gql`
    {
        students {
            _id
            firstName
            lastName
        }
    }
`;

function CreateProject({arg}) {
    let name, description, student;
    const [createProjectWithInput, {dataStudent}] = useMutation(POST_PROJECT);
    const {loading, error, data} = useQuery(GET_STUDENTS);

    if (loading) return <div className="status-warning"><Spinner animation="grow"/></div>;
    if (error) return <span className="status-error">ERROR</span>;

    return (
        <Box boxShadow={3} className={`text-center rounded ${styles.formBox}`} p="1em 0" m="25% 0">
            <h1 className={styles.formTitle}>Nouveau Projet</h1>
            <Form onSubmit={e => {
                e.preventDefault();
                createProjectWithInput({
                    variables: {
                        input: {
                            name: name.value,
                            description: description.value
                        },
                        student: student.value
                    }
                }).then(dataStudent => {
                    changeRoute(arg, '/projects');
                });
                name.value = '';
                description.value = '';
                student.value = '';
            }}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="text" label="Nom" variant="outlined" inputRef={node => {
                            name = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="text" label="Description" variant="outlined" inputRef={node => {
                            description = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col}>
                        <select name="student" id="student-select" ref={node => {
                            student = node;
                        }}>
                            <option value="">Selectionner un etudiant</option>

                            {data.students.map(value =>
                                <option value={value._id}>{value.firstName} {value.lastName}</option>
                            )}
                        </select>
                    </Form.Group>
                </Form.Row>

                <Button className={styles.btnCreate} type="submit" variant="contained">Confirmer</Button>
            </Form>
        </Box>
    )
}

class NewProject extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <CreateProject arg={this.props}/>
            </Container>
        )
    }
}

export default NewProject;