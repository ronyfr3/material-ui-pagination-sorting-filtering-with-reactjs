import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../components/useTable";
import * as api from "../App/api";
import Controls from "../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { deleteUser, getUsers, updateUser } from "../App/api";
import { decrement, increment } from "../App/Pages";
import { useSelector } from "react-redux";

//Download csv file helper function
import { getReport } from "../Utils/DownloadCSV";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "80%",
  },
  newButton: {
    width: "100%",
  },
  filterDropdown: {
    width: "100%",
  },
  stack: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    marginTop: "10px",
  },
}));

const headCells = [
  { id: "avatar", label: "Avatar", disableSorting: true },
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "", label: "Update" },
  { id: "", label: "Delete" },
];

const Users = ({ users }) => {
  const classes = useStyles();
  const userStatus = useSelector((state) => state.users);
  const { status } = userStatus;

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(users, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.first_name.toLowerCase().includes(target.value) +
              x.last_name.toLowerCase().includes(target.value) +
              x.email.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (employee.id === 0) api.createUser(employee);
    else api.updateUser(employee);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const dispatch = useDispatch();

  const removeUser = (id) => {
    dispatch(deleteUser(id));
    dispatch(getUsers());
    alert(status);
  };
  const combinefunction = (item) => {
    openInPopup(item);
    dispatch(updateUser(item.id));
    dispatch(getUsers());
  };
  const [name, setName] = React.useState("All");
  const filterUser = (e) => {
    let target = e.target;
    setName(target.value);
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return users;
        } else if (target.value === "All") {
          return users;
        } else return items.filter((x) => x.first_name === target.value);
      },
    });
  };
  const pageNumber = useSelector((state) => state.pageNumber.value);

  return (
    <>
      <Paper className={classes.pageContent}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Controls.Input
              label="Search Users"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl className={classes.filterDropdown}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                label="Name"
                onChange={filterUser}
              >
                <MenuItem value={"All"}>All</MenuItem>
                {recordsAfterPagingAndSorting().map((x) => {
                  return (
                    <MenuItem value={x.first_name}>
                      {x.first_name + " " + x.last_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1.5}>
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Controls.Button
              text="Export CSV"
              startIcon={<DownloadIcon />}
              className={classes.newButton}
              onClick={() => getReport(users)}
            />
          </Grid>
        </Grid>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <img src={item.avatar} alt="" />
                </TableCell>
                <TableCell>{item.first_name}</TableCell>
                <TableCell>{item.last_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    onClick={() => {
                      combinefunction(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
                <TableCell>
                  <Controls.ActionButton>
                    <CloseIcon
                      fontSize="small"
                      onClick={() => removeUser(item.id)}
                    />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
        <Stack className={classes.stack} spacing={2} direction="row">
          <Button variant="outlined" onClick={() => dispatch(decrement(1))}>
            prev
          </Button>
          <Button
            variant="outlined"
            disabled={pageNumber === 2}
            onClick={() => dispatch(increment(1))}
          >
            next
          </Button>
        </Stack>
      </Paper>

      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
};

export default Users;
