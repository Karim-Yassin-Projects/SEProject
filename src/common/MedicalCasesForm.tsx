import FormField from "./FormField.tsx";
import {AnyObject} from "yup";
import {SubformProps} from "./subform.ts";
import {Genders, Governorates, Organizations} from "./organizations.ts";
import {getIn} from "formik";
import {Specializations} from "./medical-cases.ts";

function MedicalCasesForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    const governorate = getIn(formik.values, `${prefix}governorate`);
    const areas = governorate ? Organizations.reduce(
        (prev, o ) => o.governorate === governorate && !prev.includes(o.area)? [...prev, o.area] : prev,
        [] as string[]): [];
    const organizationNames = governorate ?
        Organizations.filter(o => o.governorate === governorate).map(o => o.name) :
        [];
    return (
        <>
            <FormField formik={formik} name={`${prefix}specialization`} schema={schema} options={Specializations}/>
            {!search && <>
                <FormField formik={formik} name={`${prefix}patientName`} schema={schema} />
                <FormField formik={formik} name={`${prefix}patientAge`} schema={schema} />
                <FormField formik={formik} name={`${prefix}patientGender`} schema={schema} options={Genders} radio />
                <FormField formik={formik} name={`${prefix}patientWeight`} schema={schema} />
                <FormField formik={formik} name={`${prefix}caseDescription`} schema={schema} />
            </>}
            {search && <>
                <FormField formik={formik} name={`${prefix}governorate`} schema={schema} options={Governorates}/>
                {organizationNames.length > 0 && <FormField formik={formik} name={`${prefix}organizationName`} schema={schema} options={organizationNames}/>}
                {areas .length > 0 && <FormField formik={formik} name={`${prefix}area`} schema={schema} options={areas} /> }
            </>}
        </>
    );
}

export default MedicalCasesForm;