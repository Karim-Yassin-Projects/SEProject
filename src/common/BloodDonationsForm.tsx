import FormField from "./FormField.tsx";
import {BloodTypes} from "./blood-donations.ts";
import {SubformProps} from "./subform.ts";
import {AnyObject} from "yup";

function BloodDonationForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    return (
        <>
            <FormField formik={formik} name={`${prefix}type`} schema={schema} options={BloodTypes}/>
            <FormField formik={formik} name={`${prefix}patientName`} schema={schema}/>
            {search && <>
                <FormField formik={formik} name={`${prefix}hospitalName`} schema={schema}/>
                <FormField formik={formik} name={`${prefix}governorate`} schema={schema}/>
                <FormField formik={formik} name={`${prefix}area`} schema={schema}/>
            </>}
        </>
    );
}

export default BloodDonationForm;