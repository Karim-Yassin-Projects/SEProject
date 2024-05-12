import {NavLink} from "react-router-dom";

function App() {
    return (
        <>
            <div className="container">
                <h1 className="text-center display-4">Welcome to I Love Maadi</h1>
                <p className="text-center">We are an organization that helps Charity Organizations and Donors to reach
                    each other.</p>

                <div className="mt-4 p-5 bg-primary text-white rounded">
                    <h1>Our Mission</h1>
                    <p>Our mission is to improve the quality of life for those in need.
                        Through our various initiatives, we aim to provide essential resources, create opportunities,
                        and
                        advocate for equity and justice. We believe in the power of community and are committed to
                        making a
                        positive, lasting impact.</p>
                </div>

                <div className="mt-4 p-5 bg-success text-white rounded">
                    <h1>Our Vision</h1>
                    <p>Our vision is a world where everyone has access to the resources they need to thrive.
                        We envision a society that is equitable, inclusive, and just, where all individuals have the
                        opportunity to reach their full potential. We are dedicated to creating a brighter future for
                        all.</p>
                </div>
                <div className="row mt-4 p-2 overflow-hidden">
                    <div className="col-md-6 d-table-cell">
                        <div className="bg-secondary text-white rounded h-100 p-3">
                            <h2>For Doctors</h2>
                            <p>
                                We are dedicated to connecting doctors with pro bono cases.
                                We believe that everyone deserves access to quality healthcare, regardless of their
                                financial situation.
                                By facilitating these connections, we enable doctors to give back to their communities,
                                provide essential care to those who need it most, and uphold the highest values of the
                                medical profession.
                            </p>
                            <p className="text-center">
                                <NavLink className="btn btn-lg btn-primary" to="/donor/register">Register as a doctor
                                    now</NavLink>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 d-table-cell">
                        <div className="bg-secondary text-white rounded p-3 h-100 p-3">
                            <h2>For Teachers </h2>
                            <p>We are committed to supporting educators in their noble mission of shaping the future.
                                We facilitate connections between teachers and pro bono opportunities in under-resourced
                                schools and communities.
                                We believe that every child deserves a quality education, regardless of their
                                socio-economic background.
                                By enabling teachers to offer their skills and knowledge on a pro bono basis,
                                we help bridge the educational gap and foster a brighter future for all.</p>

                            <p className="text-center">
                                <NavLink className="btn btn-lg btn-primary" to="/donor/register">Register as a teacher
                                    now</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 p-2 overflow-hidden">
                    <div className="col-md-6 d-table-cell">
                        <div className="bg-secondary text-white rounded h-100 p-3">
                            <h2>For Donors</h2>
                            <p>
                                We are committed to helping donors find causes that align with their values and interests.
                                We understand that every donor has unique passions and goals for their philanthropy.
                                That's why we provide a platform where donors can discover a wide range of causes and organizations.
                                From education and healthcare to environmental conservation and social justice, we make it easy for donors to find and support the causes they care about the most.
                                By connecting donors with meaningful opportunities, we aim to foster a culture of giving and make a lasting impact on our society.
                            </p>
                            <p className="text-center">
                                <NavLink className="btn btn-lg btn-primary" to="/donor/register">Register as a donor
                                    now</NavLink>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 d-table-cell">
                        <div className="bg-secondary text-white rounded p-3 h-100 p-3">
                            <h2 >For Charity organizations </h2>
                            <p>We are devoted to assisting charity organizations in finding donors, doctors, and teachers who are willing to contribute their resources and expertise.
                                We understand the challenges that charities face in securing necessary funding and professional assistance.
                                Our platform serves as a bridge, connecting organizations with individuals who are passionate about making a difference.
                                Whether it's a donor who wants to contribute financially, a doctor who can provide medical services,
                                or a teacher who can offer educational support, we strive to facilitate these vital connections.
                                By doing so, we empower charity organizations to continue their invaluable work and amplify their impact on the communities they serve</p>

                            <p className="text-center">
                                <NavLink className="btn btn-lg btn-primary" to="/representative/register">Register your organization
                                    now</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default App
