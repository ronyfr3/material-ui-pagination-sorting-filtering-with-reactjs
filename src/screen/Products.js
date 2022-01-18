import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
    paper:{
        width: '50%',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'

    },
    tabLink:{
        color: 'white',
        textDecoration: 'none'
    },

}));
const Products = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Coming Soon
        </Typography>
        <Button variant="contained" href="#contained-buttons" className={classes.btn}>
        <Link to="/users" className={classes.tabLink}>users</Link>
      </Button>
      </Paper>
    </Grid>
  );
};

export default Products;
