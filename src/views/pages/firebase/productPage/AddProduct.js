// material-ui
// import * as context from "../../../context/CRUDcontext"
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

const AddProduct = () => {

    const history = useNavigate();
    const TypeRef = useRef()
    const [hide, setHide] = useState(false);
    const [product, setProduct] = useState({
        type: "",
        sku: "",
        barcode: "",
    });

    const { type, sku, barcode } = product;

    // Form Validation===============

    const { register, handleSubmit, formState: { errors } } = useForm();

    // ==============================

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // setProduct({ ...product, [name]: value });
        setProduct((Value) => ({ ...Value, [name]: value }));
    }

    const submit = async (e) => {
        // e.preventDefault();
        if (e.name && e.stock && product.type && e.price && e.gst) {
            const data = {
                name: e.name,
                // stock: e.stock,
                stock: Number(e.stock),
                type: type.value,
                // price: e.price,
                price: Number(e.price),
                gst: e.gst,
                sku: sku,
                barcode: barcode,
            }
            history(-1);
            await CRUD.addData(data, "Productlist");
            toast.success("Product Added successfully");
            console.log(e, "e");
            console.log(data, "data");
            console.log(product, "product");
        } else if (!product.type) {
            if (TypeRef.current) {
                TypeRef.current.focus()
                setHide(true)
                toast.warn("Please Fill Out type Field");
            }
        }
        console.log(errors);
    }

    //===========================|| Select Option ||===========================

    const handlechangeSelect = (name, value) => {
        setProduct((Value) => ({ ...Value, [name]: value }));
        console.log(name, value, "+++++++++")
        console.log(product, "*********")

        if (name === "type") {
            if (!value || typeof value === "undefined" || value === null) {
                setHide(true)
            } else {
                setHide(false)
            }
        }
    }

    //==================================================================


    return (
        <>
            <MainCard className="header">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>Add Product</h4>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        <NavLink to='/'><Home className="home" fontSize="small" /></NavLink>
                        <NavLink to='/firebase/productlist'>product List</NavLink>
                        <Typography>Add product</Typography>
                    </Breadcrumbs>
                </div>
            </MainCard>
            <MainCard>
                <form onSubmit={handleSubmit(submit)} className="is-filled">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" {...register('name', { required: true })} />
                            {errors.name && <p className="error">Name is required</p>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Stock</label>
                            <input type="number" name="stock" className="form-control" {...register('stock', { required: true })} />
                            {errors.stock && <p className="error">Stock is required</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select contery"
                                isClearable={true}
                                ref={TypeRef}
                                name="type"
                                options={[
                                    { label: "gm.", value: "gm" },
                                    { label: "Pic.", value: "pic" },
                                ]}
                                value={type}
                                onChange={(e) => handlechangeSelect("type", e)}
                                required
                            />
                            {hide ? <p style={{ color: "red" }}>Type is required</p> : ""}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price</label>
                            <input type="text" name="price" className="form-control" maxLength={10} {...register('price', { required: true })} />
                            {errors.price && <p className="error">Price is required</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">GST</label>
                            <input type="text" name="gst" className="form-control" {...register('gst', { required: true })} />
                            {errors.gst && <p className="error">GST is required</p>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">SKU</label>
                            <input type="text" name="sku" value={sku} onChange={handleInputChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">Barcode</label>
                            <input type="text" name="barcode" value={barcode} onChange={handleInputChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group input-group-outline my-3">
                                <button className="btn btn-success" onClick={() => setHide(type ? false : true)} type="submit" style={{ zIndex: '0' }}>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </MainCard>
        </>
    );
};

export default AddProduct;
