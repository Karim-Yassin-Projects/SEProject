import FormField from "./FormField.tsx";
import {SchoolSuppliesCategories } from "./school-supplies-categories.ts";
import {AnyObject} from "yup";
import {SubformProps} from "./subform.ts";

function SchoolSuppliesForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    return (
        <>
            <FormField formik={formik} name={`${prefix}type`} schema={schema} options={SchoolSuppliesCategories}/>
            {!search && <>
                <FormField formik={formik} name={`${prefix}quantity`} schema={schema}/>
            </>}
        </>
    );
}

export default SchoolSuppliesForm;