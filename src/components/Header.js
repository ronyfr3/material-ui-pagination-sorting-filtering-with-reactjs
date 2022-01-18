import React from "react";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@mui/styles";
import Toolbar from '@mui/material/Toolbar';
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:"#fff"
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  alignment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1.5rem",
    marginRight: "1rem"
  },
  tabLink:{
      textDecoration: "none",
      color: "#fff",
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container className={classes.alignment}>
          <Grid item className={classes.text}>
            <Link to="/products" className={classes.tabLink}>products</Link>
          </Grid>
          <Grid item className={classes.text}>
          <Link to="/users" className={classes.tabLink}>users</Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
