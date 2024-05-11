import {FormikProps} from "formik";
import {AnyObject, ObjectSchema} from "yup";

export type SubformProps<T extends AnyObject> = {
    formik: FormikProps<T>;
    name: string;
    search?: boolean;
    schema: ObjectSchema<T>
}