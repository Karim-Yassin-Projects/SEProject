import {Formik} from "formik";

import FormField from "./FormField.tsx";
import {FoodCategories, FoodItem, foodSchema, WeightCategories} from "./food.ts";

function FoodForm({initialValues, name, search}: { initialValues: FoodItem; name: string, search?: boolean }) {
    return (
        <Formik
            onSubmit={() => {
            }}
            initialValues={initialValues}
            name={name}
            validationSchema={foodSchema}>{(formik) => (
            <>
                <FormField formik={formik} name="category" schema={foodSchema} options={FoodCategories}/>
                {!search && <>

                    {formik.values.category && WeightCategories.indexOf(formik.values.category) >= 0 && <FormField formik={formik} name="weight" schema={foodSchema}/> }
                    {formik.values.category && WeightCategories.indexOf(formik.values.category) < 0 && <FormField formik={formik} name="quantity" schema={foodSchema}/> }

                </>}
            </>
        )}
        </Formik>
    );
}

export default FoodForm;