import {MedicalCaseItem} from "./medical-cases.ts";

function MedicalSuppliesInfo({item}: { item: MedicalCaseItem }) {
    return (
        <div>
            <p><strong>Post Type:</strong> Medical Case</p>
            <div className="row">
                <p>
                    <strong>Specialization:</strong> {item.specialization}<br/>
                    <strong>Patient Name:</strong> {item.patientName}<br/>
                    <strong>Patient Age:</strong> {item.patientAge} years<br/>
                    <strong>Patient Weight:</strong> {item.patientWeight} Kg<br/>
                    <strong>Patient Gender:</strong> {item.patientGender}<br/>
                    <strong>Case Description:</strong> {
                    item.caseDescription?.split('\n').map((line, index) => <span key={index}>{line}<br/></span>)}
                    <br/>
                </p>

            </div>
        </div>
    );
}

export default MedicalSuppliesInfo;