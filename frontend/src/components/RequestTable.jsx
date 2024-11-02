
export default function RequestTable({ requests }) {
    const requestEntries = requests.map(request => {
        return <tr key={request.id} className="requestRow">
            <td>{request.title}</td>
            <td>{request.description}</td>
            <td>{request.cost}</td> {/* will need to be formatted at some point, since it probably won't be stored in pretty string form in db */}
            <td className={"status_" + request.status}>{request.status}</td>
            <td><button className="editButton"><a href={"edit.html?id=" + request.id}>icon here</a></button></td>
        </tr>
    })

    return (
        <table>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Status</th>
            </tr>
            {requestEntries}
        </table>
    );
}