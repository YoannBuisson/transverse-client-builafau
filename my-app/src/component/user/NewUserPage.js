import React, {Component} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Password} from "primereact/password";

const ADD_USER = gql`
    mutation CreateUser($firstName: String!, $lastName: String!, $password: String!, $username: String!) {
        createUser(firstName: $firstName, lastName: $lastName, password: $password, username: $username) {
            firstName,
            lastName
        }
    }
`;

function AddUser(onChange, password) {
    let lastName;
    let firstName;
    let username;
    const [addUser, {data}] = useMutation(ADD_USER);

    return (
        <form onSubmit={event => {
            event.preventDefault();
            addUser({
                variables: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    password: "test",
                    username: username.value
                }
            });
            lastName.value = '';
            firstName.value = '';
            username.value = '';
        }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col">
                    <label htmlFor="inputFirstName">Prénom</label>
                    <InputText ref={node => {
                        firstName = node;
                    }} id="inputFirstName" type="text"/>
                </div>
                <div className="p-field p-col">
                    <label htmlFor="inputLastName">Nom</label>
                    <InputText ref={node => {
                        lastName = node;
                    }} id="inputLastName" type="text"/>
                </div>
            </div>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col">
                    <label htmlFor="inputUsername">Nom d'utilisateur</label>
                    <div className="p-col">
                        <InputText ref={node => {
                            username = node;
                        }} id="inputUsername" type="text"/>
                    </div>
                </div>
                <div className="p-field p-col">
                    <label htmlFor="inputPassword">Mot de passe</label>
                    <Password id="inputPassword" value={password} onChange={onChange}/>
                </div>
            </div>
            <Button type="submit" label="Submit"/>
        </form>
    );
}

class NewUserPage extends Component {
    state = {
        password: ''
    }

    onChange = e => {
        this.setState({
            password: e.value
        });
    };

    render() {
        return (
            <div style={{backgroundColor: "white", padding: "0.5em", color: "black", borderRadius: "5px"}}>
                <h1>Nouvel utilisateur</h1>
                <AddUser onChange={this.onChange} password={this.state.password}/>
            </div>
        );
    }
}

export default NewUserPage;