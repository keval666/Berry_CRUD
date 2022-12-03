import { UserData, deleteRow } from 'config/config'
import { toast } from 'react-toastify';
import './style.css'
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { VscFilePdf } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";

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

    //Api calling=====================
    const getApiData = () => {
        UserData().then((res) => {
            console.log(res, "res");
            setTabelData(res);
        }).catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            getApiData();
        }, 100)
        // getApiData();
    }, [])
    //============================


    //Sweet Alert Function===============
    function Deletebtn(data) {
        console.log(data, "++++++++");
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
                deleteData(data)
                // handleDelete(data)  // Delete localy function
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

    //=================
    const deleteData = async (e) => {
        console.log(e);
        deleteRow(e)
        toast.success(`${e.username}'s Data Delete successfully`);
        setTimeout(() => {
            getApiData();
        }, 100)

    }

    //  ==||==

    const handleDelete = (deleteData) => {      // This Function call For localy Delete
        let oldData = tableData;
        let filterData = oldData.filter((x) => x.id !== deleteData.id);
        setTabelData([]);
        setTabelData(filterData);
        // setTabelData(tableData.filter((x) => x.id !== deleteData.id)); //Simple way to delete in one line for localy
    }
    //==================

    const handleEditUser = (data) => {
        navigate(`/pages/userlist/editUser`,
            {
                state: {
                    data: data,
                }
            })
    }
    //======================================

    const columns = [
        { title: "ID", field: "id", width: "10%" },
        { title: "User Photo", field: "image", render: item => <img src={item.image} alt="" style={{ height: '50px', borderRadius: '50%' }} /> },
        { title: "User Name", field: "username" },
        { title: "Roll", field: "roll", render: item => <span style={{ background: `${item.roll === 'user' ? "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)" : "linear-gradient(195deg, #e29035 0%, #cc942e 100%)"}`, color: 'white', padding: "3px 8px", borderRadius: '5px' }}>{item.roll}</span> }
    ]

    return (
        <MainCard title={<div className="User_header">User List Page
            <div>
                <button type="button" className="btn add_btn" style={{ marginRight: '15px' }}><SiMicrosoftexcel /> EXCEL</button>
                <button type="button" className="btn add_btn"><VscFilePdf /> PDF</button>
            </div>
            <NavLink to='/pages/userlist/AddUser'><button type="button" className="btn add_btn"><AddBox /> Add</button></NavLink></div>}>
            <MaterialTable
                title={<>User List</>}
                icons={tableIcons}
                data={tableData}
                columns={columns}
                actions={[
                    {
                        icon: () => <Edit />,
                        tooltip: "Edit User",
                        onClick: (event, rowData) => handleEditUser(rowData)
                    },
                    {
                        icon: () => <DeleteOutline />,
                        tooltip: "Delete User",
                        onClick: (e, rowData) => Deletebtn(rowData)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1, addRowPosition: "first", paginationType: "stepped", pageSizeOptions: [5, 10, 12], emptyRowsWhenPaging: false,
                }}
            />
        </MainCard>
    )
};

export default UserList;
