import FormField from "./FormField.tsx";
import {AnyObject} from "yup";
import {SubformProps} from "./subform.ts";
import {Subjects} from "./teaching.ts";
import {Governorates, Organizations} from "./organizations.ts";
import {getIn} from "formik";

function TeachingForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    const governorate = getIn(formik.values, `${prefix}governorate`);
    const areas = governorate ? Organizations.reduce(
        (prev, o ) => o.governorate === governorate && !prev.includes(o.area)? [...prev, o.area] : prev,
        [] as string[]): [];
    return (
        <>
            <FormField formik={formik} name={`${prefix}subject`} schema={schema} options={Subjects}/>
            {!search && <>
                <FormField formik={formik} name={`${prefix}numberOfStudents`} schema={schema}/>
            </>}
            {search && <>
                <FormField formik={formik} name={`${prefix}governorate`} schema={schema} options={Governorates}/>
                {areas .length > 0 && <FormField formik={formik} name={`${prefix}area`} schema={schema} options={areas} /> }
            </>}
        </>
    );
}

export default TeachingForm;