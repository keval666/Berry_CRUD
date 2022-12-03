// material-ui
import React, { useEffect, useState } from 'react';
import { UserData } from 'config/config'
import './style.css'
import { BsFillEyeFill, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

// project imports
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { NavLink } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const [tableData, setTabelData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
        getApiData();
    }, [])
    //============================

    return (
        <MainCard title="Sample Card">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User Photo</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Roll</TableCell>
                            <TableCell style={{ width: '15%' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((res) => (
                                <TableRow key={res.id} sx={{ '&:last-child tf,&:last-child th': { border: 0 } }}>
                                    <TableCell>{res.id}</TableCell>
                                    <TableCell><img src={res.avatar_url} alt="" style={{ height: '50px', borderRadius: '50%' }} /></TableCell>
                                    <TableCell>{res.login}</TableCell>
                                    <TableCell><span style={{ backgroundImage: "linear-gradient(195deg, #66BB6A 0%, #43A047 100%)", color: 'white', padding: "3px 8px", borderRadius: '5px' }}>{res.type}</span></TableCell>
                                    <TableCell>
                                        <NavLink to={'/pages/productlist/view'} style={{ margin: '0px 5px' }}><BsFillEyeFill color='#616161' size={20} /></NavLink>
                                        <NavLink to={'/pages/productlist/edit'}><BsFillPencilFill style={{ margin: '0px 5px' }} color='#616161' size={20} /></NavLink>
                                        <NavLink to={'/pages/productlist/remove'}><BsFillTrashFill style={{ margin: '0px 5px' }} color='#616161' size={20} /></NavLink>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 17]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </MainCard>
    )
};

export default SamplePage;