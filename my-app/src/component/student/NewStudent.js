import React, {Component} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";

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
        <form onSubmit={event => {
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
            });
            firstName.value = '';
            lastName.value = '';
            username.value = '';
            password.value = '';
        }}>
            <div className="form-group">
                <label>Prénom</label>
                <input ref={node => {
                    firstName = node
                }} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Nom</label>
                <input ref={node => {
                    lastName = node
                }} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Nom d&#39;utilisateur</label>
                <input ref={node => {
                    username = node
                }} type="text" className="form-control"/>
            </div>
            <div className="form-group">
                <label>Mot de passe</label>
                <input ref={node => {
                    password = node
                }} type="password" className="form-control"/>
            </div>
            <button className="btn btn-outline-light d-flex m-auto" type="submit">Valider</button>
        </form>
    );
}

class NewStudent extends Component {
    render() {
        return (
            <div>
                <h1>Nouvel utilisateur</h1>
                <div className="border shadow rounded" style={{padding: "0.5em"}}>
                    <AddUser/>
                </div>
            </div>
        );
    }
}

export default NewStudent;