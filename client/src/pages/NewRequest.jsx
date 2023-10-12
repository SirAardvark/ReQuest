import ResponsiveAppBar from "../components/nav/ResponsiveAppBar";
import NewRequestForm from "../components/new_request/NewRequestForm";

function NewRequest() {
    return (
        <>
            <ResponsiveAppBar />
            <br />
            <NewRequestForm />
        </>
    );
}

export default NewRequest;
