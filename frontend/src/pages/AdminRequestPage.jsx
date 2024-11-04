import Header from '../components/Header.jsx'
import RequestTable from '../components/RequestTable.jsx'
import '../styles/style.css'

const serviceName = "[Service Name]"
let username = "User12451235"

class Request{
  constructor(id, user, title, description, cost, status) {
      this.id = id;
      this.user = user;
      this.title = title;
      this.description = description;
      this.cost = cost;
      this.status = status;
  }
}

function addRequestClickHandler() {

}

function AdminRequestPage() {
  const ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae faucibus eros, in congue nisi. Etiam id odio nec sapien aliquam feugiat nec id tellus. Etiam ornare vel quam et tincidunt."
  let requests = [];
  for (let i = 0; i < 20; i++) {
    requests.push(new Request(i, "JohnSmith", "myTitle", ipsum, "100,00 EUR", "ACCEPTED"));
  }

  return (
    <>
    <Header siteTitle={serviceName} username={username} isAdmin={true}/>
    <div id="aboveTable">
      <h1 id="tableHeader">All requests</h1>
    </div>
    <div id="container">
      <RequestTable requests={requests} includeUsers={true} />
    </div>
    </>
  )
}

export default AdminRequestPage
