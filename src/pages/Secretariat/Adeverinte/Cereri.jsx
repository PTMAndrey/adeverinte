// import React from 'react'
// import useStateProvider from '../../../hooks/useStateProvider';
// import styles from './Adeverinte.module.scss';

// const Cereri = () => {
//   const {cereriAdeverinte} = useStateProvider();
//   return (
//     <div className={styles.homeContainer}>
//       <br></br>
//       <h3>Cereri de adeverinte</h3>
//       {cereriAdeverinte?.length > 0 && (
//         <table className={styles.styledTable}>
//           <thead>
//             <tr>
//               {cereriAdeverinte[0]?.map((heading, index) => (
//                 <th key={index}>{heading}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {cereriAdeverinte?.slice(1).map((row, index) => (
//               <tr key={index}>
//                 {row.map((cell, i) => (
//                   <td key={i}>{cell}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//     </div>
//   )
// }

// export default Cereri



import React, { useEffect, useMemo, useState } from 'react'
import styles from './Adeverinte.module.scss';
// import { addTeamRoles, deleteTeamRoles, updateTeamRoles } from '../../api/API';
import TableNotFound from '../../../components/Table/TableNotFound'
import Button from '../../../components/Button/Button'
import Modal from '../../../components/Modal/Modal';
import Input from '../../../components/Input/Input'
import useStateProvider from '../../../hooks/useStateProvider'
import useAuthProvider from '../../../hooks/useAuthProvider';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

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
  CheckTwoToneIcon,
  CloseTwoToneIcon,
  TextRotationAngleupIcon,
  TextRotationAngledownIcon
} from '../../../assets/icons/iconsMUI';

import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { aproveCerereAdeverinta, isFirstProcessedToday, rejectCerereAdeverinta } from '../../../api/API';


