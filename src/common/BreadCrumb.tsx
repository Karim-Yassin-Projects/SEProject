import {NavLink} from "react-router-dom";

type BreadCrumbLink = {
    to: string;
    label: string;
}

type BreadCrumbProps = {
    links: BreadCrumbLink[];
}

function BreadCrumb(props: BreadCrumbProps) {
    return (
        <nav aria-label="breadcrumb" className="mt-2">
            <ol className="breadcrumb">
                {props.links.map((link, index) => {
                    return (
                        <li className="breadcrumb-item active" aria-current="page">
                            {index === props.links.length - 1 ?
                            link.label
                            : <NavLink to={link.to}>{link.label}</NavLink>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default BreadCrumb;