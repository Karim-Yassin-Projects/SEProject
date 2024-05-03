import {FormikProps} from "formik";
import {AnyObject, ObjectSchema, reach, Schema} from "yup";

export type FormFieldProps<T extends AnyObject> = {
    formik: FormikProps<T>;
    name: keyof T;
    label?: string;
    schema: ObjectSchema<T>;
}
function FormField<T extends AnyObject>(props: FormFieldProps<T>) {
    const { formik, name, schema } = props;
    const { errors, touched } = formik;
    let {label } = props;
    const id = name as string;
    const error = errors[name];
    const touch = touched[name];
    if (!label) {
        label = (reach(schema, id) as Schema).spec.label;
    }
    const showError = touch && error;
    const cls = `form-control ${touch && error ? 'is-invalid' :
        touch && !error ? 'is-valid' : ''}`;
    return (
        <div className = "form-group">
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                className={cls}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={label}
            />
            {showError && <div className="text-danger small">{error as string}</div>}
        </div>

    )
}

export default FormField;