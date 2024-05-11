import {FormikProps, getIn} from "formik";
import {AnyObject, ObjectSchema, reach, Schema} from "yup";

export type FormFieldProps<T extends AnyObject> = {
    formik: FormikProps<T>;
    name: string;
    label?: string;
    schema: ObjectSchema<T>;
    options?: string[];
}

function FormField<T extends AnyObject>(props: FormFieldProps<T>) {
    const {formik, name, schema} = props;
    let {label} = props;

    const touched = getIn(formik.touched, name) || formik.submitCount > 0;
    const error = getIn(formik.errors, name);
    const value = getIn(formik.values, name);
    const spec = (reach(schema, name) as Schema).spec;
    if (!label) {
        label = spec.label as string;
    }
    let placeholder = label;
    if (spec.meta && spec.meta.placeholder) {
        placeholder = spec.meta.placeholder as string;
    } else if (props.options && props.options.length > 2) {
        placeholder = `Select ${label}`;
    }
    const textArea = spec.meta && spec.meta.textarea;
    const optional = spec.optional;
    const empty = value === undefined || value === null || value === '';
    const showError = touched && error;
    let cls = `form-control`;

    if (touched && error) {
        cls = cls + ' is-invalid';
    } else if (!empty && touched && !error) {
        cls = cls + ' is-valid';
    }
    const type = name.toLowerCase().indexOf('password') >= 0 ? 'password' : 'text';
    return (
        <div className="form-group row my-2">
            <label htmlFor={name} className="col-md-2">{label}
                {!optional ? <span className="text-danger">*</span> : ""}
            </label>
            <div className="col-md-10">
                {props.options && props.options.length < 3 &&
                    props.options.map((option, index) => (
                        <div key={index} className="form-check form-check-inline">
                            <input
                                type="radio"
                                id={name + "_" + index}
                                name={name}
                                className="form-check-input"
                                value={option}
                                checked={formik.values[name] === option}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label htmlFor={option} className="form-check-label">{option}</label>
                        </div>
                    ))}
                {props.options && props.options.length > 2 &&
                    <select
                        id={name}
                        className={cls}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">{placeholder}</option>
                        {props.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                }
                {textArea &&
                    <textarea
                        id={name}
                        rows={10}
                        className={cls}
                        value={value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder}
                    />}
                {!props.options && !textArea &&
                    <input
                        type={type}
                        id={name}
                        className={cls}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder}
                    />}
                {showError && <div className="text-danger small">{error as string}</div>}
            </div>
        </div>

    )
}

export default FormField;