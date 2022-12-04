import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import UpdateForm from './UpdateCategoryForm';
import { CategoriesContext } from './context/CategoryContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ id }) {
    const { setCategoriesData } = useContext(CategoriesContext)
    const modelCloseHan = () => {
        setCategoriesData((pre) => ({ ...pre, openUpdateModel: false, updateId: "" }));
    }
    return (
        <div>
            <Modal
                onClose={modelCloseHan}
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UpdateForm id={id} />
                </Box>
            </Modal>
        </div>
    );
}
