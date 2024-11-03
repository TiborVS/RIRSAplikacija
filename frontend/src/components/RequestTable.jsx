import '../styles/style.css'

export default function RequestTable({ requests }) {
    const requestEntries = requests.map(request => {
        return <tr key={request.id} className="requestRow">
            <td className="title">{request.title}</td>
            <td className="description">{request.description}</td>
            <td className="cost">{request.cost}</td> {/* will need to be formatted at some point, since it probably won't be stored in pretty string form in db */}
            <td className={"status " + "status_" + request.status}>
                <span className={"status " + "status_" + request.status}>
                    {request.status}
                </span>
                    
            </td>
            <td className="edit">
                <a className="edit" href={"edit.html?id=" + request.id}>
                    <img className="edit" src="src/assets/edit.svg"></img>
                </a>
            </td>
        </tr>
    })

    return (
        <table>
            <thead>
            <tr>
                <th className="title">Title</th>
                <th className="description">Description</th>
                <th className="cost">Cost</th>
                <th className="status">Status</th>
                <th className="edit"></th>
            </tr>
            </thead>
            <tbody>
            {requestEntries}
            </tbody>
        </table>
    );
}