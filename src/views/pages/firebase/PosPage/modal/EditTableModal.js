import React, { useEffect, useState } from 'react'

// modal======
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const EditTableModal = (props) => {
    const [formValue, setFormValue] = useState(null);

    useEffect(() => {
        if (props.tableModalData && typeof props.tableModalData !== 'undefined') {
            setFormValue(props.tableModalData)
            console.log(props.tableModalData, "tableModalData in useEffect")
        }
    }, [props.tableModalData])

    // Update Form state  ========
    function handleAddOnChange(name, value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            setFormValue((Value) => ({ ...Value, [name]: value }));
        }
    }

    const EditHandler = () => {
        if (formValue.Weight && formValue.Touch && formValue.Touch_w && formValue.Qty) {
            const newObj = {
                ...formValue,
                Weight: Number(formValue.Weight),
                Touch: Number(formValue.Touch),
                Touch_w: Number(formValue.Touch_w),
                Qty: Number(formValue.Qty),
                Net: Number(formValue.Weight - formValue.Bag_Wht),
                Amount: Number(formValue.price * formValue.Qty),
            }
            if (newObj.Weight > 0 && newObj.Touch > 0 && newObj.Touch_w > 0 && newObj.Qty > 0) {
                console.log(newObj);
                props.EditItem(newObj);
                setFormValue(null)
            } else {
                toast.warn("Please enter valid data");
            }
        } else {
            toast.warn("Please Fill Out type Field");
        }
        // if (!formValue.Weight || !formValue.Touch || !formValue.Touch_w || !formValue.Qty) {
        //     valid = false
        // }

        // if (valid) {
        //     const newObj = {
        //         ...formValue,
        //         Weight: Number(formValue.Weight),
        //         Touch: Number(formValue.Touch),
        //         Touch_w: Number(formValue.Touch_w),
        //         Qty: Number(formValue.Qty),
        //         Net: Number(formValue.Weight - formValue.Bag_Wht),
        //         Amount: Number(formValue.price * formValue.Qty),
        //     }
        //     if (newObj.Weight > 0 && newObj.Touch > 0 && newObj.Touch_w > 0 && newObj.Qty > 0) {
        //         console.log(newObj);
        //         props.EditItem(newObj);
        //         setFormValue(null)
        //     } else {
        //         toast.warn("Please enter valid data");
        //     }
        // } else {
        //     toast.warn("Please Fill Out type Field");
        // }
    }

    return (
        <>
            <Modal open={props.openTableModal} onClose={() => props.handleEditTableModal()}>
                <Box className="pos_modal">
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        Edit Table Iteam
                    </Typography>
                    <Box sx={{ '& > :not(style)': { margin: "8px 8px 8px 0", width: '100%' } }}>
                        {formValue &&
                            <div className="d-flex flex-column gap">
                                <div className="d-flex gap">
                                    <TextField label="Weight" variant="outlined" name="Weight" value={formValue.Weight} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                                    <TextField label="Touch" variant="outlined" name="Touch" value={formValue.Touch} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                                </div>
                                <div className="d-flex gap">
                                    <TextField label="Touch (w)" variant="outlined" name="Touch_w" value={formValue.Touch_w} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                                    <TextField label="Qty" variant="outlined" name="Qty" value={formValue.Qty} onChange={(e) => handleAddOnChange(e.target.name, e.target.value)} />
                                </div>
                            </div>
                        }
                    </Box>
                    <div className='pos_btn'>
                        <button className="btn btn-success" onClick={() => EditHandler()} > Edit</button>
                        <button className="btn btn-success" onClick={() => props.handleEditTableModal()} > close</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default EditTableModal;
