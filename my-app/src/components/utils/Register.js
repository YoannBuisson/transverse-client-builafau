import React, {Component} from "react";
import {useMutation} from "react-apollo";
import Form from "react-bootstrap/Form";
import {AUTH_TOKEN} from "../../constants";
import Col from "react-bootstrap/Col";
import gql from "graphql-tag";
import {createBrowserHistory} from 'history';
import TextField from "@material-ui/core/TextField";
import {Box, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";

const history = createBrowserHistory();
const SIGN_UP = gql`
    mutation SignupMutation($input: UserInput!) {
        signUp(input: $input) {
            token
        }
    }
`;
const state = {
    email: '',
    password: '',
    username: ''
}
const useStyles = makeStyles((theme) => ({
    formTitle: {
        background: "linear-gradient(to right, #2c3e50, #3498db)"
    },
    btnSubmit: {
        '&:hover': {
            background: "transparent"
        },
        background: "transparent",
        color: "white",
        border: "1px solid white"
    }
}));

function SignUp() {
    const classes = useStyles();
    let {email, password, username} = state;
    const [signUp, {data}] = useMutation(SIGN_UP);

    return (
        <Box boxShadow={3} className={`text-center rounded ${classes.formTitle}`} color="white" p="1em 0" m="25% 0">
            <h1>Nouveau compte</h1>
            <Form onSubmit={e => {
                e.preventDefault();
                signUp({
                    variables: {
                        input: {
                            email: email.value,
                            username: username.value,
                            password: password.value
                        }
                    }
                }).then(data => {
                    const {token} = data.data.signUp.token;
                    localStorage.setItem(AUTH_TOKEN, token);
                    history.push('/');
                });
                email.value = '';
                username.value = '';
                password.value = '';
            }}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="text" label="Email" variant="outlined" ref={node => {
                            email = node
                        }} InputLabelProps={{
                            shrink: true,
                        }}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="text" label="Nom d'utilisateur" variant="outlined" ref={node => {
                            username = node
                        }} InputLabelProps={{
                            shrink: true,
                        }}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="password" label="Mot de passe" variant="outlined" ref={node => {
                            password = node
                        }} InputLabelProps={{
                            shrink: true,
                        }}/>
                    </Form.Group>
                </Form.Row>
                <Button className={classes.btnSubmit} type="submit" variant="contained">Confirmer</Button>
            </Form>
        </Box>
    )
}

class Register extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <SignUp/>
            </Container>
        )
    }
}

export default Register