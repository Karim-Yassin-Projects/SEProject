import {Formik} from "formik";
import FormField from "./FormField.tsx";
import {SchoolSuppliesCategories, SchoolSuppliesItem, schoolSuppliesSchema} from "./school-supplies-categories.ts";

function SchoolSuppliesForm({initialValues, name, search}: { initialValues: SchoolSuppliesItem; name: string, search?: boolean }) {
    return (
        <Formik
            onSubmit={() => {
            }}
            initialValues={initialValues}
            name={name}
            validationSchema={schoolSuppliesSchema}>{(formik) => (
            <>
                <FormField formik={formik} name="type" schema={schoolSuppliesSchema} options={SchoolSuppliesCategories}/>
                {!search && <>
                    <FormField formik={formik} name="quantity" schema={schoolSuppliesSchema}/>
                </>}
            </>
        )}
        </Formik>
    );
}

export default SchoolSuppliesForm;