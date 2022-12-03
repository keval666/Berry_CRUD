// material-ui
import CRUD from "context/CRUDcontext"
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

// project imports
import { useRef, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import MainCard from 'ui-component/cards/MainCard';
import '../style.css'
import { Breadcrumbs, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import { NavigateNext } from "@material-ui/icons";

// ==============================|| SAMPLE PAGE ||============================== //

const AddUser = () => {

    const history = useNavigate();
    const ConteryRef = useRef()
    const StateRef = useRef()
    const [error, setError] = useState({
        contery: false,
        state: false
    })
    const [user, setUser] = useState({
        contery: "",
        state: "",
    });

    const { contery, state } = user;
    function handleOnChange(e) {
        const { name, value } = e.target;
        // setUser({ ...user, [name]: value });
        setUser((Value) => ({ ...Value, [name]: value }));
        // console.log(user);
        console.log(e.target.name, e.target.value);
    }

    // Form Validation===============

    const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();

    // ==============================

    const submit = async (e) => {
        // e.preventDefault();
        if (e.username && e.email && e.phone && e.panID && e.gstno && user.contery && user.state && e.city && e.address) {
            const data = {
                username: e.username,
                email: e.email,
                phone: Number(e.phone),
                panID: e.panID,
                gstno: e.gstno,
                contery: user.contery.value,
                state: user.state.value,
                city: e.city,
                address: e.address,
            }
            toast.success("User Added successfully");
            history(-1);
            console.log(e, "e");
            console.log(data, "data");
            console.log(user, "user");
            await CRUD.addData(data, "Userlist");
        } else if (!e.city || !e.username || !e.email || !e.phone || !e.panID || !e.gstno || !e.address) {
            toast.warn(errors);
        } else if (!user.contery) {
            if (ConteryRef.current) {
                ConteryRef.current.focus()
                toast.warn("Please Fill Out Contry Field");
            }
        } else if (!user.state) {
            if (StateRef.current) {
                StateRef.current.focus()
                toast.warn("Please Fill Out State Field");
            }
        }
        console.log(errors);
    }

    //===========================|| Select Option ||===========================
    const [stateOption, setStatesOptions] = useState([]);

    // State_option=======
    const India_state = [
        { label: "Delhi", value: "Delhi" },
        { label: "Gujarat", value: "Gujarat" },
    ];

    const UK_state = [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
    ];

    //+++++++++
    const handlechangeSelect = (name, value) => {
        // debugger
        setUser((Value) => ({ ...Value, [name]: value }));
        console.log(name, value, "+++++++++")
        console.log(user, "*********")

        if (name === "contery") {
            setError({ country: true })
            setStatesOptions([]);
            setUser((Value) => ({ ...Value, state: null }));
            setError({ contery: !value ? true : false })
            reset({ ...getValues(), "city": "" })
            if (value && typeof value !== "undefined" && value !== null) {
                if (value.value === "India") {
                    setStatesOptions(India_state)
                } else if (value.value === "UK") {
                    setStatesOptions(UK_state)
                }
            }
        }
        if (name === "state") {
            reset({ ...getValues(), "city": "" })
            setError({ state: !value ? true : false })
        }
    }
    //==================================================================


    return (
        <>
            <MainCard className="header">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Add User</h4>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <NavLink to='/'><Home className="home" fontSize="small" /></NavLink>
                        <NavLink to='/firebase/userlist'>User List</NavLink>
                        <Typography>Add User</Typography>
                    </Breadcrumbs>
                </div>
            </MainCard>
            <MainCard>
                {/* <form onSubmit={(e) => submit(e)} className="is-filled"> */}
                <form onSubmit={handleSubmit(submit)} className="is-filled">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" name="username" className="form-control" {...register('username', { required: true })} />
                            {errors.username && <p className="error">username is required</p>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" {...register('email', { required: true })} />
                            {errors.email && <p className="error">email is required</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input type="number" name="phone" className="form-control" {...register('phone', { required: true, minLength: 10, maxLength: 10 })} />
                            {errors.phone?.type === "required" && <p className="error">phone is required</p>}
                            {errors.phone?.type === "minLength" && <p className="error">Enter phone number is less then 10 number</p>}
                            {errors.phone?.type === "maxLength" && <p className="error">Enter phone number is more then 10 number</p>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">PanID</label>
                            <input type="text" name="panID" className="form-control" maxLength={10} {...register('panID', { required: true })} />
                            {errors.panID && <p className="error">panID is required</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">GST - NO.</label>
                            <input type="text" name="gstno" className="form-control" {...register('gstno', { required: true })} />
                            {errors.gstno && <p className="error">gstno is required</p>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className="form-label">Country</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select contery"
                                isClearable={true}
                                ref={ConteryRef}
                                name="contery"
                                options={[
                                    { label: "India", value: "India" },
                                    { label: "UK", value: "UK" },
                                ]}
                                value={contery}
                                onChange={(e) => handlechangeSelect("contery", e)}
                                // {...register('contery', { required: true })}
                                required
                            />
                            {/* {errors.contery && <p className="error">country is required</p>} */}
                            {error.contery ? <p style={{ color: "red" }}>contery is required</p> : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="" className="ms-0 form-label">State</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select contery"
                                isClearable={true}
                                ref={StateRef}
                                name="state"
                                // ref={StateRef}
                                options={stateOption}
                                value={state}
                                onChange={(e) => handlechangeSelect("state", e)}
                            // {...register('state', { required: true })}
                            />
                            {/* {errors.state && <p className="error">state is required</p>} */}
                            {error.state ? <p style={{ color: "red" }}>state is required</p> : ""}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="" className="ms-0 form-label">City</label>
                            <input className="form-control" type="text" name="city" {...register('city', { required: true })} />
                            {errors.city && <p className="error">city is required</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor="" className="ms-0 form-label">Address</label>
                            <textarea className="form-control" name="address" rows={4} placeholder="enter your addreass" {...register('address', { required: true })} />
                            {errors.address && <p className="error">address is required</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group input-group-outline my-3">
                                <button className="btn btn-success" onClick={() => setError({ contery: !user.contery ? true : false, state: !user.state ? true : false })} type="submit" style={{ zIndex: '0' }}>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </MainCard>
        </>
    );
};

export default AddUser;
