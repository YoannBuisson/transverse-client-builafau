import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

const GET_PROJECTS = gql`
    {
        projects {
            name
        }
    }
`;

function ListProjects() {
    const {loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <span className="status-warning">LOADING</span>;
    if (error) return <span className="status-error">ERROR</span>;
    return data.projects.map(({name}) => (
        <span>{name}</span>
    ));
}

class Projects extends Component {
    render() {
        return <ListProjects/>;
    }
}

export default Projects;