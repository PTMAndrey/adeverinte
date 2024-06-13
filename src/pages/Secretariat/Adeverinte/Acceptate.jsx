import React, { useEffect, useMemo, useState } from 'react'
import styles from './Adeverinte.module.scss';
// import { addTeamRoles, deleteTeamRoles, updateTeamRoles } from '../../api/API';
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

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import Button from '../../../components/Button/Button';

import * as XLSX from 'xlsx'; // Import the xlsx library




const Acceptate = () => {
  const { listaAdeverinteAcceptate, fetchListaAdeverinteAcceptate, facultate } = useStateProvider();
  const { user } = useAuthProvider();

  useEffect(() => {
    fetchListaAdeverinteAcceptate();
  }, [user]);

  function createData(dataInregistrare, numarInregistrare, emailStudent, scopAdeverinta, emailSecretar, student) {
    return { dataInregistrare, numarInregistrare, emailStudent, scopAdeverinta, emailSecretar, student };
  }

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [sortDirection, setSortDirection] = useState('asc');
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    const sortedAdeverinte = listaAdeverinteAcceptate?.map(adev =>
      createData(adev.dataInregistrare, adev.numarInregistrare, adev.emailStudent, adev.scopAdeverinta, adev.emailSecretar, adev.student)
    ).sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.emailStudent.localeCompare(b.emailStudent);
      } else {
        return b.emailStudent.localeCompare(a.emailStudent);
      }
    });
    setRows(sortedAdeverinte || []);
  }, [listaAdeverinteAcceptate, sortDirection]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const generateDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: rows.map((row, index) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: "UNIVERSITATEA „ŞTEFAN CEL MARE” DIN SUCEAVA\n",
                  bold: true,
                  break: index === 0 ? 0 : 4,
                }),
                new TextRun({
                  text: "FACULTATEA DE INGINERIE ELECTRICĂ ŞI ŞTIINŢA CALCULATOARELOR\n",
                  bold: true,
                  break: 2,
                }),
                new TextRun({
                  text: `                                                                                                                                    Nr. ${row?.numarInregistrare.split(' ')[0]}\n`,
                  break: 2,

                }),
                new TextRun({
                  text: "                                                                            A D E V E R I N Ţ Ă\n",
                  bold: true,
                  break: 2,
                }),
                new TextRun({
                  text: `Studentul ${row?.student?.nume} ${row?.student?.initialaTatalui} ${row?.student?.prenume} este ${row?.student?.sex.toLowerCase() === 'm' ? "înscris" : "înscrisă"} în anul universitar ${facultate?.anUniversitarCurent}, în anul ${row?.student?.anStudiu} de studii, program de studii - ${row?.student?.cicluDeStudii}: ${row?.student?.numeProgramDeStudiu}, forma de învățământ ${row?.student?.formaDeInvatamant.toLowerCase() === 'zi' ? 'cu frecventa' : row?.student?.formaDeInvatamant.toLowerCase()}, regim: ${row?.student?.formaDeFinantare === 'Buget' ? 'fără taxă' : "cu taxă"}.\n`,
                  break: 2,
                }),
                new TextRun({
                  text: `Adeverința se eliberează pentru a-i servi la ${row?.scopAdeverinta}.\n`,
                  break: 1,
                }),
                new TextRun({
                  text: "D E C A N,                                 SECRETAR ȘEF,                                 SECRETARIAT,\n",
                  break: 2,
                }),
                new TextRun({
                  text: `${facultate?.numeDecan}                                 ${facultate?.numeSecretaraSefa}                                 ${row?.emailSecretar}\n\n`,
                  break: 2,
                })
              ],
            })
          ),
        }
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "Adeverinte.docx");
    });
  };

  const generateXLSX = () => {
    const today = new Date().toLocaleDateString('en-CA');
    // const filteredRows = rows.filter(row => {
    //   const registrationDate = row.numarInregistrare.split('/')[1].split(' ')[0];
    //   console.log(registrationDate); // Debugging line to check the dates
    //   return registrationDate === today;
    // });
  
    // if (filteredRows.length === 0) {
    //   alert("Nu există adeverințe generate în ziua curentă.");
    //   return;
    // }
  
    const reportData = listaAdeverinteAcceptate.map(row => ({
      'Nr. înregistrare': row.numarInregistrare,
      'Data înregistrării': row.dataInregistrare,
      'Solicitant': `${row.student?.nume} ${row.student?.initialaTatalui} ${row.student?.prenume}`,
      'Adeverință': row.scopAdeverinta,
    }));
  
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Raport Adeverințe");
    XLSX.writeFile(wb, `Raport_Adeverinte_${today}.xlsx`);
  };
  

  return (
    <section>
      {listaAdeverinteAcceptate?.length === 0 ? (
        <TableNotFound />
      ) : (
        <>
          <div className={styles.containerAdeverinte}>
            <Button label="Generează adeverințe" onClick={generateDocx} color="primary" />
            <hr/>
            <Button label="Generează raport" onClick={generateXLSX} color="primary" />
          </div>
          <TableContainer component={Paper} className={styles.table}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nr. Crt.</StyledTableCell>
                  <StyledTableCell align="center">Data înregistrării</StyledTableCell>
                  <StyledTableCell align="center">Numărul înregistrării</StyledTableCell>
                  <StyledTableCell align="center">
                    Email student
                    <IconButton onClick={toggleSortDirection} className={styles.iconWhite}>
                      {sortDirection === 'asc' ? <TextRotationAngledownIcon /> : <TextRotationAngleupIcon />}
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="center">Scop adeverinta</StyledTableCell>
                  <StyledTableCell align="center">Secretar</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" style={{ width: 160 }} align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      {row.dataInregistrare}
                    </TableCell>
                    <TableCell style={{ width: 200 }} align="center">
                      {row.numarInregistrare.split(' ')[0]}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="center">
                      {row.emailStudent}
                    </TableCell>
                    <TableCell style={{ width: 380 }} align="center">
                      {row.scopAdeverinta}
                    </TableCell>
                    <TableCell style={{ width: 380 }} align="center">
                      {row.emailSecretar}
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
                    count={rows.length}
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
        </>
      )}
    </section>
  );
};


export default Acceptate;

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
