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

    // active form
    const [activeForm, setActiveForm] = useState("");

    // form data
    const [formValue, setFormValue] = useState({
        numeCompletFacultate: facultate?.numeCompletFacultate || "",
        numeScurtFacultate: facultate?.numeScurtFacultate || "",
        anUniversitarCurent: facultate?.anUniversitarCurent || "",
        numeDecan: facultate?.numeDecan || "",
        numeSecretaraSefa: facultate?.numeSecretaraSefa || "",
    });

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };


    const handleCancel = () => {
        setActiveForm("");
        setFormValue({
            numeCompletFacultate: facultate?.numeCompletFacultate || "",
            numeScurtFacultate: facultate?.numeScurtFacultate || "",
            anUniversitarCurent: facultate?.anUniversitarCurent || "",
            numeDecan: facultate?.numeDecan || "",
            numeSecretaraSefa: facultate?.numeSecretaraSefa || "",
        });

    };
    const clearText = () => {
        setFormValue({
            numeCompletFacultate: facultate?.numeCompletFacultate || "",
            numeScurtFacultate: facultate?.numeScurtFacultate || "",
            anUniversitarCurent: facultate?.anUniversitarCurent || "",
            numeDecan: facultate?.numeDecan || "",
            numeSecretaraSefa: facultate?.numeSecretaraSefa || "",
        });

    };

    // isFormValid
    const isFormValid = (field) => {
        if (field === "numeCompletFacultate") {
            if (formValue[field].length > 9) {
                return true;
            }
        }
        if (field === "numeScurtFacultate") {
            if (formValue[field].length > 1) {
                return true;
            }
        }
        if (field === "anUniversitarCurent") {
            if (formValue[field].length > 8) {
                return true;
            }
        }
        if (field === "numeDecan") {
            if (formValue[field].length > 9) {
                return true;
            }
        }
        if (field === "numeSecretaraSefa") {
            if (formValue[field].length > 9) {
                return true;
            }
        }
        return false;
    };

    // show error message
    const [showErrors, setShowErrors] = useState(false);

    // handleSubmit
    const handleSubmit = async (e, field) => {
        // e.preventDefault();
        // e.stopPropagation();

        // if (isFormValid(field)) {
        //   setShowErrors(false);
        //   try {
        //     const response = await updateOrganisationAddress(user?.idOrganisation, formValue.organisationHeadquarterAddress);
        //     if (response.status === 200) {
        //       setAlert({
        //         type: "success",
        //         message: "Profile updated successfully",
        //       });
        //       fetchUser(user?.idUser)

        //       setActiveForm("");
        //     }
        //   } catch (error) {
        //     console.log(error.message, "error");
        //     setAlert({
        //       type: "danger",
        //       message: error.message || "Something went wrong...",
        //     });
        //   }
        // } else {
        //   setShowErrors(true);
        // }
    };
    return (
        <Container className={styles.container}>
            <Col className={styles.leftSide}>
                <div>
                    <RowItem
                        // icon={<CiUser />}
                        title="Nume"
                        info={user?.nume + ' ' + user?.prenume}
                    />
                    <RowItem
                        // icon={<MdOutlineEmail />}
                        title="Email"
                        info={user?.emailAdministrator !== null || user?.emailSecretar}
                    />

                    <RowItem
                        // icon={<HiOutlineOfficeBuilding />}
                        title="Facultate"
                        info={"FIESC"}
                    />
                    <RowItem
                        // icon={<HiOutlineOfficeBuilding />}
                        title="Facultate"
                        info={"Facultatea de Inginerie Electrica si Stiinta Calculatoarelor"}
                    />
                    {/* {!user?.rol?.some(authority => authority.rol === "ADMIN")
                        ?
                        <div className={styles.inputRowItem}>
                            <RowItem
                                active={activeForm === "organisationHeadquarterAddress" ? true : false}
                                onAction={() => setActiveForm("organisationHeadquarterAddress")}
                                onCancel={handleCancel}
                                // icon={<FaRegAddressCard />}
                                title="Organisation Address"
                                info={user?.organisationHeadquarterAddress}
                                action="Edit"
                            />
                            {activeForm === "organisationHeadquarterAddress" && (
                                <div className={styles.form}>
                                    <Input
                                        onChange={handleChange}
                                        value={formValue.organisationHeadquarterAddress}
                                        name="organisationHeadquarterAddress"
                                        id="organisationHeadquarterAddress"
                                        type="text"
                                        clearable
                                        onIconClear={clearText}
                                        label="Address"
                                        placeholder="Change the address"
                                        error={showErrors && !isFormValid("organisationHeadquarterAddress")}
                                        helper={
                                            showErrors && !isFormValid("organisationHeadquarterAddress")
                                                ? "Address must be at least 10 characters"
                                                : ""
                                        }
                                    />
                                    <Button onClick={(e) => handleSubmit(e, "organisationHeadquarterAddress")} label="Save" />
                                </div>
                            )}
                        </div>
                        :
                        <RowItem
                            //   icon={<TbSteam />}
                            title="Organisation Address"
                            info={user?.organisationHeadquarterAddress}
                        />
                    }
                    {user?.departmentName &&
                        <RowItem
                            //   icon={<HiOutlineOfficeBuilding />}
                            title="Department"
                            info={user?.departmentName}
                        />
                    } */}

                    <RowItem
                        // icon={<MdOutlineLocalPolice />}
                        title="My roles"
                        info={user?.authorities}
                    />
                </div>
            </Col>

        </Container>

    )
}

export default Info
