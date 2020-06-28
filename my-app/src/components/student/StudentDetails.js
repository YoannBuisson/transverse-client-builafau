import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

const GET_STUDENT = gql`
    query GetStudentById($studentId: ID!) {
        studentById(_id: $studentId) {
            _id
            firstName
            lastName
            email
            projects {
                _id
            }
        }
    }
`;
const useStyles = makeStyles({
    media: {
        height: 200,
        margin: "auto",
    },
});

function GetStudent({studentId}) {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GET_STUDENT, {
        variables: {studentId}
    });

    if (loading) return <div className="status-warning"><CircularProgress/></div>;
    if (error) return <span className="status-error">ERREUR ${error}</span>;
    return (
        <Grid container>
            <Grid item xs={3}>
                <Paper className="d-flex flex-column">
                    <List component="nav">
                        <ListItem>
                            <img className={classes.media} src={require('../../img/software-engineer.png')}
                                 alt="student logo"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Prénom" secondary={data.studentById.firstName}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="NOM" secondary={data.studentById.lastName}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Email" secondary={data.studentById.email}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Projets" secondary={data.studentById.projects.length}/>
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom du projet</TableCell>
                                <TableCell align="right">Calories</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.studentById.projects.map(({_id}) => (
                                <TableRow key={_id}>
                                    <TableCell component="th" scope="row">
                                        {_id}
                                    </TableCell>
                                    <TableCell align="right">Oui</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

class StudentDetails extends Component {
    render() {
        return (
            <GetStudent studentId={this.props.match.params.id}/>
        );
    }
}

export default StudentDetails;