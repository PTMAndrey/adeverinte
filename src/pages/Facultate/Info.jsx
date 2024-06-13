import React, { useState } from 'react'
import RowItem from '../../components/RowItem/RowItem'
import useAuthProvider from '../../hooks/useAuthProvider';
import useStateProvider from '../../hooks/useStateProvider';
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Facultate.module.scss"

import { Col, Container, Row } from 'react-bootstrap';

// import { updateOrganisationAddress } from '../../api/API';


const Info = () => {
    const { user } = useAuthProvider();

    // state provider
    const { setAlert, fetchFacultate, facultate } = useStateProvider();

    return (
        <Container className={styles.container}>
            <Col className={styles.leftSide}>
                <div>
                    <RowItem
                        title="Nume"
                        info={user?.nume + ' ' + user?.prenume}
                    />
                    <RowItem
                        title="Email"
                        info={localStorage.getItem("emailToLog")}
                    />

                    <RowItem
                        title="Facultate"
                        info={facultate.numeScurtFacultate}
                    />
                    <RowItem
                        title="Facultate"
                        info={facultate.numeCompletFacultate}
                    />
                    <RowItem
                        title="An universitar"
                        info={facultate.anUniversitarCurent}
                    />
                    <RowItem
                        title="Decan"
                        info={facultate.numeDecan}
                    />
                    <RowItem
                        title="Secretara sefa"
                        info={facultate.numeSecretaraSefa}
                    />
                </div>
            </Col>

        </Container>

    )
}

export default Info
