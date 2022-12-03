// material-ui

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { Button } from '@mui/material';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="Sample Card">
        <div className="row product-details-row card">
            <div className="col-md-6">
                <div className="product_images">
                    <img onClick=
                        {(e) => e.preventDefault()}
                        showRotate={true}
                        alt={"12"}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <div className="product-details-cnt">
                    <h2>--</h2>
                    <h3>Price: <b> Rs/</b><span>1-Qty</span></h3>
                    <div className="product-btn">
                        <Button />
                    </div>
                </div>
                <div className="row producd_details_content">
                    <div className="col-4">
                        <div className='truncate-product'>
                            <p className="text-truncate">HSN</p>
                            <h5 className="text-truncate">-</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div>
                            <p className="text-truncate">Package</p>
                            <h5 className="text-truncate" >-</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div>
                            <p className="text-truncate">manufacturing</p>
                            <h5 className="text-truncate" >-</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div>
                            <p className="text-truncate">MRP</p>
                            <h5 className="text-truncate" >-</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div>
                            <p className="text-truncate">GST</p>
                            <h5 className='text-truncate'>%</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className='truncate-product'>
                            <p className="text-truncate">batch</p>
                            <h5 className="text-truncate" >-</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div>
                            <p className="text-truncate">exp.Date</p>
                            <h5 className="text-truncate" >-</h5>
                        </div>
                    </div>
                    <div className="col-4">
                        <div>
                            <p className="text-truncate">FQ</p>
                            <h5 className="text-truncate" >-</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainCard>
);

export default SamplePage;
