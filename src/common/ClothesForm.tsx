import {
    ClothAges,
    ClothGenders,
    ClothMaterials,
    ClothSeasons,
    ClothTypes
} from "./clothes.ts";
import FormField from "./FormField.tsx";
import {SubformProps} from "./subform.ts";
import {AnyObject} from "yup";

function ClothesForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    return (
        <>
            <FormField formik={formik} name={`${prefix}season`} schema={schema} options={ClothSeasons}/>
            <FormField formik={formik} name={`${prefix}ageRange`} schema={schema} options={ClothAges}/>
            <FormField formik={formik} name={`${prefix}gender`} schema={schema} options={ClothGenders}/>
            {!search && <>
                <FormField formik={formik} name={`${prefix}quantity`} schema={schema}/>
                <FormField formik={formik} name={`${prefix}type`} schema={schema} options={ClothTypes}/>
                <FormField formik={formik} name={`${prefix}material`} schema={schema} options={ClothMaterials}/>
            </>}
        </>
    );
}

export default ClothesForm;