import {NavLink} from "react-router-dom";

function DashboardCard({category, count} : {category: string, count: number}) {
    return <div className="col-6 col-lg-3 p-1 d-table-cell float-none align-top">
        <div className="card h-100">
            <div className="card-body">
                <h5 className="card-title">{category || 'All'} Requests</h5>
                <p className="card-text text-center display-4 text-success">{count}</p>
            </div>
            <div className="card-footer text-center">
                {category ? <NavLink to={`/donor/search-posts/${encodeURIComponent(category)}`} className="btn btn-primary btn-sm my-1">
                        View {category} Requests
                </NavLink> :
                    <NavLink to="/donor/search-posts" className="btn btn-primary btn-sm my-1">Search All</NavLink>
                }
            </div>
        </div>
    </div>
}

export default DashboardCard;