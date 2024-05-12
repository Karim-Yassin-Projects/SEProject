import BreadCrumb from "../common/BreadCrumb.tsx";
import {useEffect, useState} from "react";
import {Formik} from "formik";
import {SearchCriteria, searchPosts, SearchSchema} from "../common/search.ts";
import FormField from "../common/FormField.tsx";
import ClothesForm from "../common/ClothesForm.tsx";
import BloodDonationForm from "../common/BloodDonationsForm.tsx";
import MedicalSuppliesForm from "../common/MedicalSuppliesForm.tsx";
import SchoolSuppliesForm from "../common/SchoolSuppliesForm.tsx";
import ToysForm from "../common/ToysForm.tsx";
import FoodForm from "../common/FoodForm.tsx";
import {Post, PostCategories} from "../common/posts.ts";
import TeachingForm from "../common/TeachingForm.tsx";
import MedicalCasesForm from "../common/MedicalCasesForm.tsx";
import {NavLink, useParams} from "react-router-dom";


const defaultSearchCriteria: SearchCriteria = {
    category: "",
    clothes: {
        search: true,
        ageRange: "",
        gender: "",
        season: "",
    },
    toys: {
        search: true,
        ageRange: "",
        category: "",
        toyGender: "",
    },
    food: {
        search: true,
        category: "",
    },
    medicalSupplies: {
        search: true,
        category: "",
        medicationType: "",
    },
    schoolSupplies: {
        search: true,
        type: "",
    },
    bloodDonation: {
        search: true,
        hospitalName: "",
        governorate: "",
        area: "",
    },
    teaching: {
        search: true,
        subject: "",
        numberOfStudents: "",
        area: "",
        governorate: "",
    },
    medicalCase: {
        search: true,
        patientGender: "",
        patientAge: "",
        caseDescription: "",
        organizationName: "",
        governorate: "",
        area: "",
        patientName: "",
        patientWeight: "",
        specialization: "",
    }
}

