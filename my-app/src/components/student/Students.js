import React, {Component} from "react";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {Link} from 'react-router-dom';
import styles from './styles/students.module.css'
import Spinner from 'react-bootstrap/Spinner';
import {AUTH_TOKEN} from '../../constants';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const GET_STUDENTS = gql`
    {
        students {
            _id
            firstName
            lastName
            email
        }
    }
`;
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function ShowStudents() {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GET_STUDENTS);

    if (loading) return <div className="status-warning"><Spinner animation="grow"/></div>;
    if (error) return <span className="status-error">ERROR</span>;
    return data.students.map(({_id, firstName, lastName, email}) => (
        <Card className={`${classes.root} ${styles.card}`}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={require('../../img/software-engineer.png')}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {firstName} {lastName.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        C'est un étudiant de l'UCA qui peut être contacté à l'adresse: <strong>{email}</strong>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary" component={Link} to={`/students/${_id}`}>
                    En savoir plus
                </Button>
            </CardActions>
        </Card>
        // <Card className={styles.card} border="white" bg="info">
        //     <Card.Header>{firstName} {lastName.toUpperCase()}</Card.Header>
        //     <Card.Body>
        //         <Card.Title>
        //             Email
        //         </Card.Title>
        //         <Card.Text>
        //             {email}
        //         </Card.Text>
        //         <Link to={`/students/${_id}`} className="text-white font-weight-bold">Détails</Link>
        //     </Card.Body>
        // </Card>
    ));
}

class Students extends Component {
    render() {
        return (
            <div className={styles.students}>
                <h1 className={styles.studentTitle}>Etudiants</h1>
                <div className="d-flex justify-content-center flex-wrap">
                    <ShowStudents/>
                </div>
                {localStorage.getItem(AUTH_TOKEN) !== null && (
                    <Fab style={{backgroundColor: "#306a94"}} aria-label="add" component={Link} to="/new/student">
                        <AddIcon/>
                    </Fab>
                )}
            </div>
        )
    }
}

export default Students;