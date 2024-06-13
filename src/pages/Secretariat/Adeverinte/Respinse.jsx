import React, { useEffect, useMemo, useState } from 'react'
import styles from './Adeverinte.module.scss';
import TableNotFound from '../../../components/Table/TableNotFound'
import useStateProvider from '../../../hooks/useStateProvider'
import useAuthProvider from '../../../hooks/useAuthProvider';

import {
  styled,
  StyledEngineProvider,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  TableFooter,
  TablePagination,
  Tooltip
} from '../../../assets/icons/materialMUI';

import {
  FirstPageIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  LastPageIcon,
  AddCircleOutlineIcon,
  DeleteForeverIcon,
  BorderColorIcon,
  TextRotationAngleupIcon,
  TextRotationAngledownIcon
} from '../../../assets/icons/iconsMUI';

import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';


const Respinse = () => {
  const { listaAdeverinteRespinse, fetchListaAdeverinteRespinse} = useStateProvider();
  const { user } = useAuthProvider();

  useEffect(() => {
    fetchListaAdeverinteRespinse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function createData(dataInregistrare, emailStudent, scopAdeverinta, motivRespingere, emailSecretar) {
    return { dataInregistrare, emailStudent, scopAdeverinta, motivRespingere, emailSecretar };
  }

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' pentru crescător, 'desc' pentru descrescător
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    const sortedAdeverinte = listaAdeverinteRespinse?.map(adev =>
      createData(adev.dataInregistrare, adev.emailStudent, adev.scopAdeverinta, adev.motivRespingere, adev.emailSecretar)
    ).sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.emailStudent.localeCompare(b.emailStudent);
      } else {
        return b.emailStudent.localeCompare(a.emailStudent);
      }
    });
    setRows(sortedAdeverinte || []);
  }, [listaAdeverinteRespinse, sortDirection]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows[0].length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <section>
      {listaAdeverinteRespinse?.length === 0 ? <>
        <TableNotFound />
      </>
        :
        <TableContainer component={Paper} className={styles.table}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nr. Crt.</StyledTableCell>
                <StyledTableCell align="center">Data înregistrării</StyledTableCell>
                <StyledTableCell align="center">
                  Email student
                  <IconButton onClick={toggleSortDirection} className={styles.iconWhite}>
                    {sortDirection === 'asc' ? <TextRotationAngledownIcon /> : <TextRotationAngleupIcon />}
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="center">Scop adeverinta</StyledTableCell>
                <StyledTableCell align="center">Motiv respingere</StyledTableCell>
                <StyledTableCell align="center">Secretar</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              )?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    {row?.dataInregistrare}
                  </TableCell>

                  <TableCell style={{ width: 160 }} align="center">
                    {row?.emailStudent}
                  </TableCell>

                  <TableCell style={{ width: 380 }} align="center">
                    {row?.scopAdeverinta}
                  </TableCell>

                  <TableCell style={{ width: 380 }} align="center">
                    {row?.motivRespingere}
                  </TableCell>

                  <TableCell style={{ width: 380 }} align="center">
                    {row?.emailSecretar}
                  </TableCell>

                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10, { label: 'All', value: -1 }]}
                  colSpan={5}
                  count={rows?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      }
    </section>
  )
}

export default Respinse;


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowLeftIcon />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowRightIcon />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
