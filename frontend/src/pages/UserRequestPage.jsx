import Header from '../components/Header.jsx'
import RequestTable from '../components/RequestTable.jsx'
import { useEffect, useState } from 'react'

const serviceName = "[Service Name]"
let username = "User12451235"

function UserRequestPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/requests")
    .then(async (response) => {
      const data = await response.json();
      setRequests(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>
    <Header siteTitle={serviceName} username={username} isAdmin={false}/>
    <div id="aboveTable">
      <h1 id="tableHeader">My requests</h1>
      <button id="addButton"><a href="new_request.html">New request</a></button>
    </div>
    <div id="container">
      <RequestTable requests={requests} includeUsers={false} />
    </div>
    </>
  )
}

export default UserRequestPage
