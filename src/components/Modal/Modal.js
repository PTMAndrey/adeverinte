import * as React from 'react';
import { Box, Modal, Button} from "../../assets/icons/materialMUI"
import styles from './Modal.module.scss'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    minWidth: 300,
    maxHeight: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3, 
    pr: 2,
    width: 'auto', // Ajustat pentru a se adapta la conținut
    maxWidth: '80%', // Sau o valoare care se potrivește bine pe ecran
    overflowY: 'auto', // Permite scroll pe orizontală dacă este necesar
};

export default function NestedModal({ open, handleClose, title, content, handleActionYes, textActionYes, handleActionNo, textActionNo }) {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                {/* <Box sx={{ ...style, width: 400 }}> */}
                <Box sx={{
                    ...style, width: 250,
                    '& h2': { fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }
                }}>
                    <h4 id="parent-modal-title">{title}</h4>
                    <br />
                    <div id="parent-modal-description">
                        {content}
                    </div>
                    <br />
                    <div className={styles.modalButtons}>
                        <Button onClick={handleActionNo}>{textActionNo}</Button>
                        <Button onClick={handleActionYes}>{textActionYes}</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
