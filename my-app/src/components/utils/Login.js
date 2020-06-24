import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import gql from 'graphql-tag';
import TextField from "@material-ui/core/TextField";
import {Box, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {useMutation} from 'react-apollo';
import {AUTH_TOKEN} from '../../constants';
import {changeRoute} from "../App";
import {makeStyles} from "@material-ui/core/styles";

const LOGIN = gql`
    mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;
const useStyles = makeStyles({
    btnLogin: {
        color: "white",
        backgroundColor: "#3498db",
    },
    formBox: {
        color: "#3498db",
        border: "1px solid #3498db",
        borderRadius: "5px",
    },
    formTitle: {
        marginBottom: "1em"
    }
});

function LoginUser({arg}) {
    let password, username;
    const classes = useStyles();
    const [loginUser, {data}] = useMutation(LOGIN);

    return (
        <Box boxShadow={3} className={`text-center rounded ${classes.formBox}`} p="1em 0" m="25% 0">
            <h1 className={classes.formTitle}>Se connecter</h1>
            <Form onSubmit={e => {
                e.preventDefault();
                loginUser({
                    variables: {
                        username: username.value,
                        password: password.value
                    }
                }).then(data => {
                    const {token} = data.data.login.token;
                    localStorage.setItem(AUTH_TOKEN, token);
                    changeRoute(arg, '/students');
                });
                username.value = '';
                password.value = '';
            }}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="text" label="Nom d'utilisateur" variant="outlined" inputRef={node => {
                            username = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <TextField type="password" label="Mot de passe" variant="outlined" inputRef={node => {
                            password = node
                        }} InputLabelProps={{
                            shrink: true,
                        }} required/>
                    </Form.Group>
                </Form.Row>
                <Button type="submit" variant="contained" className={classes.btnLogin}>Connexion</Button>
            </Form>
        </Box>
    )
}

class Login extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <LoginUser arg={this.props}/>
            </Container>
        )
    }
}

export default Login