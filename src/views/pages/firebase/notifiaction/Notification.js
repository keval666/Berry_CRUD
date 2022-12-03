import { UserList } from 'config/config'
import '../style.css'
import Swal from 'sweetalert2';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import Modal from 'react-modal';

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
import { Button } from '@mui/material';

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

//modal stayle=======
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
    },
};
//=====================

// ==============================|| Notification PAGE ||============================== //

const SamplePage = () => {
    const [tableData, setTabelData] = useState([]);
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement('#root');

    //Api calling=====================
    // const getApiData = () => {
    //     UserList().then((res) => {
    //         console.log(res, "res");
    //         setTabelData(res);
    //     }).catch((error) => {
    //         alert(error)
    //     })
    // }

    // useEffect(() => {
    //     getApiData();
    // }, [])
    //============================


    //Sweet Alert Function===============
    function Deletebtn(data, e) {
        console.log(e, "++++++++", data);
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
                handleDelete(data)
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

    const handleDelete = (deleteData) => {
        let oldData = tableData;
        let filterData = oldData.filter((x) => x.id !== deleteData.id);
        setTabelData([]);
        setTabelData(filterData);
        // setTabelData(tableData.filter((x) => x.id !== deleteData.id)); //Simple way to delete
    }

    const handleEditUser = (data) => {
        navigate(`/pages/userlist/editUser`,
            {
                state: {
                    data: data,
                    tableData: tableData,
                }
            })
    }
    //Modal Function===================
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    //==============================

    const columns = [
        { title: "ID", field: "id", width: "10%" },
        { title: "User Photo", field: "avatar_url", render: item => <img src={item.avatar_url} alt="" style={{ height: '50px', borderRadius: '50%' }} /> },
        { title: "User Name", field: "login" },
        { title: "Role", field: "type", render: item => <span style={{ backgroundImage: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)", color: 'white', padding: "3px 8px", borderRadius: '5px' }}>{item.type}</span> }
    ]

    return (
        <MainCard title={<div className="User_header">User List Page <button type="button" className="btn notiBtn" onClick={openModal}><FaPaperPlane /> Notification Send</button></div>}>
            <MaterialTable
                title={<>User List</>}
                icons={tableIcons}
                data={tableData}
                columns={columns}
                // editable={{
                //     onRowAdd: (newRow) => new Promise((resolve, reject) => {
                //         const updatedRows = [...tableData, { id: Math.floor(Math.random() * 100), ...newRow }]
                //         setTimeout(() => {
                //             setTabelData(updatedRows)
                //             resolve()
                //         }, 2000)
                //     }),
                //     onRowDelete: selectedRow => new Promise((resolve, reject) => {
                //         const index = selectedRow.tableData.id;
                //         const updatedRows = [...tableData]
                //         updatedRows.splice(index, 1)
                //         setTimeout(() => {
                //             setTabelData(updatedRows)
                //             resolve()
                //         }, 2000)
                //     }),
                //     onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => {
                //         const index = oldRow.tableData.id;
                //         const updatedRows = [...tableData]
                //         updatedRows[index] = updatedRow
                //         setTimeout(() => {
                //             setTabelData(updatedRows)
                //             resolve()
                //         }, 2000)
                //     })
                // }}
                actions={[
                    {
                        icon: () => <Edit />,
                        tooltip: "Edit User",
                        onClick: (event, rowData) => handleEditUser(rowData)
                    },
                    {
                        icon: () => <DeleteOutline />,
                        tooltip: "Delet User",
                        // onClick: (event, tableData) => alert("You Delete ID" + tableData.id)
                        onClick: (e, rowData) => Deletebtn(rowData)
                    }
                ]}
                // components={{                             //For css
                //     Action: (props) => (
                //         <button
                //             onClick={(event) => props.action.onClick(event, props.data)}
                //             color="primary"
                //             variant="text"
                //             style={{ textTransform: "none" }}
                //             size="small"
                //         >
                //             Save
                //         </button>
                //     )
                // }}
                options={{
                    actionsColumnIndex: -1, addRowPosition: "first", paginationType: "stepped", pageSizeOptions: [5, 10, 12], emptyRowsWhenPaging: false,
                }}

            />
            {/* ====================||Modal Start||==================== */}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal fade show" style={{ display: 'block', paddingLeft: '0px' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <form className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-weight-normal" id="sendNotificationModalLabel">Send Notification</h5>
                                <button onClick={closeModal} type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body is-filled">
                                <input type="hidden" name="_token" value="1dwPMyJ3MCKIcD6XBo6vezDdghpVOl4P2Eff4mv3" />
                                <div className="input-group input-group-outline my-3">
                                    <input type="text" name="title" placeholder="Title" className="form-control" required />
                                </div>
                                <div className="input-group input-group-outline my-3">
                                    <textarea className="form-control" name="message" placeholder="Message" rows="3" spellCheck="false" required></textarea>
                                </div>
                                <div className="input-group input-group-outline my-3">
                                    <label htmlFor="exampleFormControlSelect1" className="ms-0">User Type</label>
                                    <select className="form-control" name="usertype" id="exampleFormControlSelect1" style={{ marginTop: '25px', marginLeft: '-60px' }}>
                                        <option value="">All User</option>
                                        <option value="1">android</option>
                                        <option value="2">ios</option>
                                    </select>
                                </div>
                                <div className="input-group input-group-outline my-3">
                                    <label htmlFor="image" className="ms-0 ">Image</label>
                                    <input type="file" name="image" accept="image/jpeg, image/png, image/jpg, image/gif, image/svg" style={{ marginTop: '25px', marginLeft: '-40px' }} className="form-control" id="image" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn bg-secondary" onClick={closeModal}>Close</button>
                                <button type="submit" className="btn bg-success">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
            {/* ========================================================== */}
        </MainCard>
    )
};

export default SamplePage;
