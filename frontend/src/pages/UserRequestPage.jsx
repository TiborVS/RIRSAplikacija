import Header from '../components/Header.jsx'
import RequestTable from '../components/RequestTable.jsx'
import '../styles/style.css'

const serviceName = "[Service Name]"
let username = "User12451235"

class Request{
  constructor(id, title, description, cost, status) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.cost = cost;
      this.status = status;
  }
}

function addRequestClickHandler() {

}

function UserRequestPage() {
  const ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae faucibus eros, in congue nisi. Etiam id odio nec sapien aliquam feugiat nec id tellus. Etiam ornare vel quam et tincidunt."
  let requests = [];
  for (let i = 0; i < 20; i++) {
    requests.push(new Request(i, "myTitle", ipsum, "100,00 EUR", "ACCEPTED"));
  }

  return (
    <>
    <Header siteTitle={serviceName} username={username}/>
    <div id="aboveTable">
      <h1 id="tableHeader">My requests</h1>
      <button id="addButton" onClick={addRequestClickHandler}><a href="request_form.html">New request</a></button>
    </div>
    <div id="container">
      <RequestTable requests={requests} />
    </div>
    </>
  )
}

export default UserRequestPage
