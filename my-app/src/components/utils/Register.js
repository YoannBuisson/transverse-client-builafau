import React, {Component} from "react";
import {useMutation} from "react-apollo";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import gql from "graphql-tag";
import TextField from "@material-ui/core/TextField";
import {Box, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {changeRoute} from "../App";

const SIGN_UP = gql`
    mutation SignupMutation($input: UserInput!) {
        signUp(input: $input) {
            token
        }
    }
`;
const useStyles = makeStyles({
    btnSubmit: {
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

function SignUp({arg}) {
    const classes = useStyles();
    let email, username, password;
    const [isExistingEmail, setIsExistingEmail] = React.useState(false);
    const [isExistingUsername, setIsExistingUsername] = React.useState(false);
    const [signUp, {error}] = useMutation(
        SIGN_UP,
        {
            errorPolicy: 'all'
        });

    return (
        <Box boxShadow={3} className={`text-center rounded ${classes.formBox}`} color="white" p="1em 0" m="25% 0">
            <h1 className={classes.formTitle}>Nouveau compte</h1>
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
                }).then(() => {
                    changeRoute(arg, '/login');
                }).catch(() => {
                    setIsExistingEmail(true);
                });
                email.value = '';
                username.value = '';
                password.value = '';
            }}>
                <Form.Row>
                    <Form.Group as={Col}>
                        {!isExistingEmail ? (
                            <TextField type="email" label="Email" variant="outlined" inputRef={node => {
                                email = node
                            }} InputLabelProps={{
                                shrink: true,
                            }} required/>
                        ) : (
                            <TextField type="email" label="Email" variant="outlined" inputRef={node => {
                                email = node
                            }} InputLabelProps={{
                                shrink: true,
                            }} required error helperText={error.message}/>
                        )}
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        {!isExistingEmail ? (
                            <TextField type="text" label="Nom d'utilisateur" variant="outlined" inputRef={node => {
                                username = node
                            }} InputLabelProps={{
                                shrink: true,
                            }} required/>
                        ) : (
                            <TextField type="text" label="Nom d'utilisateur" variant="outlined" inputRef={node => {
                                username = node
                            }} InputLabelProps={{
                                shrink: true,
                            }} required error helperText={error.message}/>
                        )}
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
                <Button className={classes.btnSubmit} type="submit" variant="contained">Confirmer</Button>
            </Form>
        </Box>
    )
}

class Register extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <SignUp maxRoot={this.props.history} arg={this.props}/>
            </Container>
        )
    }
}

export default Register