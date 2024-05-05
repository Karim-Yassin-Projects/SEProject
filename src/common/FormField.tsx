import {FormikProps} from "formik";
import {AnyObject, ObjectSchema, reach, Schema} from "yup";

export type FormFieldProps<T extends AnyObject> = {
    formik: FormikProps<T>;
    name: keyof T;
    label?: string;
    schema: ObjectSchema<T>;
    options?: string[];
}

function FormField<T extends AnyObject>(props: FormFieldProps<T>) {
    const {formik, name, schema} = props;
    const {errors, touched} = formik;
    let {label} = props;
    const id = name as string;
    const error = errors[name];
    const touch = touched[name];
    const spec = (reach(schema, id) as Schema).spec;
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

    const showError = touch && error;
    const cls = `form-control ${touch && error ? 'is-invalid' :
        touch && !error ? 'is-valid' : ''}`;
    const type = id.toLowerCase().indexOf('password') >= 0 ? 'password' : 'text';
    return (
        <div className="form-group row my-2">
            <label htmlFor={id} className="col-md-2">{label}</label>
            <div className="col-md-10">
                {props.options && props.options.length < 3 &&
                    props.options.map((option, index) => (
                        <div key={index} className="form-check form-check-inline">
                            <input
                                type="radio"
                                id={id + "_"+  index}
                                name={id}
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
                        id={id}
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
                        id={id}
                        className={cls}
                        value={formik.values[name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={placeholder}
                    />}
                {!props.options && !textArea &&
                <input
                    type={type}
                    id={id}
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