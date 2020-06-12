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
        <span>Je m'appelle {firstName} {lastName}</span>
    ));
}

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <ListUsers />
            </div>
        );
    }
}

export default ProfilePage;