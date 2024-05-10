import {Formik} from "formik";
import FormField from "./FormField.tsx";
import {
    MedicalDevices,
    MedicalEquipments,
    MedicalSuppliesCategories,
    MedicalSuppliesItem,
    medicalSuppliesSchema,
    Medications
} from "./medical-supplies.ts";
import DocumentUpload from "./DocumentUpload.tsx";

function MedicalSuppliesForm({initialValues, name, search}: { initialValues: MedicalSuppliesItem; name: string, search?: boolean }) {
    return (
        <Formik
            onSubmit={() => {
            }}
            initialValues={initialValues}
            name={name}
            validationSchema={medicalSuppliesSchema}>{(formik) => (
            <>
                <FormField formik={formik} name="category" schema={medicalSuppliesSchema} options={MedicalSuppliesCategories}/>
                {formik.values.category === 'Medications' && <FormField formik={formik} name="medicationType" schema={medicalSuppliesSchema} options={Medications}/>}
                {formik.values.category === 'Medical Equipment' && <FormField formik={formik} name="equipmentType" schema={medicalSuppliesSchema} options={MedicalEquipments}/>}
                {formik.values.category === 'Medical Devices' && <FormField formik={formik} name="deviceType" schema={medicalSuppliesSchema} options={MedicalDevices}/>}
                {!search && <>
                    <FormField formik={formik} name="use" schema={medicalSuppliesSchema}/>
                    <FormField formik={formik} name="quantity" schema={medicalSuppliesSchema}/>
                    <DocumentUpload formik={formik} schema={medicalSuppliesSchema}
                                    label="Upload picture for the supply item."/>

                </>}
            </>
        )}
        </Formik>
    );
}

export default MedicalSuppliesForm;