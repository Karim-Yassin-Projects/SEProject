import React from 'react';
import BreadCrumb from "../common/BreadCrumb.tsx";

const links = [
    {to: '/', label: 'Home'},
    {to: '/Dashboard', label: 'Admin Dashboard'},
    {to: '/organizationsubmissions', label: 'Organization Submissions'},
    {to: '/organizationdocuments',label: 'Organization Documents'},
];
const Documents: React.FC = () => {
    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1 className="text-center mb-4">Document Images</h1>
            <div className="row justify-content-center">
                {/* First Image */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow">
                        <img
                            src="https://www.researchgate.net/profile/Rohit-Rahul-2/publication/333650058/figure/fig4/AS:766997583364098@1559877882442/Sample-document-images.ppm"
                            alt="Sample Document 1"
                            className="card-img-top"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <div className="card-body text-center">
                            <p className="card-text">Document 1</p>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <a href="https://www.researchgate.net/profile/Rohit-Rahul-2/publication/333650058/figure/fig4/AS:766997583364098@1559877882442/Sample-document-images.ppm" download className="btn btn-primary">Download Document 1</a>
                    </div>
                </div>
                {/* Second Image */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow">
                        <img
                            src="https://radiology.wisc.edu/wp-content/uploads/2017/10/va_10-5345_sampleFill.png"
                            alt="Sample Document 2"
                            className="card-img-top"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <div className="card-body text-center">
                            <p className="card-text">Document 2</p>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <a href="https://radiology.wisc.edu/wp-content/uploads/2017/10/va_10-5345_sampleFill.png" download className="btn btn-primary">Download Document 2</a>
                    </div>
                </div>
                {/* Third Image */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow">
                        <img
                            src="https://i.pinimg.com/736x/0a/5c/f3/0a5cf3eb1677c670de4f9c82992f5bd6.jpg"
                            alt="Sample Document 3"
                            className="card-img-top"
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <div className="card-body text-center">
                            <p className="card-text">Document 3</p>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <a href="https://i.pinimg.com/736x/0a/5c/f3/0a5cf3eb1677c670de4f9c82992f5bd6.jpg" download className="btn btn-primary">Download Document 3</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;
