import React, {Component} from "react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import "./student.css";

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
                                 firstName: 'Thibault',
                                 lastName: 'Lafaurie',
                                 username: 'Glabustre',
                                 password: 'Toto'
                             }
                         }
                     });
                 }}>
            <div className="form-group"><label>Prénom</label><input type="text" className="form-control"/></div>
            <div className="form-group"><label>Nom</label><input type="text" className="form-control"/></div>
            <div className="form-group"><label>Nom d&#39;utilisateur</label><input type="text"
                                                                                   className="form-control"/></div>
            <div className="form-group"><label>Mot de passe</label><input type="text" className="form-control"/>
            </div>
            <button className="btn btn-outline-dark d-flex m-auto" type="submit">Button</button>
        </form>
        //     <div className="p-fluid p-formgrid p-grid">
        //         <div className="p-field p-col">
        //             <label htmlFor="inputFirstName">Prénom</label>
        //             <input ref={node => {
        //                 firstName = node;
        //             }} id="inputFirstName" type="text"/>
        //         </div>
        //         <div className="p-field p-col">
        //             <label htmlFor="inputLastName">Nom</label>
        //             <input ref={node => {
        //                 lastName = node;
        //             }} id="inputLastName" type="text"/>
        //         </div>
        //     </div>
        //     <div className="p-fluid p-formgrid p-grid">
        //         <div className="p-field p-col">
        //             <label htmlFor="inputUsername">Nom d'utilisateur</label>
        //             <div className="p-col">
        //                 <input ref={node => {
        //                     username = node;
        //                 }} id="inputUsername" type="text"/>
        //             </div>
        //         </div>
        //         <div className="p-field p-col">
        //             <label htmlFor="inputPassword">Mot de passe</label>
        //             <input ref={node => {
        //                 password = node;
        //             }} id="inputPassword"/>
        //         </div>
        //     </div>
        //     <input type="submit" label="Submit"/>
        // </form>
    );
}

class NewStudent extends Component {
    render() {
        return (
            <div>
                <h1>Nouvel utilisateur</h1>
                <div className="border rounded shadow">
                    <AddUser/>
                </div>
            </div>
        );
    }
}

export default NewStudent;