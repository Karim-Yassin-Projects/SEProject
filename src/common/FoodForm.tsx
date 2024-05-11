import FormField from "./FormField.tsx";
import {FoodCategories, WeightCategories} from "./food.ts";
import {SubformProps} from "./subform.ts";
import {AnyObject} from "yup";
import {getIn} from "formik";

function FoodForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';

    const category = getIn(formik.values, `${prefix}category`);
    return (
        <>
            <FormField formik={formik} name={`${prefix}category`} schema={schema}
                       options={FoodCategories as unknown as string[]}/>
            {!search && <>
                {category && WeightCategories.indexOf(category) >= 0 &&
                    <FormField formik={formik} name={`${prefix}weight`} schema={schema}/>}
                {category && WeightCategories.indexOf(category) < 0 &&
                    <FormField formik={formik} name={`${prefix}quantity`} schema={schema}/>}

            </>}
        </>

    );
}

export default FoodForm;