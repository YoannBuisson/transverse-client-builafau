import React, {Component} from 'react';
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {AUTH_TOKEN} from "../../constants";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import styles from "../student/styles/students.module.css";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

const GET_GRAPHQL_INFO = gql`
    {
        userSchemaAssert
    }
`;

const useStyles = makeStyles({
    homeTitle: {
        color: "#306a94",
        fontWeight: "bold"
    },
});

function HomeView() {
    const classes = useStyles();
    const {loading, error} = useQuery(GET_GRAPHQL_INFO);

    if (loading) return <span className="status-warning"><CircularProgress/></span>;
    if (error) return <span className="status-error">ERROR</span>;
    return (
        <div>
            <h1 className={`text-center ${classes.homeTitle}`}>Bienvenue sur StudentsQL !</h1>
            <Grid container>
                <Grid item xs={4}>
                    <Paper className="d-flex flex-column">
                        <List component="nav">
                            <ListItem>
                                <ListItemText>Etudiants</ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className="d-flex flex-column">
                        <List component="nav">
                            <ListItem>
                                <ListItemText>Projets</ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className="d-flex flex-column">
                        <List component="nav">
                            <ListItem>
                                <ListItemText>Tâches</ListItemText>
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

class Home extends Component {
    render() {
        return <HomeView/>
    }
}

export default Home;