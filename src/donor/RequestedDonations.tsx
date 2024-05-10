import { useState } from 'react';
import SideBar from './SideBar';
import {useNavigate} from "react-router-dom";


const itemTypes: Record<string, string[]> = {
    'food': ['Rice', 'Canned Beans', 'Cereal', 'Pasta'],
    'toys': ['Teddy Bear', 'Doll', 'Toy Car', 'Building Blocks'],
    'clothes': ['T-Shirt', 'Sweater', 'Jeans', 'Dress'],
    'medical supplies': ['Bandages', 'Gauze', 'Antiseptic'],
    'school supplies': ['Pencils', 'Notebooks', 'Glue', 'Scissors', 'Backpacks', 'Pens'],
    'blood donations': ['Blood Bag', 'Plasma', 'Platelets']
}

const allItems = Object.getOwnPropertyNames(itemTypes)
    .reduce((acc, key) => acc.concat(itemTypes[key]), [] as string[])

function SearchDonationItemsByCategory({}) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dummyData, setDummyData] = useState([]);

    const navigate = useNavigate();
    const handleSearch = () => {
        let data: ((prevState: never[]) => never[]) | string[] = [];
        if (selectedCategory === 'all categories') {
            data =allItems;
        }
        if(selectedCategory === 'medical supplies'){
            navigate('/medical-details');
        }
        else {
            data = itemTypes[selectedCategory];
        }
        console.log('Selected Category:', selectedCategory);
        console.log('Dummy Data:', data);
        setDummyData(data);
        // Call the onSearch function passed from the parent component with the selected category
        onSearch(selectedCategory, data);
    };

   const handleFilterClothes = () => {
        navigate('/filter-clothes')
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    {/* Include the Sidebar component here */}
                    <SideBar
                        handleSearch={handleSearch}
                        handleFilterClothes={handleFilterClothes}
                        selectedCategory={selectedCategory}
                    />
                </div>
                <div className="col-md-9">
                    <h2>Search Donation Items by Category</h2>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Select category...</option>
                            <option value="all categories">All Categories</option>
                            <option value="food">Food</option>
                            <option value="toys">Toys</option>
                            <option value="clothes">Clothes</option>
                            <option value="medical supplies">Medical Supplies</option>
                            <option value="school supplies">School Supplies</option>
                            <option value="blood donations">Blood Donations</option>
                        </select>
                    </div>
                    {/*<button type="button" className="btn btn-primary" onClick={handleSearch} disabled={!selectedCategory}>
                        Search
                    </button>
                    <button type="button" className="btn btn-primary ms-3" onClick={handleFilterClothes} disabled={selectedCategory !== 'clothes'}>
                        Filter Clothes
                    </button>*/}
                    {dummyData.length > 0 && (
                        <div>
                            <h3>Requested Donation Items</h3>
                            <ul>
                                {dummyData.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchDonationItemsByCategory;
