// material-ui
import { AddNewUser } from 'config/config'
import { toast } from 'react-toastify';

// project imports
import { useState } from 'react';
import { useNavigate } from 'react-router';
import MainCard from 'ui-component/cards/MainCard';
import './style.css'

// ==============================|| SAMPLE PAGE ||============================== //

const AddUser = () => {

    const history = useNavigate();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        image: "",
        roll: ""
    });

    const { username, email, phone, image, roll } = user;
    function handleOnChange(e) {
        const { name, value } = e.target;
        // setUser((Value) => ({ ...Value, [name]: value }));
        setUser({ ...user, [name]: value });
        console.log(user);
    }

    const submit = (e) => {
        e.preventDefault();
        AddNewUser(user);
        toast.success("User Added successfully");
        history(-1);
    }

    return (
        <MainCard title="Edit User Page">
            <form onSubmit={(e) => submit(e)} className="is-filled">
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <div>
                            <input type="text" name="username" className="form-control" value={username} onChange={handleOnChange} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" value={email} onChange={handleOnChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input type="number" name="phone" className="form-control" maxLength={10} pattern="[0-9]{10}" value={phone} onChange={handleOnChange} required />
                    </div>
                    <div className="col-md-6">
                        <div className="input-group input-group-outline">
                            <label htmlFor="" className="ms-0 ">Profile Picture</label>
                            <input type="text" name="image" value={image} onChange={handleOnChange} accept="image/jpeg, image/png, image/jpg, image/gif, image/svg" style={{ marginTop: "25px", marginLeft: "-90px" }} className="form-control" id="image" />
                            <img style={{ height: '62px' }} src={image} alt="not found" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="" className="ms-0">Roll</label>
                        <select className="form-select" name='roll' value={roll} onChange={handleOnChange}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
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
    );
};

export default AddUser;



// const array1 = [{id:1 , name : "abds"}, {id:2 , name : "abds"}, {id:3 , name : "abds"}]

// const getIndex = array1.findIndex((x)=> x.id == 2);

// array1[getIndex].name = "vijay";

// console.log(array1);
// console.log(getIndex);
