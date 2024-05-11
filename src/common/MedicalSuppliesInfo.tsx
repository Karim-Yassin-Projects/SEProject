import {MedicalSuppliesItem} from "./medical-supplies.ts";

function MedicalSuppliesInfo({item}: { item: MedicalSuppliesItem }) {
    return (
        <div>
            <p><strong>Post Type:</strong> Medical Supplies</p>
            <div className="row">
                <p className="col-md-6">
                    <strong>Category:</strong> {item.category}<br/>
                    <strong>Quantity:</strong> {item.quantity}<br/>
                    <strong>Use:</strong> {item.use}<br/>
                    {item.medicationType && <><strong>Medication Type:</strong> {item.medicationType}</>}
                    {item.deviceType && <><strong>Device Type:</strong> {item.deviceType}</>}
                    {item.equipmentType && <><strong>Equipment Type:</strong> {item.equipmentType}</>}
                </p>
                <div className="col-md-6">
                    <img src={item.document} width={150} title={item.category} alt={item.category}/>
                </div>
            </div>
        </div>
    );
}

export default MedicalSuppliesInfo;