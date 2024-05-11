import {ClothesItem} from "./clothes.ts";

function ClothesInfo({item}: { item: ClothesItem }) {
    return (
        <div>
            <p><strong>Post Type:</strong> Clothes</p>
            <p>
                <strong>Type</strong>: {item.type}<br/>
                <strong>Material</strong>: {item.material}<br/>
                <strong>Season</strong>: {item.season}<br/>
                <strong>Age Range</strong>: {item.ageRange}<br/>
                <strong>Season</strong>: {item.season}<br/>
                <strong>Gender</strong>: {item.gender}<br/>
                <strong>Quantity</strong>: {item.quantity}<br/>
            </p>
        </div>
    );
}

export default ClothesInfo;