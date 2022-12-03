// material-ui
import CRUD from "context/CRUDcontext"
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

// project imports
import { useEffect, useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import '../style.css'
import Select from 'react-select';
import { toast } from "react-toastify";
import { Breadcrumbs, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import { NavigateNext } from "@material-ui/icons";

// ==============================|| SAMPLE PAGE ||============================== //

const EditUser = () => {

    const history = useNavigate();
    const Location = useLocation();
    const editData = Location && Location.state && Location.state.data ? Location.state.data : null;
    const ConteryRef = useRef()
    const StateRef = useRef()
    const CityRef = useRef()

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        panID: "",
        gstno: "",
        contery: "",
        state: "",
        city: "",
        address: "",
    });

    // Get data from user list ===========================

    useEffect(() => {
        console.log(Location, "==-=-=--=-=-=-");
        if (editData !== null && typeof editData !== "undefined" && editData) {
            setUser((Values) => ({
                ...Values,
                id: editData.id,
                username: editData.username,
                email: editData.email,
                phone: Number(editData.phone),
                panID: editData.panID,
                gstno: editData.gstno,
                contery: { label: editData.contery, value: editData.contery },
                state: { label: editData.state, value: editData.state },
                city: editData.city,
                address: editData.address,
            }));

            if (editData.contery === "India") {
                setStatesOptions(India_state)
            } else if (editData.contery === "UK") {
                setStatesOptions(UK_state)
            }
        }
    }, [])

    // onchange function calling ===========================

    const { id, username, email, phone, panID, gstno, contery, state, city, address } = user;
    function handleOnChange(e) {
        const { name, value } = e.target;
        // setUser({ ...user, [name]: value });
        setUser((Value) => ({ ...Value, [name]: value }));
        console.log(user);
    }

    const submit = async (e) => {
        e.preventDefault();
        if (user.city && user.state && user.contery && user.username && user.email && user.phone && user.panID && user.gstno && user.address) {
            const formdata = {
                username: user.username,
                email: user.email,
                phone: user.phone,
                panID: user.panID,
                gstno: user.gstno,
                contery: user.contery.value,
                state: user.state.value,
                city: user.city,
                address: user.address,
            }
            console.log(id, formdata)
            CRUD.editData(id, formdata, "Userlist")
            toast.success("Edit User Successfully");
            history("/firebase/userlist");
        } else if (!user.contery) {
            if (ConteryRef.current) {
                ConteryRef.current.focus()
                toast.warn("Please Fill Out All Field");
            }
        } else if (!user.state) {
            if (StateRef.current) {
                StateRef.current.focus()
                toast.warn("Please Fill Out All Field");
            }
        } else if (!user.city) {
            if (CityRef.current) {
                CityRef.current.focus()
                toast.warn("Please Fill Out All Field");
            }
        } else if (!user.username || !user.email || !user.phone || !user.panID || !user.gstno || !user.city || !user.address) {
            toast.warn("Please Fill Out All Field");
        }
    }

    //===========================|| Select Option ||===========================

    const [stateOption, setStatesOptions] = useState([]);

    // contry_option=======
    const India_state = [
        { label: "Delhi", value: "Delhi" },
        { label: "Gujarat", value: "Gujarat" },
    ];

    const UK_state = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
    ];
    //=============================

    const handlechangeSelect = (name, value) => {
        setUser((Value) => ({ ...Value, [name]: value }));
        console.log(name, value, "++++++++")
        console.log(user, "*********")

        if (name === "contery") {
            setStatesOptions([])
            setUser((Value) => ({ ...Value, state: null, city: "" }));
            if (value && typeof value !== "undefined" && value !== null) {
                if (value.value === "India") {
                    setStatesOptions(India_state)
                } else if (value.value === "UK") {
                    setStatesOptions(UK_state)
                }
            }
        }
        if (name === "state") {
            setUser((Value) => ({ ...Value, city: "" }));
        }
    }

    //=========================================================================

    return (
        <>
            <MainCard className="header">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Edit User</h4>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <NavLink to='/'><Home className="home" fontSize="small" /></NavLink>
                        <NavLink to='/firebase/userlist'>User List</NavLink>
                        <Typography>View User</Typography>
                    </Breadcrumbs>
                </div>
            </MainCard>
            <MainCard>
                <form onSubmit={(e) => submit(e)} className="is-filled">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" name="username" className="form-control" value={username} onChange={handleOnChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={email} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input type="number" name="phone" className="form-control" maxLength={10} pattern="[0-9]{10}" value={phone} onChange={handleOnChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">PanID</label>
                            <input type="text" name="panID" className="form-control" maxLength={10} value={panID} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">GST - NO.</label>
                            <input type="text" name="gstno" className="form-control" value={gstno} onChange={handleOnChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className="form-label">Contery</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select contery"
                                isClearable={true}
                                name="contery"
                                ref={ConteryRef}
                                options={[
                                    { label: "India", value: "India" },
                                    { label: "UK", value: "UK" },
                                ]}
                                value={contery}
                                onChange={(e) => handlechangeSelect("contery", e)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="" className="ms-0 form-label">State</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select contery"
                                isClearable={true}
                                name="state"
                                ref={StateRef}
                                options={stateOption}
                                value={state}
                                onChange={(e) => handlechangeSelect("state", e)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className="ms-0 form-label">City</label>
                            <input className="form-control" type="text" ref={CityRef} name="city" value={city} onChange={handleOnChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="" className="ms-0">Address</label>
                            <textarea className="form-control" name="address" rows={4} value={address} onChange={handleOnChange} placeholder="enter your addreass" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group input-group-outline my-3">
                                <button className="btn btn-success" type="submit" style={{ zIndex: '0' }}>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </MainCard>
        </>
    );
};

export default EditUser;