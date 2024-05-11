import FormField from "./FormField.tsx";
import {BloodTypes} from "./blood-donations.ts";
import {SubformProps} from "./subform.ts";
import {AnyObject} from "yup";
import {Governorates, HospitalNames, Hospitals} from "./organizations.ts";
import {getIn} from "formik";

function BloodDonationForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    const governorate = getIn(formik.values, `${prefix}governorate`);
    const areas = governorate ? Hospitals.reduce(
        (prev, h ) => h.governorate === governorate && !prev.includes(h.area)? [...prev, h.area] : prev,
        [] as string[]): [];
    return (
        <>
            <FormField formik={formik} name={`${prefix}type`} schema={schema} options={BloodTypes}/>
            {!search && <FormField formik={formik} name={`${prefix}patientName`} schema={schema}/> }
            {search && <>
                <FormField formik={formik} name={`${prefix}hospitalName`} schema={schema} options={HospitalNames}/>
                <FormField formik={formik} name={`${prefix}governorate`} schema={schema} options={Governorates}/>
                {areas .length > 0 && <FormField formik={formik} name={`${prefix}area`} schema={schema} options={areas} /> }
            </>}
        </>
    );
}

export default BloodDonationForm;