function SearchPosts() {
    const {category} = useParams();
    console.log(category);
    const [initialSearchCriteria, setInitialSearchCriteria] = useState(defaultSearchCriteria);
    useEffect(() => {
        setInitialSearchCriteria({
            ...defaultSearchCriteria,
            category: category || "",
        });
    }, [category]);
    const links = [
        {to: '/', label: 'Home'},
        {to: '/donor', label: 'Donor Dashboard'},
        {to: '/donor/search-posts', label: 'Donation Posts'},
    ];

    if (category) {
        links.push({to: `/donor/search-posts/${encodeURIComponent(category)}`, label: category});
    }

    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | null>(null);
    const [searchFormShown, setSearchFormShown] = useState(false);
    const handleSearch = (criteria: SearchCriteria) => {
        setSearchCriteria(criteria);
    };
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [itemsPerPage,] = useState(20);

    const [searchResults, setSearchResults] = useState<Post[]>([]);
    useEffect(() => {
        console.log(searchCriteria);
        const criteria = searchCriteria || initialSearchCriteria;
        setSearchResults(searchPosts(criteria));
        setCurrentPageIndex(0);
    }, [searchCriteria, initialSearchCriteria]);

    const indexOfFirstPost = currentPageIndex * itemsPerPage;
    const indexOfLastPost = Math.min(indexOfFirstPost + itemsPerPage - 1, searchResults.length - 1);
    const numberOfPages = Math.ceil(searchResults.length / itemsPerPage);
    const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);
    let firstPage = Math.max(0, currentPageIndex - 5);
    const lastPage = Math.min(numberOfPages - 1, firstPage + 9);

    if (lastPage - firstPage < 9) {
        firstPage = Math.max(0, lastPage - 9);
    }

    const paginate = (pageNumber: number) => {
        if (pageNumber < 0 || pageNumber >= numberOfPages) {
            return;
        }
        setCurrentPageIndex(pageNumber);
    };

    return (
        <div className="container">

            <BreadCrumb links={links}/>
            <h1>Donation Posts</h1>

            <Formik initialValues={initialSearchCriteria} onSubmit={handleSearch} validationSchema={SearchSchema} enableReinitialize={true}>
                {
                    (formik) => (

                        searchFormShown ? <>
                                {!category && <FormField formik={formik} name="category" schema={SearchSchema} options={PostCategories}/> }
                                {formik.values.category === 'Clothes' &&
                                    <ClothesForm name="clothes" formik={formik} schema={SearchSchema} search={true}/>}
                                {formik.values.category === 'Blood Donations' &&
                                    <BloodDonationForm name="bloodDonation" formik={formik} schema={SearchSchema}
                                                       search={true}/>}
                                {formik.values.category === 'Medical Supplies' &&
                                    <MedicalSuppliesForm name="medicalSupplies" formik={formik} schema={SearchSchema}
                                                         search={true}/>}
                                {formik.values.category === 'School Supplies' &&
                                    <SchoolSuppliesForm formik={formik} schema={SearchSchema} name="schoolSupplies"
                                                        search={true}/>}
                                {formik.values.category === 'Toys' &&
                                    <ToysForm formik={formik} schema={SearchSchema} name="toys" search={true}/>}
                                {formik.values.category === 'Food' &&
                                    <FoodForm formik={formik} schema={SearchSchema} name="food" search={true}/>}
                                {formik.values.category === 'Teaching Cases' &&
                                    <TeachingForm formik={formik} schema={SearchSchema} name="teaching" search={true}/>}
                                {formik.values.category === 'Medical Cases' &&
                                    <MedicalCasesForm formik={formik} schema={SearchSchema} name="medicalCase" search={true}/>}
                                <div className="form-group text-center row">
                                    <button type="submit" className="btn btn-primary offset-2 col-2"
                                            onClick={formik.submitForm}>Search
                                    </button>
                                    <div className="col-1"></div>
                                    <button type="button" className="btn btn-secondary ms-2 col-2" onClick={() =>formik.setValues(initialSearchCriteria)}> Clear Search
                                        Filter
                                    </button>
                                    <div className="col-1"></div>
                                    <button type="button" className="btn btn-secondary ms-2 col-2"
                                            onClick={() => setSearchFormShown(false)}>
                                        Hide Filters
                                    </button>
                                </div>
                            </>
                            :
                            <div className="text-center">
                                <button type="button" className="btn btn-secondary"
                                        onClick={() => setSearchFormShown(true)}>Show Filters
                                </button>
                            </div>

                    )
                }
            </Formik>
            {currentPosts.length > 0 && <div className="text-center text-muted small my-1">
                <p>Showing posts {indexOfFirstPost + 1} to {indexOfLastPost + 1} of {searchResults.length} posts</p>
            </div>}
            {currentPosts.length > 0 && <table className="table table-striped">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Organization</th>
                    <th>Governorate</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((post) => <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>{post.organization.name}</td>
                    <td>{post.organization.governorate}</td>
                    <td>
                        <NavLink to={`/post-details-donor/${post.id}`} className="btn btn-secondary">Show Details</NavLink>
                    </td>
                </tr>)}

                </tbody>
            </table>}
            {currentPosts.length === 0 && <div className="empty-state container">
                <div className="row">
                    <div className="col-12 align-items-center justify-content center d-flex flex-column">
                        <img src="/images/empty.svg" width="300" alt="No data found"/>
                        <p>No posts found! Please select other search criteria.</p>
                    </div>
                </div>
            </div>}

            {numberOfPages > 1 && <nav className="text-center my-2" aria-label="Pagination">
                <ul className='pagination justify-content-center'>
                    <li className='page-item'>
                        <button className="page-link" onClick={() => paginate(currentPageIndex - 1)}>Previous</button>
                    </li>
                    {Array(lastPage - firstPage + 1).fill(null).map((_, index) => (
                        <li key={firstPage + index} className={`page-item ${firstPage + index === currentPageIndex ? 'active' : ''}`}>
                            <button onClick={() => paginate(firstPage + index + 1)} className='page-link'>
                                {firstPage + index + 1}
                            </button>
                        </li>
                    ))}
                    <li className='page-item'>
                        <button className="page-link" onClick={() => paginate(currentPageIndex + 1)}>Next</button>
                    </li>
                </ul>
            </nav>}
        </div>
    );
}

export default SearchPosts;