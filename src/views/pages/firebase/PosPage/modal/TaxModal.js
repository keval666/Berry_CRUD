import React, { useEffect, useState } from 'react'
import '../../style.css'

// modal======
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const TaxModal = (props) => {
    const [formTax, setFormTax] = useState(0)

    useEffect(() => {
        setFormTax(props.taxModalData.tax)
    }, [props.taxModalData])

    const handleTaxOnChange = (value) => {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value)) {
            setFormTax(value);
        }
    }

    const EditHandler = () => {
        if (formTax && formTax !== " " && formTax !== undefined && formTax !== null) {
            const newObj = formTax
            if (formTax > 0) {
                console.log(newObj)
                props.EditTax(newObj)
                setFormTax(0)
            } else {
                toast.warn("Please enter valid data");
            }
        } else {
            toast.warn("Please Fill Out type Field");
        }
    }

    return (
        <>
            <Modal open={props.openTaxModal} onClose={() => props.handleTaxModal()}>
                <Box className="pos_modal">
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        Edit Tax Field
                    </Typography>
                    <Box sx={{ '& > :not(style)': { margin: "8px 8px 8px 0", width: '100%' } }}>
                        <div className="d-flex gap">
                            <TextField label="Tax" variant="outlined" name="Tax" value={formTax} onChange={(e) => handleTaxOnChange(e.target.value)} />
                            {props.taxModalData.type !== "1" && <TextField label="Tax" variant="outlined" name="Tax" value={formTax} onChange={(e) => handleTaxOnChange(e.target.value)} />}
                        </div>
                    </Box>
                    <div className='pos_btn'>
                        <button className="btn btn-success" onClick={() => EditHandler()} > Edit</button>
                        <button className="btn btn-success" onClick={() => props.handleTaxModal()} > close</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default TaxModal
