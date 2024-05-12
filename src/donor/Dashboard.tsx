import BreadCrumb from "../common/BreadCrumb.tsx";
import DashboardCard from "./DashboardCard.tsx";
import { PostCategories, unfulfilledPosts} from "../common/posts.ts";

const Dashboard = () => {

    const links = [
        { to: '/', label: 'Home' },
        { to: '/donor', label: 'Donor Dashboard' },
    ];

    return (
        <div className="dashboard container d-flex flex-column p-4">
            <BreadCrumb links={links} />
            <h1 className="display-3 mb-4">Dashboard</h1>

            <div className="row overflow-hidden">
                <DashboardCard category="" count={unfulfilledPosts().length} />
                {
                    PostCategories.map(category =>
                        <DashboardCard key={category} category={category} count={unfulfilledPosts(category).length} />)
                }
            </div>
        </div>
    );
};

export default Dashboard;
