import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

const GET_USERS = gql`
    {
        users {
            firstName
            lastName
        }
    }
`;

function ListUsers() {
    const {loading, error, data, networkStatus} = useQuery(GET_USERS);

    if (loading) return <span className="status-warning">LOADING</span>;
    if (error) return <span className="status-error">ERROR</span>;
    return data.users.map(({firstName, lastName}) => (
        <li>{firstName} {lastName}</li>
    ));
}

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <h1>Etudiants</h1>
                <ol>
                    <ListUsers/>
                </ol>
            </div>
        );
    }
}

export default ProfilePage;