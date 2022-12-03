// material-ui
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


// project imports
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import '../style.css'
import { Breadcrumbs, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import { NavigateNext } from "@material-ui/icons";

// ==============================|| SAMPLE PAGE ||============================== //

const EditUser = () => {

    const navigate = useNavigate();
    const Location = useLocation();
    const editData = Location && Location.state && Location.state.data ? Location.state.data : null;

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
                phone: editData.phone,
                panID: editData.panID,
                gstno: editData.gstno,
                contery: editData.contery,
                state: editData.state,
                city: editData.city,
                address: editData.address,
            }));
        }
    }, [])

    const { username, email, phone, panID, gstno, contery, state, city, address } = user;
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleEditUser = () => {
        // console.log(data);
        navigate(`/firebase/userlist/editUser`,
            {
                state: {
                    data: user,
                }
            })
    }

    return (
        <>
            <MainCard className="header">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>View User</h4>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <NavLink to='/'><Home className="home" fontSize="small" /></NavLink>
                        <NavLink to='/firebase/userlist'>User List</NavLink>
                        <Typography>View User</Typography>
                    </Breadcrumbs>
                </div>
            </MainCard>
            <MainCard className='user_view'>
                <div className="card-body">
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="User info" value="1" />
                                    <Tab label="Personal info" value="2" />
                                    <Tab label="Location" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {username}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {phone}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">PAN CARD</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {panID}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">GST</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {gstno}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Countery</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {contery}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">State</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {state}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">City</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {city}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {address}
                                    </div>
                                </div>
                                <hr />
                            </TabPanel>
                            <TabPanel value="2">
                                <table className="table table-bordered text-center">
                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">PAN CARD</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{username}</td>
                                            <td>{email}</td>
                                            <td>{phone}</td>
                                            <td>{panID}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table table-bordered text-center">
                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col">GST</th>
                                            <th scope="col">Countery</th>
                                            <th scope="col">State</th>
                                            <th scope="col">City</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{gstno}</td>
                                            <td>{contery}</td>
                                            <td>{state}</td>
                                            <td>{city}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="table table-bordered text-center">
                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col">Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </TabPanel>
                            <TabPanel value="3">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Countery</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {contery}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">State</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {state}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">City</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {city}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {address}
                                    </div>
                                </div>
                                <hr />
                            </TabPanel>
                        </TabContext>
                    </Box>
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="btn btn-success" onClick={() => handleEditUser()}>Edit</button>
                        </div>
                    </div>
                </div>
            </MainCard>
        </>
    );
};

export default EditUser;