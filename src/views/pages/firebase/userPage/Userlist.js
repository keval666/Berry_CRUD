import CRUD from "context/CRUDcontext"
import '../style.css'
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import { NavLink, useNavigate } from 'react-router-dom';
import { VscFilePdf } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdVisibility } from "react-icons/md";
import { Breadcrumbs, Typography } from "@mui/material";
import Home from "@mui/icons-material/Home";
import { NavigateNext } from "@material-ui/icons";

// project imports
import MainCard from 'ui-component/cards/MainCard';

//Material table

import MaterialTable from 'material-table'
import { forwardRef, useState, useEffect } from 'react';

//Icon
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



// ==============================|| SAMPLE PAGE ||============================== //

const UserList = () => {
    const [tableData, setTabelData] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    // firebase context Api calling=====================

    const getApiData = async () => {
        setLoading(true)
        const data = await CRUD.getAllDataList("Userlist");
        console.log(data.docs, "+++++++++");
        setTimeout(() => {
            setTabelData(data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, index: index + 1 })))
            setLoading(false)
        }, 1000);
    }

    useEffect(() => {
        getApiData();
    }, [])

    //============================


    //Sweet Alert Function===============
    function Deletebtn(data) {
        console.log(data, "----------");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#5dcb34',
            cancelButtonText: 'No, cancel!',
            cancelButtonColor: '#d33',
            // reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                deleteRow(data)
            } else {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    };
    //======================================

    //Action Button =========================

    const deleteRow = async (e) => {
        const data = await CRUD.deleteData(e.id, "Userlist");
        getApiData();
        console.log(e);
        toast.success(`${e.username}'s Data was Deleted `);
    }

    //==================

    const handleEditUser = (data) => {
        console.log(data);
        navigate(`/firebase/userlist/editUser`,
            {
                state: {
                    data: data,
                }
            })
    }

    //==================

    const handleViewUser = (data) => {
        console.log(data);
        navigate(`/firebase/userlist/viewUser`,
            {
                state: {
                    data: data,
                }
            })
    }
    //======================================

    const columns = [
        { title: "ID", field: "index", width: "10%" },
        // { title: "User Photo", field: "image", render: item => <img src={item.image} alt="" style={{ height: '50px', borderRadius: '50%' }} /> },
        { title: "Name", field: "username" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        { title: "PAN CARD", field: "panID" },
        { title: "GST", field: "gstno" },
        // { title: "Roll", field: "roll", render: item => <span style={{ background: `${item.roll === 'user' ? "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)" : "linear-gradient(195deg, #e29035 0%, #cc942e 100%)"}`, color: 'white', padding: "3px 8px", borderRadius: '5px' }}>{item.roll}</span> }
    ]

    return (
        <>
            <MainCard className="header">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>User List</h4>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <NavLink to='/'><Home className="home" fontSize="small" /></NavLink>
                        <Typography>User List</Typography>
                    </Breadcrumbs>
                </div>
            </MainCard>
            <MainCard
            // title={<div className="User_header">User List
            //     <div>
            //         <button type="button" className="btn add_btn" style={{ marginRight: '15px' }}><SiMicrosoftexcel /> EXCEL</button>
            //         <button type="button" className="btn add_btn" style={{ marginRight: '15px' }}><VscFilePdf /> PDF</button>
            //         <NavLink to='/firebase/userlist/AddUser'><button type="button" className="btn add_btn"><AddBox /> Add</button></NavLink></div></div>}
            >
                <MaterialTable
                    title={<NavLink to='/firebase/userlist/AddUser'><button type="button" className="btn btn-primary"><AddBox /> Add New User</button></NavLink>}
                    icons={tableIcons}
                    data={tableData}
                    columns={columns}
                    isLoading={loading}
                    actions={[
                        {
                            icon: () => <MdVisibility />,
                            tooltip: "view User",
                            onClick: (event, rowData) => handleViewUser(rowData)
                        },
                        {
                            icon: () => <Edit />,
                            tooltip: "Edit User",
                            onClick: (event, rowData) => handleEditUser(rowData)
                        },
                        {
                            icon: () => <DeleteOutline />,
                            tooltip: "Delete User",
                            onClick: (e, rowData) => Deletebtn(rowData)
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1, loadingType: "linear", addRowPosition: "first", paginationType: "stepped", pageSizeOptions: [5, 10, 12], emptyRowsWhenPaging: false, exportButton: true, exportFileName: "User List", searchFieldAlignment: "right",
                    }}
                />
            </MainCard>
        </>
    )
};

export default UserList;
