import Header from '../components/Header'
import RequestForm from '../components/RequestForm';

const serviceName = "[ServiceName]"

function NewRequestPage() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    return(
        <>
        <Header siteTitle={serviceName} username={username} isAdmin={false} />
        <RequestForm />
        </>
    );
}

export default NewRequestPage;