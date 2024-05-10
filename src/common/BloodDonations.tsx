import {Formik} from "formik";

import FormField from "./FormField.tsx";
import {BloodDonationItem, bloodDonationsSchema, BloodTypes} from "./blood-donations.ts";

function BloodDonationForm({initialValues, name, search}: { initialValues: BloodDonationItem; name: string, search?: boolean }) {
    return (
        <Formik
            onSubmit={() => {
            }}
            initialValues={initialValues}
            name={name}
            validationSchema={bloodDonationsSchema}>{(formik) => (
            <>
                <FormField formik={formik} name="type" schema={bloodDonationsSchema} options={BloodTypes}/>
                <FormField formik={formik} name="patientName" schema={bloodDonationsSchema} />
                {search && <>
                    <FormField formik={formik} name="hospitalName" schema={bloodDonationsSchema} />
                    <FormField formik={formik} name="governorate" schema={bloodDonationsSchema} />
                    <FormField formik={formik} name="area" schema={bloodDonationsSchema} />
                </>}
            </>
        )}
        </Formik>
    );
}

export default BloodDonationForm;