const List = () => {
  const { listaCereriAdeverinte, fetchListaCereriAdeverinte, currentPageCereriAdeverinta, pageSizeCereriAdeverinta } = useStateProvider();
  const { user } = useAuthProvider();
  const { width } = useWindowDimensions();

  const { setAlert } = useStateProvider();

  const [openAddUpdate, setOpenAddUpdate] = useState({ open: false, action: '' });

  const [openReject, setOpenReject] = useState(false);

  const [formValue, setFormValue] = useState({ dataInregistrare: "", nrInregistrare: "", emailStudent: "", scopAdeverinta: "", status: "", motivRespingere: "" });

  const handleOpenReject = () => {
    setOpenReject(true);

  };
  const handleCloseReject = () => {
    setOpenReject(false);
    setShowErrors(false);
    setFormValue({ dataInregistrare: "", emailStudent: "", scopAdeverinta: "" });
  };

  const handleOpenAddUpdate = (action) => {
    setOpenAddUpdate({ open: true, action: action });
  }
  const handleCloseAddUpdate = () => {
    setOpenAddUpdate({ open: false, action: '' });
    setShowErrors(false);
    setFormValue({ dataInregistrare: "", emailStudent: "", scopAdeverinta: "" });

  }


  useEffect(() => {
    fetchListaCereriAdeverinte();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (formValue.nrInregistrare === "")
      fetchNrInregistrare();
  }, [])

  const [_isFirstProcessedToday, setIsFirstProcessedToday] = useState(false);
  const fetchNrInregistrare = async () => {
    try {
      const _isFPT = await isFirstProcessedToday();
      console.log(_isFPT.data);
      setIsFirstProcessedToday(_isFPT.data);
      if (_isFPT.data === true) {
        handleOpenAddUpdate('isFirstProcessedToday');
      }
    } catch (error) {
      console.log(error.message, "error");
      setAlert({
        type: "danger",
        message: error.message || "Something went wrong...", // Use the error message from the catch
      });
    }
  };

  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const isFormValid = () => {
    let isValid = true;
    Object.keys(formValue).forEach((field) => {
      if (checkErrors(field)) {
        isValid = false;
      }
    });
    return isValid;
  };

  const checkErrors = (field) => {
    // if (field === "scopAdeverinta") {
    //   if (formValue?.scopAdeverinta.length < 4 && formValue?.scopAdeverinta.length >= 0) {
    //     return "Minim 5 litere necesare";
    //   }
    // }
    if (openReject === true)
      if (field === "motivRespingere") {
        if (formValue?.motivRespingere.length < 4 && formValue?.motivRespingere.length >= 0) {
          return "Minim 5 litere necesare";
        }
      }
    if (openAddUpdate.open === true && _isFirstProcessedToday === true)
      if (field === "nrInregistrare") {
        if (formValue?.nrInregistrare?.length < 1) {
          return "Minim o cifra necesara";
        }
      }

    return "";
  }

  const handleAcceptAdeverinta = async () => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
        console.log(
          "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
          formValue?.nrInregistrare, 
          user?.emailSecretar,
          {
            dataInregistrare: formValue.dataInregistrare,
            emailStudent: formValue.emailStudent,
            scopAdeverinta: formValue.scopAdeverinta,
            status: 'Aproved'
          },
          "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        const response = await aproveCerereAdeverinta(formValue?.nrInregistrare, user?.emailSecretar,
          {
            dataInregistrare: formValue.dataInregistrare,
            emailStudent: formValue.emailStudent,
            scopAdeverinta: formValue.scopAdeverinta,
            status: 'Approved'
          }
        );
        if (response.status === 200 || response.status === 201) {
          fetchListaCereriAdeverinte();
          setAlert({
            type: "success",
            message: "Cerere acceptata!",
          });
          handleCloseAddUpdate();
        }
      } catch (error) {
        console.log(error.message, "error");
        setAlert({
          type: "danger",
          message: error.message || "Something went wrong...",
        });
      }
    }
  }

  const handleRejectAdeverinta = async (idTeamRole) => {
    if (!isFormValid()) {
      setShowErrors(true);
    }
    if (isFormValid()) {
      setShowErrors(false);
      try {
        const response = await rejectCerereAdeverinta(formValue?.motivRespingere, user?.emailSecretar,
          {
            dataInregistrare: formValue.dataInregistrare,
            emailStudent: formValue.emailStudent,
            scopAdeverinta: formValue.scopAdeverinta,
            status: 'Rejected'
          }
        );
        if (response.status === 200 || response.status === 201) {
          fetchListaCereriAdeverinte();
          setAlert({
            type: "success",
            message: "Cerere respinsa!",
          });
          handleCloseReject();
        }
      } catch (error) {
        console.log(error.message, "error");
        setAlert({
          type: "danger",
          message: error.message || "Something went wrong...",
        });
      }
    }
  }

  function createData(dataInregistrare, nrInregistrare, emailStudent, scopAdeverinta, status, motivRespingere) {
    return { dataInregistrare, nrInregistrare, emailStudent, scopAdeverinta, status, motivRespingere };
  }

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' pentru crescător, 'desc' pentru descrescător
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    const sortedCereri = listaCereriAdeverinte?.map(stud =>
      createData(stud.dataInregistrare, stud.nrInregistrare, stud.emailStudent, stud.scopAdeverinta, stud.status, stud.motivRespingere)
    ).sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.emailStudent.localeCompare(b.emailStudent);
      } else {
        return b.emailStudent.localeCompare(a.emailStudent);
      }
    });
    setRows(sortedCereri || []);
  }, [listaCereriAdeverinte, sortDirection]);

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
  console.log(formValue);
  return (
    <section className={styles.pageTeamRoles}>
      {listaCereriAdeverinte?.length === 0 ? <>
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
                <StyledTableCell align="center">Motiv</StyledTableCell>
                <StyledTableCell align="center">Accepta</StyledTableCell>
                <StyledTableCell align="center">Respinge</StyledTableCell>
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

                  <TableCell style={{ width: 130 }} align="center">
                    <Tooltip
                      title='Accepta cererea'
                      placement='top-start'
                      arrow
                      onClick={() => {
                        //setDepartment({ idDepartment: row?.id, departmentName: row?.departmentName, idOrganisation: user?.idOrganisation, departmentManager: row?.departmentManager, departmentManagerName: row?.departmentManagerName });
                        setFormValue({ ...formValue, dataInregistrare: row?.dataInregistrare, emailStudent: row?.emailStudent, scopAdeverinta: row?.scopAdeverinta })
                        handleOpenAddUpdate('aprove');
                      }} >
                      <IconButton>
                        <CheckTwoToneIcon className={styles.tableButtons} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  <TableCell style={{ width: 130 }} align="center">
                    <Tooltip
                      title='Respinge cererea'
                      placement='top-start'
                      arrow
                      onClick={() => {
                        //setDepartment({ idDepartment: row?.id, departmentName: row?.departmentName, idOrganisation: user?.idOrganisation, departmentManager: row?.departmentManager, departmentManagerName: row?.departmentManagerName });
                        setFormValue({ ...formValue, dataInregistrare: row?.dataInregistrare, emailStudent: row?.emailStudent, scopAdeverinta: row?.scopAdeverinta })
                        handleOpenReject();
                      }} >
                      <IconButton>
                        <CloseTwoToneIcon className={styles.tableButtons} />
                      </IconButton>
                    </Tooltip>
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

      {openAddUpdate.action === 'aprove' &&
        <StyledEngineProvider injectFirst>
          <Modal
            open={openAddUpdate.open}
            handleClose={handleCloseAddUpdate}
            title={'Cerere adeverință'}
            content={'Acceptă cererea de adeverinta'}
            handleActionYes={() => handleAcceptAdeverinta()}
            textActionYes={"Acceptă"}
            handleActionNo={handleCloseAddUpdate}
            textActionNo={"Anulează"}
          />
        </StyledEngineProvider>
      }

      {openAddUpdate.action === 'isFirstProcessedToday' &&
        <StyledEngineProvider injectFirst>
          <Modal
            open={openAddUpdate.open}
            handleClose={handleCloseAddUpdate}
            title={"Numar de inregistrare"}
            content={
              <Input
                type="number"
                placeholder="Introdu numarul de inregistrare"
                label="Numarul format din cifre"
                id="nrInregistrare"
                name="nrInregistrare"
                value={formValue.nrInregistrare}
                onChange={handleChange}
                required
                error={showErrors && checkErrors("nrInregistrare") ? true : false}
                helper={showErrors ? checkErrors("nrInregistrare") : ""}
              />
            }
            textActionYes={"Confirmă"}
            handleActionYes={() => {
              setOpenAddUpdate({ open: false, action: '' });
              setShowErrors(false);
            }}
            textActionNo={"Anulează"}
            handleActionNo={handleCloseAddUpdate}
          />
        </StyledEngineProvider>
      }

      {openReject &&
        <StyledEngineProvider injectFirst>
          <Modal
            open={openReject}
            handleClose={handleCloseReject}
            title={"Respinge cererea"}
            content={
              <Input
                type="text"
                placeholder="Motivul respingerii"
                label="Motiv"
                id="motivRespingere"
                name="motivRespingere"
                value={formValue.motivRespingere}
                onChange={handleChange}
                required
                error={showErrors && checkErrors("motivRespingere") ? true : false}
                helper={showErrors ? checkErrors("motivRespingere") : ""}
              />
            }
            textActionYes={"Confirmă"}
            handleActionYes={() => handleRejectAdeverinta()}
            textActionNo={"Anulează"}
            handleActionNo={handleCloseReject}
          />
        </StyledEngineProvider>
      }
      {/*{openReject &&
        <StyledEngineProvider injectFirst>
          <Modal
            open={openReject}
            handleClose={handleCloseReject}
            title={(<>{"Reject"} <br /> {"[" + lista.teamRoleName + "]"}</>)}
            content={"This action is permanent!"}
            handleActionYes={() => handleRejectTeamRole(lista.idTeamRole)}
            textActionYes={"Reject"}
            handleActionNo={handleCloseReject}
            textActionNo={"Cancel"}
          />
        </StyledEngineProvider>
      } */}
    </section >
  )
}

export default List;


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
