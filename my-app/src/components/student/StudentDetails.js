import React, {Component} from "react";
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/react-hooks";
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
import {withStyles} from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import styles from "./styles/students.module.css"
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {changeRoute} from "../App";
import Form from "react-bootstrap/Form";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {FormControl} from "@material-ui/core";
import {AUTH_TOKEN} from "../../constants";
import {Link} from "react-router-dom";

/*=============================== GraphQL ===============================*/
/*=======================================================================*/
/*=======================================================================*/
const GET_STUDENT = gql`
    query GetStudentById($studentId: ID!) {
        studentById(_id: $studentId) {
            _id
            firstName
            lastName
            birthDate
            email
            projects {
                _id
                name
                description
                dateOfReturn
            }
        }
    }
`;

const UPDATE_STUDENT = gql`
    mutation UpdateStudent($studentId: ID!, $projectId: ID!) {
        updateStudent(studentId: $studentId, projectId: $projectId) {
            _id
            firstName
            lastName
            birthDate
            email
            projects {
                _id
                name
                description
                dateOfReturn
            }
        }
    }
`;

const GET_PROJECTS = gql`
    {
        projects {
            _id
            name
            description
            dateOfReturn
        }
    }
`;
/*=======================================================================*/
/*=======================================================================*/
/*=======================================================================*/

/*================================ Const ================================*/
/*=======================================================================*/
/*=======================================================================*/
const useStyles = makeStyles((theme) => ({
    media: {
        height: 200,
        margin: "auto",
    },
    btnList: {
        backgroundColor: "#306a94",
        color: "white"
    },
    btnIcon: {
        color: "white"
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

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

function UpdateStudent({arg}) {
    const classes = useStyles();
    const [projectId, setProjectId] = React.useState('');
    const [updateStudent] = useMutation(
        UPDATE_STUDENT,
        {
            update(cache, {data: {updateStudent}}) {
                const {projects} = cache.readQuery({query: GET_PROJECTS});
                cache.writeQuery({
                    query: GET_PROJECTS,
                    data: {students: projects.concat([UPDATE_STUDENT])},
                });
            }
        }
    );
    const handleChange = (event) => {
        setProjectId(event.target.value);
    };
    const {loading, error, data} = useQuery(GET_PROJECTS);
    if (loading) return <div className="status-warning"><CircularProgress/></div>;
    if (error) return <span className="status-error">ERREUR</span>;


    return (
        <Form className={classes.container} onSubmit={e => {
            e.preventDefault();
            updateStudent({
                variables: {
                    studentId: arg.match.params.id,
                    projectId: projectId,
                }
            }).then(() => {
                changeRoute(arg, `/student/${arg.match.params.id}`);
            });
        }}>

            <FormControl className={classes.formControl}>
                <InputLabel id="selectLabel">Sélection</InputLabel>
                <Select labelId="projectName" id="selectProject" value={projectId} onChange={handleChange}>
                    {data.projects.map(({_id, name}) => (
                        <MenuItem value={_id}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button type="submit" variant="outlined">Confirmer</Button>
        </Form>
    )
}

function GetStudent({arg}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const {loading, error, data} = useQuery(GET_STUDENT, {
        variables: {studentId: arg.match.params.id}
    });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) return <div className="status-warning"><CircularProgress/></div>;
    if (error) return <span className="status-error">ERREUR</span>;
    return (
        <Grid container>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Choisissez un projet</DialogTitle>
                <DialogContent>
                    <UpdateStudent arg={arg}/>
                </DialogContent>
            </Dialog>
            <Grid item xs={3}>
                <Paper className="d-flex flex-column">
                    <List component="nav">
                        <ListItem>
                            <img className={classes.media} src={require('../../img/software-engineer.png')}
                                 alt="student logo"/>
                        </ListItem>
                        <ListSubheader>Détails</ListSubheader>
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
                            <ListItemText primary="Date de naissance"
                                          secondary={new Date(data.studentById.birthDate).toLocaleDateString()}/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Projets" secondary={data.studentById.projects.length}/>
                        </ListItem>
                        <ListSubheader>Action</ListSubheader>
                        {localStorage.getItem(AUTH_TOKEN) !== null && (
                            <ListItem className={classes.btnList} component={Button} color="primary" variant="contained"
                                      onClick={handleClickOpen}>
                                <ListItemIcon><AddIcon className={classes.btnIcon}/></ListItemIcon>
                                <ListItemText primary="Ajouter un projet"/>
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <h2 className={`text-center ${styles.studentTitle}`}>Projets associés</h2>
                <TableContainer component={Paper}>
                    <Table stickyHeader className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">Nom</StyledTableCell>
                                <StyledTableCell align="right">Description</StyledTableCell>
                                <StyledTableCell align="right">Date de rendu</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.studentById.projects.map(({_id, name, description, dateOfReturn}) => (
                                <StyledTableRow key={_id}>
                                    <StyledTableCell component="th" scope="row">
                                        {_id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{name}</StyledTableCell>
                                    <StyledTableCell align="right">{description}</StyledTableCell>
                                    <StyledTableCell
                                        align="right">{new Date(dateOfReturn).toLocaleDateString()}</StyledTableCell>
                                </StyledTableRow>
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
            <GetStudent arg={this.props}/>
        );
    }
}

export default StudentDetails;