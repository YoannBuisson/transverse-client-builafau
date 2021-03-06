import React, {Component} from "react";
import gql from "graphql-tag";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {useMutation, useQuery} from 'react-apollo'
import {changeRoute} from "../App";
import TextField from "@material-ui/core/TextField";
import {Box, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import styles from './styles/tasks.module.css'

const POST_TASK = gql`
    mutation CreateTask($project: ID!, $input: TaskInput!) {
        createTaskWithInput(_id: $project, input: $input) {
            name,
            duration,
            priority,
            status
        }
    }
`;

const GET_PROJECTS = gql`
  {
    projects {
      _id
      name
      description
    }
  }
`;

function CreateTask({arg}) {
    let name, duration, priority;
    const { loading, error, data } = useQuery(GET_PROJECTS);
    const [createTaskWithInput, {dataStudent}] = useMutation(POST_TASK);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <Box boxShadow={3} className={`text-center rounded ${styles.formBox}`} p="1em 0" m="25% 0">
            <h1 className={styles.formTitle}>Nouvelle tâche</h1>
            <Form onSubmit={e => {
                e.preventDefault();
                createTaskWithInput({
                    variables: {
                        input: {
                            name: name.value,
                            duration: parseInt(duration.value),
                            priority: parseInt(priority.value),
                            status: false
                        },
                        project: arg.match.params.id
                    }
                }).then(dataStudent => {
                    changeRoute(arg, `/projects/${arg.match.params.id}`);
                });
                name.value = '';
                duration.value = '';
                priority.value = '';
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
                        <TextField type="number" label="Durée en jour" variant="outlined" inputRef={node => {
                            duration = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="number" label="Priorité" variant="outlined" inputRef={node => {
                            priority = node
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

class NewTask extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <CreateTask arg={this.props}/>
            </Container>
        )
    }
}

export default NewTask;