import React, { useCallback, useState } from 'react';
import styles from "./Secretariat.module.scss";
import { Container } from 'react-bootstrap';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import useStateProvider from '../../../hooks/useStateProvider';
import useAuthProvider from '../../../hooks/useAuthProvider';
import { addListSecretari } from '../../../api/API';

const Adauga = () => {
    const { setAlert } = useStateProvider();
    const { user } = useAuthProvider();
    const [listaSecretari, setListaSecretari] = useState([]);
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

            const excelRowObjects = [];

            for (let row of rows) {
                if (row.every(cell => cell === null || cell === "")) break;
                let rowObject = {
                    "emailSecretar": "",
                    "nume": "",
                    "prenume": "",
                    "titlu": "",
                    "numeProgramDeStudiu": "",
                };
                headers.forEach((header, index) => {
                    switch (header.trim().toLowerCase()) {
                        case 'email':
                        case 'email secretar':
                            rowObject.emailSecretar = row[index] || "";
                            break;
                        case 'nume':
                            rowObject.nume = row[index] || "";
                            break;
                        case 'prenume':
                            rowObject.prenume = row[index] || "";
                            break;
                        case 'titlu':
                            rowObject.titlu = row[index] || "";
                            break;
                        case 'nume program de studiu':
                            rowObject.numeProgramDeStudiu = row[index] || "";
                            break;
                        default:
                            break;
                    }
                });
                excelRowObjects.push(rowObject);
            }
            console.log(excelRowObjects);
            setListaSecretari(excelRowObjects);
        };
        reader.readAsArrayBuffer(file);
    }, []);

    const handleCancelFile = () => {
        setUploadedFile(null);
        setListaSecretari([]);
    };

    const addSecretari = async () => {
        setIsLoading(true);
        try {
            const resp = await addListSecretari(listaSecretari);
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
    const handleDownloadFile = () => {
        const url = '/Model_Adaugare_Secretari.xlsx';
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Model_Adaugare_Secretari.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setAlert({ type: 'success', message: 'Fisier descarcat cu succes!' })
    };
    return (
        <Container fluid>
            <div className={styles.containerAddFile}>
                <Button
                    variant="destructive"
                    label="Descarcă un fișier model"
                    onClick={handleDownloadFile}
                />
                <hr />
            </div>
            <div className={styles.containerAddFile}>
                <p>Adaugă fișierul cu toate câmpurile completate în zona marcată</p>
                <small>Doar fișiere cu extensia ( *.xlsx ) sunt acceptate</small>
                <Dropzone onDrop={handleFileUpload} />
                {
                    uploadedFile && (
                        <div className={styles.uploadedFileInfo}>
                            <p>Fișier: {uploadedFile.name}</p>
                            {!isLoading && <Button variant="destructive" label="Șterge fișier" onClick={handleCancelFile} />}
                        </div>
                    )
                }
                {
                    isLoading ? (
                        <div className={styles.spinner}></div>
                    ) : (
                        <Button
                            variant="primary"
                            label="Adaugă secretari"
                            disabled={listaSecretari.length === 0 || isLoading}
                            onClick={addSecretari}
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
