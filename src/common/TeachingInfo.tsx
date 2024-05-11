import { TeachingItem } from "./teaching.ts";

function TeachingInfo({item}: {item: TeachingItem}) {

    return (
        <div>
            <p><strong>Post Type:</strong> Teaching Case</p>
            <p>
                <strong>Subject:</strong> {item.subject}<br/>
                <strong>Number of Students:</strong> {item.numberOfStudents} <br />
                <strong>Governorate:</strong> {item.governorate}<br/>
                <strong>Area:</strong> {item.area}<br/>
            </p>
        </div>
    );
}

export default TeachingInfo;