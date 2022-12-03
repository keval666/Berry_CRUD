// material-ui

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <MainCard title="Sample Card">
        <form action="" className="is-filled">
            <div className="col-md-6">
                <label htmlFor="" className="form-label">FCMtoken</label>
                <div>
                    <input className="form-control" name='token' type="text" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="input-group input-group-outline my-3">
                        <button className="btn btn-success" type="submit">Save</button>
                    </div>
                </div>
            </div>
        </form>
    </MainCard>
);

export default SamplePage;