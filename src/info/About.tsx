import BreadCrumb from "../common/BreadCrumb.tsx";

function About() {
    const links = [
        {to: '/', label: 'Home'},
        {to: '/about', label: 'About Us'},
    ];

    return (
        <div className="container">
            <BreadCrumb links={links}/>
            <h1>About Us</h1>
            <p>
                We are a non-profit organization that aims to help people in need. We connect donors with organizations
                that help people in need. We also help organizations that help people in need.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is to get high grades in our (CSEN603) Software Engineering course. Also to learn and understand web technologies like HTML, CSS, Javascript, <a href="https://react.dev/">React</a>, <a href="http://www.typescriptlang.org">TypeScript</a> to help us build user friendly web applications.
            </p>

            <h2>Our Team</h2>
            <ul>
                <li>Kareem Sherif ElMeteny, ID: 55-0260</li>
                <li>Yassin Amr El-Helly, ID: 55-2011</li>
                <li>Youssef Tarek Khamis, ID: 55-1237</li>
                <li>Ahmed Hossam Kamal, ID: 55-3380</li>
                <li>Kareem Sherif ElMeteny, ID: 55-0260</li>
                <li>Kareem Sherif ElMeteny, ID: 55-0260</li>
            </ul>
        </div>
    );
}

export default About;