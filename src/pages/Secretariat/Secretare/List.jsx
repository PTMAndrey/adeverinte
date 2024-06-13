import React, { useEffect, useMemo, useState } from 'react'
import styles from './Secretariat.module.scss';
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
    AddCircleOutlineIcon,
    DeleteForeverIcon,
    BorderColorIcon,
    TextRotationAngleupIcon,
    TextRotationAngledownIcon
} from '../../../assets/icons/iconsMUI';

import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';


const List = () => {
    const { listaSecretari, fetchListaSecretari, currentPageSecretari, pageSizeSecretariat } = useStateProvider();
    const { user } = useAuthProvider();
    const { width } = useWindowDimensions();

    const { setAlert } = useStateProvider();

    const [openAddUpdate, setOpenAddUpdate] = useState({ open: false, action: '' });

    const [openDelete, setOpenDelete] = useState(false);

    useEffect(() => {
        fetchListaSecretari();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const [showErrors, setShowErrors] = useState(false);


    const handleOpenDelete = () => {
        setOpenDelete(true);

    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
        setShowErrors(false);
    };

    const handleOpenAddUpdate = (action) => {
        setOpenAddUpdate({ open: true, action: action });
    }
    const handleCloseAddUpdate = () => {
        setOpenAddUpdate({ open: false, action: '' });
        setShowErrors(false);

    }

    const handleAddTeamRole = async () => {
        // if (!isFormValid()) {
        //   setShowErrors(true);
        // }
        // if (isFormValid()) {
        //   setShowErrors(false);
        //   try {
        //     const response = await addTeamRoles(user?.idUser, { teamRoleName: teamRole.teamRoleName, idOrganisation: user?.idOrganisation });
        //     if (response.status === 200 || response.status === 201) {
        //       fetchTeamRoles(user?.idOrganisation);
        //       setAlert({
        //         type: "success",
        //         message: "You added a new role!",
        //       });
        //       handleCloseAddUpdate();
        //     }
        //   } catch (error) {
        //     console.log(error.message, "error");
        //     setAlert({
        //       type: "danger",
        //       message: error.message || "Something went wrong...",
        //     });
        //   }
        // }
    }

    const handleUpdateTeamRole = async (idTeamRole) => {
        // if (!isFormValid()) {
        //   setShowErrors(true);
        // }
        // if (isFormValid()) {
        //   setShowErrors(false);
        //   try {
        //     const response = await updateTeamRoles(idTeamRole, { teamRoleName: teamRole.teamRoleName, idOrganisation: user?.idOrganisation });
        //     if (response.status === 200 || response.status === 201) {
        //       fetchTeamRoles(user?.idOrganisation);
        //       setAlert({
        //         type: "success",
        //         message: "Update complete!",
        //       });
        //       handleCloseAddUpdate();
        //     }
        //   } catch (error) {
        //     console.log(error.message, "error");
        //     setAlert({
        //       type: "danger",
        //       message: error.message || "Something went wrong...",
        //     });
        //   }
        // }
    }

    const handleDeleteTeamRole = async (idTeamRole) => {
        // try {
        //   const response = await deleteTeamRoles(idTeamRole);
        //   if (response.status === 200 || response.status === 201) {
        //     fetchTeamRoles(user?.idOrganisation);
        //     setAlert({
        //       type: "success",
        //       message: "Team-role deleted!",
        //     });
        //     handleCloseDelete();
        //   }
        // } catch (error) {
        //   console.log(error.message, "error");
        //   setAlert({
        //     type: "danger",
        //     message: error.message || "Something went wrong...",
        //   });
        // }
    }

    function createData(emailSecretar, nume, prenume, titlu, numeProgramDeStudiu) {
        return { emailSecretar, nume, prenume, titlu, numeProgramDeStudiu };
    }

    const [rows, setRows] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' pentru crescător, 'desc' pentru descrescător
    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        const sortedSecretari = listaSecretari?.map(stud =>
            createData(stud.emailSecretar, stud.nume, stud.prenume, stud.titlu, stud.numeProgramDeStudiu)
        ).sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.nume.localeCompare(b.nume);
            } else {
                return b.nume.localeCompare(a.nume);
            }
        });
        setRows(sortedSecretari || []);
    }, [listaSecretari, sortDirection]);

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
        <section className={styles.pageList}>
            {listaSecretari?.length === 0 ? <>
                <TableNotFound />
            </>
                :
                <TableContainer component={Paper} className={styles.table}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Nr. Crt.</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Titlu</StyledTableCell>
                                <StyledTableCell align="center">
                                    Nume
                                    <IconButton onClick={toggleSortDirection} className={styles.iconWhite}>
                                        {sortDirection === 'asc' ? <TextRotationAngledownIcon /> : <TextRotationAngleupIcon />}
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell align="center">Prenume</StyledTableCell>
                                <StyledTableCell align="center">Program de studiu</StyledTableCell>
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
                                    <TableCell style={{ width: 160 }} align="center">
                                        {row?.emailSecretar}
                                    </TableCell>

                                    <TableCell style={{ width: 160 }} align="center">
                                        {row?.titlu}
                                    </TableCell>

                                    <TableCell style={{ width: 160 }} align="center">
                                        {row?.nume}
                                    </TableCell>

                                    <TableCell style={{ width: 160 }} align="center">
                                        {row?.prenume}
                                    </TableCell>

                                    <TableCell style={{ width: 160 }} align="center">
                                        {row?.numeProgramDeStudiu}
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
            {/* {openAddUpdate.open &&
        <StyledEngineProvider injectFirst>
          <Modal
            open={openAddUpdate.open}
            handleClose={handleCloseAddUpdate}
            title={openAddUpdate.action === 'add' ? "Add new role" : (<>{"Update"} <br /> {"[" + lista.teamRoleName + "]"}</>)}
            content={
              <Input
                type="text"
                placeholder="Role"
                label="Team role"
                id="teamRoleName"
                name="teamRoleName"
                value={lista.teamRoleName}
                onChange={handleChange}

                required
                error={showErrors && checkErrors("teamRoleName") ? true : false}
                helper={showErrors ? checkErrors("teamRoleName") : ""}
              />
            }
            handleActionYes={() => openAddUpdate.action === 'add' ? handleAddTeamRole() : handleUpdateTeamRole(lista.idTeamRole)}
            textActionYes={"Confirm"}
            handleActionNo={handleCloseAddUpdate}
            textActionNo={"Cancel"}
          />
        </StyledEngineProvider>
      }
      {openDelete &&
        <StyledEngineProvider injectFirst>
          <Modal
            open={openDelete}
            handleClose={handleCloseDelete}
            title={(<>{"Delete"} <br /> {"[" + lista.teamRoleName + "]"}</>)}
            content={"This action is permanent!"}
            handleActionYes={() => handleDeleteTeamRole(lista.idTeamRole)}
            textActionYes={"Delete"}
            handleActionNo={handleCloseDelete}
            textActionNo={"Cancel"}
          />
        </StyledEngineProvider>
      } */}
        </section>
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
