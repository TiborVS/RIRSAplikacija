import Header from '../components/Header.jsx'
import RequestTable from '../components/RequestTable.jsx'
import { useEffect, useState } from 'react'

function UserRequestPage() {
  const serviceName = "[Service Name]"

  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!token || !username) {
    window.location.replace('/login.html');
    return(
      <h2>You must be logged in to view this page.</h2>
    )
  }

  useEffect(() => {
    fetch("http://localhost:8000/requests",{
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
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
