import {useState} from "react";

function Sidebar() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const handleSearch = () => {
        alert(`Search by category: ${selectedCategory}`);
    }
    const handleFilterClothes = () => {
        alert('Filter clothes');
    }
    return (
        <div className="sidebar">
            <h3>Possible Actions</h3>
            <ul>
                <li>
                    <button type="button" className="btn btn-primary" onClick={handleSearch} disabled={!selectedCategory}>
                        Search by Category
                    </button>
                </li>
                <li>
                    <button type="button" className="btn btn-primary" onClick={handleFilterClothes} disabled={selectedCategory !== 'clothes'}>
                        More About Clothes
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;