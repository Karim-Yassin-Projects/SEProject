import {useCallback, useState} from "react";

type DeleteConfirmProps = {
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
};

type DeleteButtonProps = {
    onConfirm: () => void;
    title?: string;
    message?: string;
    deleteText?: string;
    deleteButtonClass?: string;
}


function DeleteConfirm(props: DeleteConfirmProps) {
    return (
        <div className="modal d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <button type="button" className="close" aria-label="Close" onClick={props.onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p className="text-start">{props.message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={props.onConfirm}>Delete</button>
                        <button type="button" className="btn btn-secondary" onClick={props.onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DeleteButton(props: DeleteButtonProps) {
    const [show, setShow] = useState(false);
    const handleConfirm = useCallback(() => {
        setShow(false);
        props.onConfirm();
    }, [setShow, props]);
    const handleCancel = useCallback (() => setShow(false), [setShow]);
    const deleteText = props.deleteText || 'Delete';
    const deleteButtonClass = props.deleteButtonClass || 'btn btn-danger';
    return (
        <>
            <button type="button" className={deleteButtonClass} onClick={() => { setShow(true);}}>{deleteText}</button>
            {show && <DeleteConfirm onConfirm={handleConfirm} onCancel={handleCancel} title={props.title || 'Delete confirmation'} message={props.message || 'Are you sure you want to delete this item? This action cannot be undone.'} />}
        </>
    );
}

export default DeleteButton;