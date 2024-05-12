import {AllPosts} from "../common/posts.ts";

function MedicalRequest(){
    const medicalPost = AllPosts.find(p => p.category === 'Medical Supplies');
    if (!medicalPost) {
        return <div>Medical Post not found</div>
    }
    return (
        <div className="container">
            <h1>Donation Post</h1>
            <div className="card mt-4">
                <div className="card-header">
                    <h5 className="card-title">{medicalPost.title}</h5>
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <p><strong>Status</strong>: <strong className={medicalPost.fulfilled ? 'text-success' : 'text-danger'}>{medicalPost.fulfilled ? 'Fulfilled' : 'Not fulfilled'}</strong></p>

                        {medicalPost.details.split('\n').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br/>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicalRequest;