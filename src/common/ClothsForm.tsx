import {Formik} from "formik";
import {
    ClothAges,
    clothesSchema,
    ClothGenders,
    ClothItem,
    ClothMaterials,
    ClothSeasons,
    ClothTypes
} from "./clothes.ts";
import FormField from "./FormField.tsx";

function ClothsForm({initialValues, name, search}: { initialValues: ClothItem; name: string, search?: boolean }) {
    return (
        <Formik
            onSubmit={() => {
            }}
            initialValues={initialValues}
            name={name}
            validationSchema={clothesSchema}>{(formik) => (
            <>
                <FormField formik={formik} name="season" schema={clothesSchema} options={ClothSeasons}/>
                <FormField formik={formik} name="ageRange" schema={clothesSchema} options={ClothAges}/>
                <FormField formik={formik} name="gender" schema={clothesSchema} options={ClothGenders}/>
                {!search && <>
                    <FormField formik={formik} name="quantity" schema={clothesSchema}/>
                    <FormField formik={formik} name="type" schema={clothesSchema} options={ClothTypes}/>
                    <FormField formik={formik} name="material" schema={clothesSchema} options={ClothMaterials}/>
                </>}
            </>
        )}
        </Formik>
    );
}

export default ClothsForm;