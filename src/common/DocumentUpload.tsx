import {useState, DragEvent, createRef} from "react";
import {AnyObject, ObjectSchema} from "yup";
import {FormikProps} from "formik";

export type FileUploadProps<T extends AnyObject> = {
    formik: FormikProps<T>;
    schema: ObjectSchema<T>;
    label: string;
}
function DocumentUpload<T extends AnyObject>(props: FileUploadProps<T>) {
    const [dragging, setDragging] = useState(false);
    const fileRef = createRef<HTMLInputElement>();
    const handleFile = async (file: File) => {
        console.log(file);
        const ext = file.name.lastIndexOf('.') == -1 ? '' : file.name.substring(file.name.lastIndexOf('.') + 1);
        await props.formik.setFieldValue('document', file.name);
        await props.formik.setFieldValue('documentSize', file.size);
        await props.formik.setFieldValue('documentType', ext);

        await props.formik.setFieldTouched('document', true);
        await props.formik.setFieldTouched('documentSize', true);
        await props.formik.setFieldTouched('documentType', true);
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



    return (
        <div className={`form-group row border border-1 border-secondary-subtle rounded p-3 my-2 ${dragging ? 'border-dashed' : ''}`}
             onDragOver={dragOver}
             onDragEnter={dragEnter}
             onDragLeave={dragLeave}
             onDrop={fileDrop}
             onClick={() => fileRef.current?.click()}
        >
            {props.label} <br />
            Click here or drag and drop a document to upload.
            { props.formik.values.document && <span>
                <i className="bi bi-file-earmark-text"></i>
                {props.formik.values.document} &nbsp;
                <small>({props.formik.values.documentSize} bytes)</small>
            </span> }
            <input ref={fileRef} onChange={(e) =>handleFile((e as unknown as { target: { files: File[]}}).target.files[0])} type="file" className="d-none" accept="image/*,application/pdf"/>
            { props.formik.errors.document && <div className="small text-danger">{props.formik.errors.document as string}</div> }
            { props.formik.errors.documentSize && <div className="small text-danger">{props.formik.errors.documentSize as string}</div> }
            { props.formik.errors.documentType && <div className="small text-danger">{props.formik.errors.documentType as string}</div> }
        </div>

    );
}

export default DocumentUpload;