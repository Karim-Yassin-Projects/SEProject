import FormField from "./FormField.tsx";
import {BookLanguages, SchoolSupplies, StationaryItems} from "./school-supplies.ts";
import {AnyObject} from "yup";
import {SubformProps} from "./subform.ts";
import {getIn} from "formik";

function SchoolSuppliesForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    const category = getIn(formik.values, `${prefix}type`);

    return (
        <>
            <FormField formik={formik} name={`${prefix}type`} schema={schema} options={SchoolSupplies}/>
            {!search && <>
                <FormField formik={formik} name={`${prefix}quantity`} schema={schema} />
                { category === "Stationary" && <FormField formik={formik} name={`${prefix}stationaryType`} schema={schema} options={StationaryItems} /> }
                { category === "Books" && <>
                <FormField formik={formik} name={`${prefix}bookName`} schema={schema}/>
                <FormField formik={formik} name={`${prefix}bookLanguage`} schema={schema} options={BookLanguages}/>
                <FormField formik={formik} name={`${prefix}bookAuthor`} schema={schema}/>
                <FormField formik={formik} name={`${prefix}edition`} schema={schema}/>
                <FormField formik={formik} name={`${prefix}bookSummary`} schema={schema}/>
                </> }
            </>}
        </>
    );
}

export default SchoolSuppliesForm;