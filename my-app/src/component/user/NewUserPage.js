import React, {Component} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";

const ADD_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
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
            lastName.value = '';
            firstName.value = '';
            username.value = '';
            password.value = '';
        }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col">
                    <label htmlFor="inputFirstName">Prénom</label>
                    <input ref={node => {
                        firstName = node;
                    }} id="inputFirstName" type="text"/>
                </div>
                <div className="p-field p-col">
                    <label htmlFor="inputLastName">Nom</label>
                    <input ref={node => {
                        lastName = node;
                    }} id="inputLastName" type="text"/>
                </div>
            </div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col">
                    <label htmlFor="inputUsername">Nom d'utilisateur</label>
                    <div className="p-col">
                        <input ref={node => {
                            username = node;
                        }} id="inputUsername" type="text"/>
                    </div>
                </div>
                <div className="p-field p-col">
                    <label htmlFor="inputPassword">Mot de passe</label>
                    <input ref={node => {
                        password = node;
                    }} id="inputPassword"/>
                </div>
            </div>
            <input type="submit" label="Submit"/>
        </form>
    );
}

class NewUserPage extends Component {
    render() {
        return (
            <div style={{backgroundColor: "white", padding: "0.5em", color: "black", borderRadius: "5px"}}>
                <h1>Nouvel utilisateur</h1>
                <AddUser/>
            </div>
        );
    }
}

export default NewUserPage;