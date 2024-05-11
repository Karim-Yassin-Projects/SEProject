import FormField from "./FormField.tsx";
import {
    MedicalDevices,
    MedicalEquipments,
    MedicalSuppliesCategories, Medications,
} from "./medical-supplies.ts";
import DocumentUpload from "./DocumentUpload.tsx";
import {SubformProps} from "./subform.ts";
import {AnyObject} from "yup";
import {getIn} from "formik";

function MedicalSuppliesForm<T extends AnyObject>({name, search, formik, schema}: SubformProps<T>) {
    const prefix = name ? `${name}.` : '';
    const category = getIn(formik.values, `${prefix}category`);
    return (
            <>
                <FormField formik={formik} name={`${prefix}category`} schema={schema} options={MedicalSuppliesCategories}/>
                {category === 'Medications' && <FormField formik={formik} name={`${prefix}medicationType`} schema={schema} options={Medications}/> }
                {category === 'Medical Equipments' && <FormField formik={formik} name={`${prefix}equipmentType`} schema={schema} options={MedicalEquipments}/> }
                {category === 'Medical Devices' && <FormField formik={formik} name={`${prefix}deviceType`} schema={schema} options={MedicalDevices} /> }
                {!search && <>
                    <FormField formik={formik} name={`${prefix}use`} schema={schema}/>
                    <FormField formik={formik} name={`${prefix}quantity`} schema={schema}/>
                    <DocumentUpload formik={formik} schema={schema}
                                    label="Upload picture for the supply item." prefix={name}/>

                </>}
            </>
    )
}

export default MedicalSuppliesForm;