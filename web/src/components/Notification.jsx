import Alert from "react-bootstrap/Alert";
export default function Notification(props) {
    return (
        <>
            <Alert
                key={props.variant}
                variant={props.variant}
                onClose={() => {
                    props.setActive(false);
                }}
                dismissible
                className="z-3 m-3"
                style={{ position: "fixed", width: "fit-content", right: "0" }}
            >
                {props.message}
            </Alert>
        </>
    );
}
