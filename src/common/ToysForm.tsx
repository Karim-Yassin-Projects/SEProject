import FormField from "./FormField.tsx";
import {ToyAges, ToyCategories, ToyGenders} from "./toys.ts";
import DocumentUpload from "./DocumentUpload.tsx";
import {AnyObject} from "yup";
import {SubformProps} from "./subform.ts";

function ToysForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    return (
        <>
            <FormField formik={formik} name={`${prefix}category`} schema={schema} options={ToyCategories}/>
            <FormField formik={formik} name={`${prefix}ageRange`} schema={schema} options={ToyAges}/>
            <FormField formik={formik} name={`${prefix}toyGender`} schema={schema} options={ToyGenders}/>
            {!search && <>
                <FormField formik={formik} name={`${prefix}quantity`} schema={schema}/>
                <FormField formik={formik} name={`${prefix}toyType`} schema={schema}/>
                <DocumentUpload formik={formik} schema={schema}
                                label="Upload picture for the toy." prefix={name}/>
            </>}
        </>
    );
}

export default ToysForm;