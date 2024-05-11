import {BloodDonationItem} from "./blood-donations.ts";

function BloodDonationInfo({item}: { item: BloodDonationItem }) {
    return (
        <div>
            <p><strong>Post Type:</strong> Blood Donation</p>
            <p>
                <strong>Blood Type:</strong> {item.type}<br/>
                <strong>Patient Name:</strong> {item.patientName}<br/>
                <strong>Hospital Name:</strong> {item.hospitalName}<br/>
                <strong>Area:</strong> {item.area}<br/>
                <strong>Governorate:</strong> {item.governorate}
            </p>
        </div>
    );
}

export default BloodDonationInfo;