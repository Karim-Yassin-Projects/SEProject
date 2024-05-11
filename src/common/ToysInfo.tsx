import {ToysItem} from "./toys.ts";

function ToysInfo({item}: { item: ToysItem }) {
    return (
        <div>
            <p><strong>Post Type:</strong> Toys</p>
            <div className="row">
                <p className="col-md-6">
                    <strong>Category:</strong> {item.category}<br/>
                    <strong>Age Range:</strong> {item.ageRange}<br/>
                    <strong>Type:</strong> {item.toyType}<br/>
                    <strong>Suitable For:</strong> {item.toyGender}<br/>
                    <strong>Quantity:</strong> {item.quantity}<br/>
                </p>
                <div className="col-md-6">
                    <img src={item.document} width={150} title={item.category} alt={item.category}/>
                </div>
            </div>
        </div>
    );
}

export default ToysInfo;