import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo';
import {createBrowserHistory} from 'history';
import {AUTH_TOKEN} from '../../constants';
import TextField from "@material-ui/core/TextField";
import {Box, Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const history = createBrowserHistory();
const LOGIN = gql`
    mutation LoginMutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;
const state = {
    password: '',
    username: ''
}

function LoginUser() {
    let {password, username} = state;
    const [loginUser, {data}] = useMutation(LOGIN);

    return (
        <Box boxShadow={3} className="text-center" color="secondary.main" p="1em 0" m="25% 0">
            <h1>Se connecter</h1>
            <Form onSubmit={e => {
                e.preventDefault();
                loginUser({
                    variables: {username: username.value, password: password.value}
                }).then(data => {
                    const {token} = data.data.login.token;
                    localStorage.setItem(AUTH_TOKEN, token);
                    history.push('/');
                });
                username.value = '';
                password.value = '';
            }}>
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
                <Button type="submit" variant="contained" color="secondary">Connexion</Button>
            </Form>
        </Box>
    )
}

class Login extends Component {
    render() {
        return (
            <Container maxWidth="sm">
                <LoginUser/>
            </Container>
            // <div className="text-center">
            //     <h1>{login ? 'Se connecter' : 'Nouveau compte'}</h1>
            //     <div className="container border rounded shadow">
            //         <Form>
            //             {!login && (
            //                 <Form.Row>
            //                     <Form.Group as={Col}>
            //                         <label>Email</label>
            //                         <input ref={node => {
            //                             email = node
            //                         }} type="text" className="form-control"
            //                                style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
            //                     </Form.Group>
            //                 </Form.Row>
            //             )}
            //             <Form.Row>
            //                 <Form.Group as={Col}>
            //                     <label>Nom d'utilisateur</label>
            //                     <input ref={node => {
            //                         username = node
            //                     }} type="text" className="form-control"
            //                            style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
            //                 </Form.Group>
            //                 <Form.Group as={Col}>
            //                     <label>Mot de passe</label>
            //                     <input ref={node => {
            //                         password = node
            //                     }} type="password" className="form-control"
            //                            style={{backgroundColor: '#3a3e45', borderBottom: '1px solid white'}}/>
            //                 </Form.Group>
            //             </Form.Row>
            //             <Form.Row>
            //                 <Form.Group as={Col}>
            //                     <Mutation mutation={login ? LOGIN : SIGN_UP}
            //                               variables={{
            //                                   input: {
            //                                       email: email,
            //                                       username: username,
            //                                       password: password
            //                                   },
            //                                   username, password
            //                               }}
            //                               onCompleted={data => this._confirm(data)}>
            //                         {mutation => (
            //                             <div className="btn btn-outline-light" onClick={mutation}>
            //                                 {login ? 'Connexion' : 'Confirmer'}
            //                             </div>
            //                         )}
            //                     </Mutation>
            //                     <div className="btn btn-outline-light float-right"
            //                          onClick={() => this.setState({login: !login})}>
            //                         {login ? 'Nouveau ici ?' : 'Déjà un compte ?'}
            //                     </div>
            //                 </Form.Group>
            //             </Form.Row>
            //         </Form>
            //     </div>
            // </div>
        )
    }

    _confirm = async data => {
        const {token} = this.state.login ? data.login : data.signUp;
        this._saveUserData(token);
        this.props.history.push('/');
    }

    _saveUserData = token => {

    }
}

export default Login