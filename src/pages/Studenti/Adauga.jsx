import React, { useCallback, useState } from 'react';
import styles from "./Studenti.module.scss";
import { Container } from 'react-bootstrap';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import useStateProvider from '../../hooks/useStateProvider';
import useAuthProvider from '../../hooks/useAuthProvider';
import { addStudents, sendEmail } from '../../api/API';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ContentCopyIcon } from '../../assets/icons/iconsMUI';

const Adauga = () => {
    const { setAlert } = useStateProvider();
    const { user } = useAuthProvider();
    const [emailList, setEmailList] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = useCallback((files) => {
        const file = files[0];
        setUploadedFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const headers = json[0];
            const rows = json.slice(1);

            const emailObjects = [];

            for (let row of rows) {
                if (row.every(cell => cell === null || cell === "")) break;
                let emailObject = {
                    "emailStudent": "",
                    "nume": "",
                    "initialaTatalui": "",
                    "prenume": "",
                    "cicluDeStudii": "",
                    "anStudiu": "",
                    "formaDeInvatamant": "",
                    "formaDeFinantare": "",
                    "numeProgramDeStudiu": "",
                    "sex": ""
                };
                headers.forEach((header, index) => {
                    switch (header.trim().toLowerCase()) {
                        case 'email':
                        case 'emailstudent':
                            emailObject.emailStudent = row[index] || "";
                            break;
                        case 'nume':
                            emailObject.nume = row[index] || "";
                            break;
                        case 'initiala tatalui':
                            emailObject.initialaTatalui = row[index] || "";
                            break;
                        case 'prenume':
                            emailObject.prenume = row[index] || "";
                            break;
                        case 'ciclu de studii':
                            emailObject.cicluDeStudii = row[index] || "";
                            break;
                        case 'an de studiu':
                            emailObject.anStudiu = row[index] || "";
                            break;
                        case 'forma de invatamant':
                            emailObject.formaDeInvatamant = row[index] || "";
                            break;
                        case 'forma de finanțare ( buget / taxă )':
                            emailObject.formaDeFinantare = row[index] || "";
                            break;
                        case 'nume program de studiu':
                            emailObject.numeProgramDeStudiu = row[index] || "";
                            break;
                        case 'sex':
                            emailObject.sex = row[index] || "";
                            break;
                        default:
                            break;
                    }
                });
                emailObjects.push(emailObject);
            }

            setEmailList(emailObjects);
        };
        reader.readAsArrayBuffer(file);
    }, []);

    const handleCancelFile = () => {
        setUploadedFile(null);
        setEmailList([]);
    };

    const addStudenti = async () => {
        setIsLoading(true);
        try {
            console.log('Sending emails:', emailList);

            const resp = await addStudents(emailList);
            if (resp.status === 200) {
                setAlert({ type: 'success', message: 'Fisier adaugat cu succes!' });
                handleCancelFile();
            }
        } catch (error) {
            console.error('Error sending invitations:', error);
            setAlert({ type: 'error', message: 'Eroare la incarcarea fisierului' });
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <Container fluid className={styles.pageInvitations}>
            <div className={styles.containerInvitiations}>
                <p>Only excel ( *.xlsx ) file accepted</p>
                <Dropzone onDrop={handleFileUpload} />
                {
                    uploadedFile && (
                        <div className={styles.uploadedFileInfo}>
                            <p>Uploaded file: {uploadedFile.name}</p>
                            {!isLoading && <Button variant="destructive" label="Cancel file" onClick={handleCancelFile} />}
                        </div>
                    )
                }
                {
                    isLoading ? (
                        <div className={styles.spinner}></div>
                    ) : (
                        <Button
                            variant="primary"
                            label="Adaugă studenți"
                            disabled={emailList.length === 0 || isLoading}
                            onClick={addStudenti}
                        />
                    )
                }
            </div>
        </Container>
    )
}

function Dropzone({ onDrop, accept, open }) {
    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isDragActive,
    } = useDropzone({
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
            "text/csv": [".csv"],
        },
        maxFiles: 1,
        onDrop,
    });

    const [isHovered, setHovered] = useState(false);
    return (
        <div
            onMouseLeave={() => setHovered(false)}
            onMouseOver={() => setHovered(true)}
        >
            <div
                {...getRootProps({
                    className: `${styles.dropzone} ${isDragAccept && styles.accept} ${isDragReject && styles.reject}`,
                })}
            >
                <input {...getInputProps()} />
                <div>
                    {isDragActive ? (
                        isDragReject ? (
                            <p>File not supported</p>
                        ) : (
                            <p>Release here</p>
                        )
                    ) : isHovered ? (
                        <p>Drag and drop or click</p>
                    ) : (
                        <p>Add excel file to upload</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Adauga;
