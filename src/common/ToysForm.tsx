import {Formik} from "formik";

import FormField from "./FormField.tsx";
import {ToyAges, ToyCategories, ToyGenders, ToyItem, toysSchema} from "./toys.ts";
import DocumentUpload from "./DocumentUpload.tsx";

function ToysForm({initialValues, name, search}: { initialValues: ToyItem; name: string, search?: boolean }) {
    return (
        <Formik
            onSubmit={() => {
            }}
            initialValues={initialValues}
            name={name}
            validationSchema={toysSchema}>{(formik) => (
            <>
                <FormField formik={formik} name="category" schema={toysSchema} options={ToyCategories}/>
                <FormField formik={formik} name="ageRange" schema={toysSchema} options={ToyAges}/>
                <FormField formik={formik} name="toyGender" schema={toysSchema} options={ToyGenders}/>
                {!search && <>
                    <FormField formik={formik} name="quantity" schema={toysSchema}/>
                    <FormField formik={formik} name="toyType" schema={toysSchema} />
                    <DocumentUpload formik={formik} schema={toysSchema}
                                    label="Upload picture for the toy."/>
                </>}
            </>
        )}
        </Formik>
    );
}

export default ToysForm;