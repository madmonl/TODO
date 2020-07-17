import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TodosBoardCell from '../todosBoardCell/TodosBoardCell';
import './TodosBoard.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function TodosBoard({ todos }: { todos: any }) {
  const classes = useStyles();

  return (
    <TableContainer className="table-container" component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Todo</StyledTableCell>
            <StyledTableCell>In Progress</StyledTableCell>
            <StyledTableCell>Finished</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <TableCell className="tableCell">
              <TodosBoardCell cards={todos.todo} />
            </TableCell>
            <TableCell className="tableCell">
              <TodosBoardCell cards={todos.inProgress} />
            </TableCell>
            <TableCell className="tableCell">
              <TodosBoardCell cards={todos.finished} />
            </TableCell>
          </StyledTableRow>
        </TableBody >
      </Table >
    </TableContainer >
  );
}