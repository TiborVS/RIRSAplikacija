import Header from './components/Header.jsx'
import RequestTable from './components/RequestTable.jsx'
import './styles/style.css'

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

function App() {
  let requests = [];
  for (let i = 0; i < 10; i++) {
    requests.push(new Request(i, "myTitle", "myDescription", "myCost", "myStatus"));
  }

  return (
    <>
    <Header siteTitle={serviceName} username={username}/>
    <RequestTable requests={requests} />
    </>
  )
}

export default App
