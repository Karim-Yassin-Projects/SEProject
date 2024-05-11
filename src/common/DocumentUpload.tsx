import {useState, DragEvent, createRef, MouseEvent } from "react";
import {AnyObject, ObjectSchema} from "yup";
import {FormikProps} from "formik";

export type FileUploadProps<T extends AnyObject> = {
    formik: FormikProps<T>;
    schema: ObjectSchema<T>;
    label: string;
    prefix?: string;
}

type DocumentType = {
    document?: string;
    documentSize?: number;
    documentType?: string;
}
type ErrorType = {
    document?: string;
    documentSize?: string;
    documentType?: string;
}

function DocumentUpload<T extends AnyObject>(props: FileUploadProps<T>) {
    const prefix = props.prefix ? `${props.prefix}.` : '';
    const [dragging, setDragging] = useState(false);
    const fileRef = createRef<HTMLInputElement>();
    const handleFile = async (file: File) => {
        const ext = file.name.lastIndexOf('.') == -1 ? '' : file.name.substring(file.name.lastIndexOf('.') + 1);
        await props.formik.setFieldValue(`${prefix}document`, file.name);
        await props.formik.setFieldValue(`${prefix}documentSize`, file.size);
        await props.formik.setFieldValue(`${prefix}documentType`, ext);

        await props.formik.setFieldTouched(`${prefix}document`, true);
        await props.formik.setFieldTouched(`${prefix}documentSize`, true);
        await props.formik.setFieldTouched(`${prefix}documentType`, true);
    }

    const dragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const dragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const dragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    };

    const fileDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (!e.dataTransfer || e.dataTransfer.files.length == 0) {
            return;
        }
        const file = e.dataTransfer.files[0];
        await handleFile(file);
    };

    const reset = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        await props.formik.setFieldValue(`${prefix}document`, '');
        await props.formik.setFieldValue(`${prefix}documentSize`, '');
        await props.formik.setFieldValue(`${prefix}documentType`, '');
        await props.formik.setFieldTouched(`${prefix}document`, false);
        await props.formik.setFieldTouched(`${prefix}documentSize`, false);
        await props.formik.setFieldTouched(`${prefix}documentType`, false);
    }

    const errors = props.prefix ? props.formik.errors[props.prefix] as ErrorType : props.formik.errors as ErrorType;
    const values = props.prefix ? props.formik.values[props.prefix] as DocumentType : props.formik.values as DocumentType;
    const touched = ((props.prefix ? props.formik.touched[props.prefix] : props.formik.touched) as unknown as { document: boolean })?.document;

    return (
        <div className={`form-group row border border-1 border-secondary-subtle rounded p-3 my-2 mx-1 ${dragging ? 'border-dashed' : ''}`}
             onDragOver={dragOver}
             onDragEnter={dragEnter}
             onDragLeave={dragLeave}
             onDrop={fileDrop}
             onClick={() => fileRef.current?.click()}
        >
            {props.label} <br />
            Click here or drag and drop a document to upload.
            { values?.document && <span>
                <i className="bi bi-file-earmark-text"></i>
                {values?.document} &nbsp;
                <small>({values?.documentSize} bytes)</small>
                &nbsp;
                <button className="btn btn-outline-danger py-1 px-2 border-0" onClick={reset}><i className="bi bi-trash"></i></button>
            </span> }
            <input ref={fileRef} onChange={(e) =>handleFile((e as unknown as { target: { files: File[]}}).target.files[0])} type="file" className="d-none" accept="image/*,application/pdf"/>
            { errors?.document && touched && <div className="small text-danger">{errors.document as string}</div> }
            { errors?.documentSize && <div className="small text-danger">{errors.documentSize as string}</div> }
            { errors?.documentType && <div className="small text-danger">{errors.documentType as string}</div> }

        </div>

    );
}

export default DocumentUpload;