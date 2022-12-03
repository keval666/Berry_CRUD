// material-ui
import CRUD from "context/CRUDcontext"
import '../style.css'
import "./search.scss"
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, List, ListItemButton } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { ScaleLoader } from "react-spinners";
import AddModal from "./modal/AddModal";
import AddBagModal from "./modal/AddBagModal";
import EditTableModal from "./modal/EditTableModal";
import TaxModal from "./modal/TaxModal";


// project imports
import MainCard from 'ui-component/cards/MainCard';
import MaterialTable from 'material-table';
import { forwardRef, useState, useEffect } from 'react';
import Select from "react-select";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

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

// ==============================|| POS PAGE ||============================== //



const Pos = () => {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [submitloading2, setSubmitloading2] = useState(false);

    const [tableData, setTabelData] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [filterList, setFilterList] = useState([]);

    const [userData, setUserData] = useState([]);
    const [selectData, setSelectData] = useState({
        user: null,
        tax: { label: "GST", value: "gst" }
    });
    const [updateSelect, setUpdateSelect] = useState({
        user: null,
        tax: { label: "GST", value: "gst" },
    })

    const [tax, setTax] = useState(18)

    const [openAddModal, setOpenAddModal] = useState(false);
    const [listRowData, setListRowData] = useState(null);

    const [openBagModal, setOpenBagModal] = useState(false);
    const [BagModalData, setBagModalData] = useState(null);

    const [openTableModal, setOpenTableModal] = useState(false);
    const [tableModalData, setTableModalData] = useState(null);

    const [openTaxModal, setOpenTaxModal] = useState(false);
    const [taxModalData, setTaxModalData] = useState(null);

    const [newtableData, setNewTabelData] = useState([]);

    // Api calling=====================

    const getApiData = async () => {
        setLoading(true)
        const data = await CRUD.getAllDataList("Productlist");
        const User_data = await CRUD.getAllDataList("Userlist");
        console.log(data.docs, "Product Api_Data");
        console.log(User_data.docs, "User_data Api_Data");
        setTimeout(() => {
            setTabelData(data.docs.map((doc) => ({ ...doc.data() })))
            setFilterList(data.docs.map((doc) => ({ ...doc.data() })))
            setUserData(User_data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id })))
            setLoading(false)
        }, 1000);
    }

    useEffect(() => {
        getApiData();
    }, [])

    // LocalStorage data get ===========

    useEffect(() => {
        var local_table = JSON.parse(localStorage.getItem('newtableData'))
        var local_user = JSON.parse(localStorage.getItem('updateSelect'))
        console.log(local_table, "local_table")
        console.log(local_user, "local_user")
        if (local_table) {
            setNewTabelData(local_table);
        }
        if (local_user) {
            setSelectData(local_user)
            setUpdateSelect(local_user)
        }
    }, []);

    useEffect(() => {
        if (updateSelect.user && updateSelect.tax) {
            localStorage.setItem('updateSelect', JSON.stringify(updateSelect));
        }
    }, [updateSelect])

    //============================

    // Select Handling =========

    const handlechangeSelect = (name, value) => {
        setSelectData((Value) => ({ ...Value, [name]: value }));
        console.log(name, value, "++++++++")
        console.log(selectData, "*********")
    }

    // const getUserData = async (val) => {
    //     var firebase_Data = await CRUD.getAllDataList("Invoice");
    //     var all_Data = firebase_Data.docs.map((doc, index) => ({ ...doc.data() }))
    //     var selected_user_data = all_Data.filter((ab) => ab.id == val.id)
    //     if (selected_user_data.length > 0) {
    //         setLoading2(true)
    //         console.log(selected_user_data[0].tableData)
    //         setNewTabelData([])
    //         setTimeout(() => {
    //             setNewTabelData(selected_user_data[0].tableData)
    //             setLoading2(false)
    //         }, 1000);
    //     } else {
    //         toast.success("New User");
    //     }
    // }

    const handleupdateSelectbtn = () => {
        if (selectData.user) {
            setUpdateSelect(selectData);
            // getUserData(selectData.user)
        } else {
            toast.warn("Please Fill Out User Field");
        }
    }

    // ==========================

    // Table data ==============

    const BagcellRender = (props) => {
        return (
            <div onClick={() => handleBagModal(props)} style={{ cursor: "pointer" }}>
                {props.bags && props.bags.length > 0 ? props.bags.map((data, i) => {
                    //console.log(props, "props");
                    return (
                        <div key={i}>{data.bag} X {data.wht} = {data.total} gm</div>
                    )
                }) : "Add Bag +"}
            </div>
        )
    }

    const columns = [
        { title: "Particulars", field: "name", editable: 'never', },
        { title: "Weight", field: "Weight", render: item => <span>{item.Weight} gm</span>, },
        { title: "Bags", editable: 'never', render: BagcellRender },
        { title: "Bag Wht", field: "Bag_Wht", editable: 'never', render: item => <span>{`${item && item.Bag_Wht ? `${item.Bag_Wht} gm` : "0 gm"}`} </span>, },
        { title: "Net", field: "Net", editable: 'never', render: item => <span>{`${item && item.Net ? `${item.Net} gm` : "0 gm"}`}</span>, },
        { title: "T & W", field: "TNW", editable: 'never', render: item => <span>{item.Touch} + {item.Touch_w} = {item.TNW}</span> },
        { title: "Fine", field: "Fine", editable: 'never', render: item => <span>{item.Fine} gm</span>, },
        { title: "Qty", field: "Qty", render: item => <span>{item.Qty} {item.type}</span>, },
        { title: "price", field: "price", editable: 'never', render: item => <span>{item.price} ₹</span>, },
        { title: "Total Amount", field: "Amount", editable: 'never', render: item => <span>{item.Amount} ₹</span>, },
    ];

    // =========================

    // ADD Data Modal ================

    const handleAddModal = (data) => {
        setOpenAddModal(!openAddModal)
        setListRowData(data)
        console.log(data, "oldTable")
    }

    const addItem = (newObj) => {
        setLoading2(true)
        console.log(newObj, "newObj++");
        newObj.TNW = newObj.Touch + newObj.Touch_w;
        newObj.Fine = newObj.TNW * newObj.Net / 100;
        setTimeout(() => {
            newtableData.push(newObj);
            localStorage.setItem('newtableData', JSON.stringify(newtableData));
            setLoading2(false)
        }, 1000);
        setOpenAddModal(!openAddModal)
    }

    // ===============================

    // ADD Bags Modal ================

    const handleBagModal = (data) => {
        setOpenBagModal(!openBagModal)
        setBagModalData(data !== undefined ? JSON.parse(JSON.stringify(data)) : null);
        console.log(data, "setBagModalData")
    }

    const Bag_Wht_toals = (items) => {
        let Bag_Wht_tot = 0;
        if (items.bags && items.bags.length > 0) {
            items.bags.forEach((el) => {
                return Bag_Wht_tot = Bag_Wht_tot + el.total
            })
        }
        return Bag_Wht_tot;
    }

    const addBag = (newObj) => {
        setLoading2(true)
        console.log(newObj, "newObj on save click");
        const dataUpdate = [...newtableData];
        const index = newObj.tableData.id;
        dataUpdate[index] = newObj;
        dataUpdate[index].Bag_Wht = Bag_Wht_toals(newObj);
        dataUpdate[index].Net = dataUpdate[index].Weight - dataUpdate[index].Bag_Wht;
        dataUpdate[index].Fine = dataUpdate[index].TNW * dataUpdate[index].Net / 100;
        setTimeout(() => {
            setNewTabelData([...dataUpdate]);
            setLoading2(false)
        }, 1000);
        setOpenBagModal(!openBagModal)
    }

    // ===============================

    // Edit Table Modal ==============

    const handleEditTableModal = (data) => {
        setOpenTableModal(!openTableModal)
        setTableModalData(data);
        console.log(data, "setTableModalData")
    }

    const EditItem = (newObj) => {
        setLoading2(true)
        console.log(newObj, "newObj on save click");
        const dataUpdate = [...newtableData];
        const index = newObj.tableData.id;
        newObj.TNW = newObj.Touch + newObj.Touch_w;
        newObj.Fine = newObj.TNW * newObj.Net / 100;
        dataUpdate[index] = newObj;
        setTimeout(() => {
            setNewTabelData([...dataUpdate]);
            setLoading2(false)
        }, 1000);
        setOpenTableModal(!openTableModal)
    }

    // ===============================

    // Tax Modal =====================

    const handleTaxModal = (data) => {
        console.log(data, "Tax type")
        setOpenTaxModal(!openTaxModal)
        setTaxModalData({
            tax: tax,
            type: data
        })
    }

    const EditTax = (newObj) => {
        console.log(newObj, "newObj on edit tax click");
        setTax(newObj);
        setOpenTaxModal(!openTaxModal);
    }

    // ===============================

    // Search ==================

    const onChangeSearchVal0 = (val) => {
        setSearchValue(val);
    }

    const onChangeSearchVal = (val) => {
        console.log(val);
        setSearchValue(val)
        if (val && val.length > 0) {
            if (tableData.length > 0) {
                const filteredData = tableData.filter((data) => {
                    return Object.values(data.name).join("").toLowerCase().includes(searchValue.toLowerCase());
                });
                setFilterList([]);
                setFilterList(filteredData);
            }
        } else {
            setFilterList(tableData);
        }
    };

    // ========================

    // Total ======================

    var total_Fine = 0;
    if (newtableData && newtableData.length > 0) {
        newtableData.map((item, index) => {
            var fine = total_Fine + item.Fine
            var fine_N = fine.toFixed(2)
            return (
                total_Fine = Number(fine_N)
                // total_Fine = total_Fine + item.Fine
            )
        })
    }

    var total_amount = 0;
    if (newtableData && newtableData.length > 0) {
        newtableData.map((item, index) => {
            return (
                total_amount = total_amount + item.Amount
            )
        })
    }

    var closing_Fine = 0;
    if (updateSelect.user && updateSelect.user.openingFine) {
        console.log("++++++++++");
        closing_Fine = updateSelect.user.openingFine + total_Fine;
    } else {
        closing_Fine = total_Fine;
    }

    var closing_amount = 0;
    if (updateSelect.user && updateSelect.user.openingRs) {
        closing_amount = updateSelect.user.openingRs + total_amount;
    } else {
        closing_amount = total_amount;
    }

    var estimate = 0
    var tax_amount = total_amount * tax / 100;

    var total_tax_amount = tax_amount;
    if (updateSelect.tax.value === "gst") {
        if (updateSelect.user && updateSelect.user.state === "Gujarat") {
            total_tax_amount = tax_amount + tax_amount;
        }
    } else {
        estimate = 0;
    }

    var final_amount = total_amount + total_tax_amount;

    // ============================

    const clearPage = () => {
        setUpdateSelect({
            user: null,
            tax: { label: "GST", value: "gst" },
        });
        setSelectData({
            user: null,
            tax: { label: "GST", value: "gst" },
        });
        setNewTabelData([])
    }

    // clear local storage on tab close
    window.onbeforeunload = function () {
        localStorage.clear();
    }

    // Submit Button ==============

    const handleonSubmit = async () => {
        if (newtableData.length > 0 && final_amount > 0) {
            if (updateSelect.user) {
                setSubmitloading2(true)
                const olduserdata = updateSelect.user
                const data = {
                    ...olduserdata,
                    tableData: newtableData,
                    finalAmount: final_amount,
                    finalFine: closing_Fine
                }
                await CRUD.addData(data, "Invoice");
                console.log(data)
                toast.success("Invoice Added successfully");
                clearPage();
                setSubmitloading2(false)
                localStorage.removeItem('newtableData');
                localStorage.removeItem('updateSelect');
            } else {
                toast.warn("Please Select User");
            }
        } else {
            toast.warn("Please Buy Some Product");
        }
    }

    // ============================

    return (
        <div className="POS_main">
            {openAddModal && <AddModal openAddModal={openAddModal} listRowData={listRowData} addItem={addItem} handleAddModal={handleAddModal} />}
            {openBagModal && <AddBagModal openBagModal={openBagModal} BagModalData={BagModalData} addBag={addBag} handleBagModal={handleBagModal} />}
            {openTableModal && <EditTableModal openTableModal={openTableModal} tableModalData={tableModalData} EditItem={EditItem} handleEditTableModal={handleEditTableModal} />}
            {openTaxModal && <TaxModal openTaxModal={openTaxModal} handleTaxModal={handleTaxModal} taxModalData={taxModalData} EditTax={EditTax} />}
            <MainCard >
                <div className="POS_content">
                    <div className="col-3 pos_left">
                        <div className="pos_list ">
                            <fieldset className="field-container">
                                <input type="text" placeholder="Search..." className="field" onKeyUp={(e) => onChangeSearchVal(e.target.value)} onChange={(e) => onChangeSearchVal0(e.target.value)} value={searchValue} />
                                <div className="icons-container">
                                    <div className="icon-search"></div>
                                    <div className="icon-close" onClick={() => onChangeSearchVal("")}>
                                        <div className="x-up"></div>
                                        <div className="x-down"></div>
                                    </div>
                                </div>
                            </fieldset>
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflow: 'auto',
                                    // maxHeight: 300,
                                    '& ul': { padding: 0 },
                                }}>
                                {loading ? <ScaleLoader color="#fff" cssOverride={{ textAlign: "center" }} /> :
                                    <div className="list">
                                        {filterList && filterList.length > 0 ?
                                            filterList.map((item, i) => (
                                                <ListItemButton key={i + 1} className="list_button" onClick={() => handleAddModal(item)}>
                                                    <ListItem
                                                        secondaryAction={
                                                            <IconButton edge="end" title="add">
                                                                <AddIcon />
                                                            </IconButton>
                                                        }>
                                                        <ListItemText primary={item.name} />
                                                    </ListItem>
                                                </ListItemButton>
                                            )) : <p>Data Not Found</p>}
                                    </div>}
                            </List>
                        </div>
                        <div className="container" style={{ paddingBottom: "10px" }}>
                            <div className="pos_list_bottom">
                                <Select
                                    className="user_select"
                                    classNamePrefix="user"
                                    isClearable={true}
                                    menuPlacement="top"
                                    name="user"
                                    maxMenuHeight={"200px"}
                                    placeholder={'Select User Name Hear ...'}
                                    isLoading={loading}
                                    options={userData}
                                    getOptionLabel={(option) => `${option.username}`}
                                    getOptionValue={(option) => option}
                                    value={selectData.user}
                                    onChange={(e) => handlechangeSelect("user", e)}
                                />
                                <Select
                                    className="tax_type_select"
                                    classNamePrefix="type"
                                    // isClearable={true}
                                    menuPlacement="top"
                                    name="tax"
                                    placeholder={'Select tax Form Hear ...'}
                                    options={[
                                        { label: "GST", value: "gst" },
                                        { label: "Estimate", value: "estimate" },
                                    ]}
                                    value={selectData.tax}
                                    onChange={(e) => handlechangeSelect("tax", e)}
                                />
                                <div className="d-flex justify-content-center">
                                    <Button variant="contained" style={{ backgroundColor: "#198754" }} onClick={() => handleupdateSelectbtn()}>Update</Button>
                                    {/* <Button variant="contained" style={{ backgroundColor: "#198754" }} onClick={() => console.log(newtableData)}>Testing</Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 pos_right">
                        <div className="table_pos">
                            <MaterialTable
                                title={<h4>ADD</h4>}
                                icons={tableIcons}
                                data={newtableData}
                                columns={columns}
                                isLoading={loading2}
                                actions={[
                                    {
                                        icon: () => <Edit />,
                                        tooltip: "Edit Product",
                                        onClick: (event, rowData) => handleEditTableModal(rowData)
                                    },
                                ]}
                                editable={{
                                    onRowDelete: oldData =>
                                        new Promise((resolve) => {
                                            setTimeout(() => {
                                                const dataDelete = [...newtableData];
                                                const index = oldData.tableData.id;
                                                dataDelete.splice(index, 1);
                                                setNewTabelData([...dataDelete]);
                                                resolve()
                                            }, 1000)
                                        }),
                                }}
                                options={{
                                    actionsColumnIndex: -1, loadingType: "linear", addRowPosition: "first", maxBodyHeight: "70vh", paginationType: "stepped", pageSizeOptions: [5, 10, 12], emptyRowsWhenPaging: false, toolbar: false, paging: false, sorting: false, draggable: false, searchFieldAlignment: "right",
                                }}
                            />
                            <div className="bottom_table">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>{total_Fine}</td>
                                            <td></td>
                                            <td>Total</td>
                                            <td>Total: {total_amount} ₹</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="container" style={{ paddingTop: "5px", borderTop: '1px solid' }}>
                            <div className="row">
                                <div className="container col-8 d-flex" style={{ gap: "5px", marginBottom: ".5rem" }}>
                                    <div className=" col-6 d-flex">
                                        <div className="col-6 boxes">
                                            <p>Opening Fine:- <span style={{ float: "right" }}>{updateSelect.user && updateSelect.user.openingFine ? updateSelect.user.openingFine : 0}</span></p>
                                            <p>Opening Rs. :- <span style={{ float: "right" }}>{updateSelect.user && updateSelect.user.openingRs ? updateSelect.user.openingRs : 0}</span></p>
                                        </div>
                                        {/* <div className="col-6 boxes br" onClick={() => handleTaxModal()}> */}
                                        {updateSelect.tax.value === "gst" ?
                                            <>
                                                {updateSelect.user && updateSelect.user.state === "Gujarat" ?
                                                    <div className="col-6 boxes br" onClick={() => handleTaxModal("2")} style={{ cursor: "pointer" }}>
                                                        <p>GST {tax}%:- <span style={{ float: "right" }}>{tax_amount}</span></p>
                                                        <p>GST {tax}%:- <span style={{ float: "right" }}>{tax_amount}</span></p>
                                                    </div>
                                                    :
                                                    <div className="col-6 boxes br" onClick={() => handleTaxModal("1")} style={{ cursor: "pointer" }}>
                                                        <p>GST {tax}%:- <span style={{ float: "right" }}>{tax_amount}</span></p>
                                                    </div>
                                                }
                                            </>
                                            :
                                            <div className="col-6 boxes br">
                                                <p>Estimate:- <span style={{ float: "right" }}>{estimate}</span></p>
                                            </div>
                                        }
                                        {/* </div> */}
                                    </div>
                                    <div className="col-6 d-flex">
                                        <div className="col-6 boxes">
                                            <div>Current Fine:- <span style={{ float: "right" }}>{total_Fine}</span></div>
                                            <div>Current Rs. :- <span style={{ float: "right" }}>{total_amount}</span></div>
                                        </div>
                                        <div className="col-6 boxes br">
                                            <div>Closing Fine:- <span style={{ float: "right" }}>{closing_Fine}</span></div>
                                            <div>Closing Rs. :- <span style={{ float: "right" }}>{closing_amount}</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container col-4 d-flex justify-content-between">
                                    <div>
                                        <h6>Sub Total</h6>
                                        <p>TAX</p>
                                        <h4>TOTAL</h4>
                                    </div>
                                    <div className="text-end">
                                        <h6>{total_amount}₹</h6>
                                        <p>{total_tax_amount}₹</p>
                                        <h4>{final_amount}₹</h4>
                                    </div>
                                </div>
                                <div className="col-4 offset-8 text-center" style={{ marginBottom: ".5rem" }}>
                                    <LoadingButton endIcon={<SendIcon />} loading={submitloading2} loadingPosition="end" variant="contained" style={{ backgroundColor: "#198754" }} onClick={() => handleonSubmit()}>Submit</LoadingButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    )
};

export default Pos;
