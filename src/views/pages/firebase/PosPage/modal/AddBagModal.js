import React, { useEffect, useState } from 'react'

// modal======
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { TextField, IconButton } from '@mui/material';
import AddBox from '@material-ui/icons/AddBox';
import Remove from '@material-ui/icons/Remove';
import { toast } from 'react-toastify';

//=============

const AddBagModal = (props) => {
    const { openBagModal, handleBagModal, addBag, BagModalData } = props;

    const [bagsForm, setBagsForm] = useState([{ bag: "", wht: "", total: "" }])

    useEffect(() => {
        console.log(BagModalData, "BagModalData useEffect")
        if (BagModalData && typeof BagModalData !== 'undefined') {
            console.log("BagModalData not undefined")
            if (BagModalData && BagModalData.bags) {
                setBagsForm(BagModalData.bags)
                console.log("bag form fill")
            }
        }
    }, [BagModalData])

    const AddField = () => {
        setBagsForm([...bagsForm, { bag: "", wht: "", total: "" }])
    }

    const RemoveField = (index) => {
        const Field = [...bagsForm]
        Field.splice(index, 1)
        setBagsForm(Field)
    }

    // Add Form  ========
    function handleBagOnChange(name, value, index) {
        console.log(name, value, index);
        const re = /^[0-9|.\b]+$/;
        if (value === '' || re.test(value)) {
            const Field = [...bagsForm]
            Field[index][name] = value
            setBagsForm(Field)
            if (Field[index].bag && Field[index].wht) {
                Field[index].total = Field[index].bag * Field[index].wht
            }
        }
    }

    const SaveBag = () => {
        console.log(BagModalData, "BagModalData on save");
        let valid = true
        bagsForm.forEach((el) => {
            if (!el.bag || !el.wht) {
                valid = false
            }
        })

        if (valid) {
            const newObj = {
                ...BagModalData,
                bags: bagsForm,
            }
            addBag(newObj);
            setBagsForm([{ bag: "", wht: "", total: "" }])
        } else {
            toast.warn("Please Fill Out type Field");
        }
    }



    // ==========================
    return (
        <>
            <Modal open={openBagModal} onClose={() => handleBagModal()}>
                <Box className="pos_modal">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3>Add Bags</h3>
                        <IconButton title="add Bag" onClick={() => AddField()}>
                            <AddBox />
                        </IconButton>
                    </div>
                    <Box sx={{ '& > :not(style)': { margin: "8px 8px 8px 0", width: '100%' } }}>
                        <div className="d-flex flex-column gap">
                            {bagsForm.map((item, index) => (
                                <div className='d-flex gap align-items-center' key={index}>
                                    <div className="d-flex gap">
                                        <TextField label="Bag" variant="outlined" name="bag" value={item.bag} onChange={(e) => handleBagOnChange(e.target.name, e.target.value, index)} />
                                        <TextField label="Wht (gm)" variant="outlined" name="wht" value={item.wht} onChange={(e) => handleBagOnChange(e.target.name, e.target.value, index)} />
                                    </div>
                                    {bagsForm.length > 1 && <IconButton title="add Bag" onClick={() => RemoveField(index)}><Remove /></IconButton>}
                                </div>
                            ))}
                        </div>
                    </Box>
                    <div className='pos_btn'>
                        <button className="btn btn-success" onClick={() => SaveBag()}>Save</button>
                        <button className="btn btn-success" onClick={() => handleBagModal()}>Close</button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default AddBagModal
