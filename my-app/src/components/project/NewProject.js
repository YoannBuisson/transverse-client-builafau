import React, { Component } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Box, Button} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import {changeRoute} from "../App";
import Col from "react-bootstrap/Col";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

const POST_PROJECT = gql`
    mutation createProjectWithInput($input: ProjectInput!) {
        createProjectWithInput(input: $input) {
            name,
            description
        }
    }
`;

function CreateProject({arg}) {
    let name, description;
    const [createProjectWithInput, {data}] = useMutation(POST_PROJECT);

    return (
        <Box boxShadow={3} p="1em 0" m="25% 0">
            <h1>Nouveau Projet</h1>
            <Form onSubmit={e => {
                e.preventDefault();
                createProjectWithInput({
                    variables: {
                        input: {
                            name: name.value,
                            description: description.value
                        },
                    }
                }).then(data => {
                    changeRoute(arg, '/projects');
                });
                name.value = '';
                description.value = '';
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
                <Button type="submit" variant="contained">Confirmer</Button>
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