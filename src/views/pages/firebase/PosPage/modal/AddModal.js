import React, { useState } from 'react'

// modal======
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

//=============

const AddBagModal = (props) => {
    const { addItem, openAddModal, handleAddModal, listRowData } = props;

    const [formValue, setFormValue] = useState({
        txtWeight: "",
        txtTouch: "",
        txtTouch_w: "",
        txtQty: ""
    });

    const clearForm = () => {
        setFormValue({
            txtWeight: "",
            txtTouch: "",
            txtTouch_w: "",
            txtQty: ""
        })
    }

    // Update Form state  ========
    function handleAddOnChange(name, value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            setFormValue((Value) => ({ ...Value, [name]: value }));
        }
    }

    const addHandler = () => {
        if (formValue.txtWeight && formValue.txtTouch && formValue.txtTouch_w && formValue.txtQty) {
            const newObj = {
                ...listRowData,
                Weight: Number(formValue.txtWeight),
                Touch: Number(formValue.txtTouch),
                Touch_w: Number(formValue.txtTouch_w),
                Qty: Number(formValue.txtQty),
                Bag_Wht: "",
                Net: Number(formValue.txtWeight),
                TNW: "",
                Fine: "",
                Amount: Number(listRowData.price * formValue.txtQty),
            }
            if (newObj.Weight > 0 && newObj.Touch > 0 && newObj.Touch_w > 0 && newObj.Qty > 0) {
                addItem(newObj);
                clearForm();
            } else {
                toast.warn("Please enter valid data");
            }
        } else {
            toast.warn("Please Fill Out type Field");
        }
    }

    // ==========================
    return (
        <>
            <Modal open={openAddModal} onClose={() => handleAddModal()}>
                <Box className="pos_modal">
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        Add Iteam
                    </Typography>
                    <Box sx={{ '& > :not(style)': { margin: "8px 8px 8px 0", width: '100%' } }}>
                        <div className="d-flex flex-column gap">
                            <div className="d-flex gap">
                                <TextField label="Weight" variant="outlined" name="txtWeight" value={formValue.txtWeight} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                                <TextField label="Touch" variant="outlined" name="txtTouch" value={formValue.txtTouch} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                            </div>
                            <div className="d-flex gap">
                                <TextField label="Touch (w)" variant="outlined" name="txtTouch_w" value={formValue.txtTouch_w} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                                <TextField label="Qty" variant="outlined" name="txtQty" value={formValue.txtQty} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                            </div>
                        </div>
                    </Box>
                    <div className='pos_btn'>
                        <Button className="btn btn-success" onClick={() => addHandler()}>ADD</Button>
                        <Button className="btn btn-success" onClick={() => handleAddModal()}>Close</Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddBagModal
