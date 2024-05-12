type AlertProps = {
    title: string;
    message: string;
    onCancel: () => void;
}

function Alert(props: AlertProps) {
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
                        <button type="button" className="btn btn-secondary" onClick={props.onCancel}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alert;