import {allMedicalSupplies} from "./MedicalSupplies.ts";


function MedicalDetails(){
    const supplies = allMedicalSupplies;

    return (
        <div className= "container">
            <table className= "table table-striped">
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Use</th>
                    <th>Image</th>
                    <th>Quantity</th>


                </tr>
                </thead>
<tbody>
{supplies.map((supply) => (
    <tr key={supply.id}>
        <td>{supply.type}</td>
        <td>{supply.use}</td>
        <td><img src={supply.image} alt={supply.type} width="30" /></td>
        <td>{supply.quantity}</td>
    </tr>
))}
</tbody>
            </table>
        </div>
    )
}

export default MedicalDetails;