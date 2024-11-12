import Header from '../components/Header'
import RequestForm from '../components/RequestForm';

const serviceName = "[ServiceName]"

function NewRequestPage() {
    return(
        <>
        <Header siteTitle={serviceName} username={"User12312"} isAdmin={false} />
        <RequestForm />
        </>
    );
}

export default NewRequestPage;