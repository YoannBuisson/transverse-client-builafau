import React, {Component} from "react";
import gql from "graphql-tag";
import {makeStyles} from "@material-ui/core/styles";
import {useQuery} from "@apollo/react-hooks";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/styles";
import styles from "../student/styles/students.module.css";
import ListSubheader from "@material-ui/core/ListSubheader";

/*=============================== GraphQL ===============================*/
/*=======================================================================*/
/*=======================================================================*/
const GET_PROJECT = gql`
    query GetStudentById($projectId: ID!) {
        projectById(_id: $projectId) {
            _id
            name
            description
            dateOfReturn
            tasks {
                _id
                name
                duration
                priority
                status
            }
        }
    }
`;
/*=======================================================================*/
/*=======================================================================*/
/*=======================================================================*/

/*================================ Const ================================*/
/*=======================================================================*/
/*=======================================================================*/
const useStyles = makeStyles({
    media: {
        height: 200,
        margin: "auto",
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "linear-gradient(to right, #d3cce3, #e9e4f0)",
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#F5F5F5",
        },
    },
}))(TableRow);
/*=======================================================================*/
/*=======================================================================*/
/*=======================================================================*/

function GetProject({projectId}) {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GET_PROJECT, {
        variables: {projectId}
    });

    if (loading) return <div className="status-warning"><CircularProgress/></div>;
    if (error) return <span className="status-error">ERREUR</span>;
    return (
        <Grid container>
            <Grid item xs={3}>
                <Paper className="d-flex flex-column">
                    <List component="nav">
                        <ListItem>
                            <img className={classes.media} src={require('../../img/software-engineer.png')}
                                 alt="Project logo"/>
                        </ListItem>
                        <Divider/>
                        <ListSubheader>Détails</ListSubheader>
                        <ListItem button>
                            <ListItemText primary="Nom" secondary={data.projectById.name}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Description" secondary={data.projectById.description}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Date de rendu"
                                          secondary={new Date(data.projectById.dateOfReturn).toLocaleDateString()}/>
                        </ListItem>
                        <Divider/>
                        <ListSubheader>Action</ListSubheader>
                        <ListItem button>
                            <ListItemText primary="Nombre de tâches" secondary={data.projectById.tasks.length}/>
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <h2 className={`text-center ${styles.studentTitle}`}>Tâches associés</h2>
                <TableContainer component={Paper}>
                    <Table stickyHeader className={classes.table} aria-label="Tasks table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">Nom de la tâche</StyledTableCell>
                                <StyledTableCell align="right">Durée</StyledTableCell>
                                <StyledTableCell align="right">Priorité</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.projectById.tasks.map(({_id, name, duration, priority, status}) => (
                                <StyledTableRow key={_id}>
                                    <StyledTableCell component="th" scope="row">
                                        {_id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{name}</StyledTableCell>
                                    <StyledTableCell align="right">{duration}</StyledTableCell>
                                    <StyledTableCell align="right">{priority}</StyledTableCell>
                                    <StyledTableCell align="right">{status.toString()}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

class ProjectDetail extends Component {
    render() {
        return <GetProject projectId={this.props.match.params.id}/>;
    }
}

export default ProjectDetail;