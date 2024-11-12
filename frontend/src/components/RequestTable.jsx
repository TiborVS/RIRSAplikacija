import '../styles/style.css'

export default function RequestTable({ requests, includeUsers }) {
    const requestEntries = requests.map(request => {
        return <tr key={request.id} className="requestRow">
            {includeUsers && <td className="user">{request.user}</td>}
            <td className={"title" + (includeUsers ? " withUser" : "")}>{request.title}</td>
            <td className={"description" + (includeUsers ? " withUser" : "")}>{request.description}</td>
            <td className={"cost" + (includeUsers ? " withUser" : "")}>{request.cost}</td> {/* will need to be formatted at some point, since it probably won't be stored in pretty string form in db */}
            <td className={"status " + "status_" + request.status + (includeUsers ? " withUser" : "")}>
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
    });

    return (
        <table className="requestTable">
            <thead>
            <tr>
                {includeUsers && <th className="user">User</th>}
                <th className={"title" + (includeUsers? " withUser" : "")}>Title</th>
                <th className={"description" + (includeUsers? " withUser" : "")}>Description</th>
                <th className={"cost" + (includeUsers? " withUser" : "")}>Cost</th>
                <th className={"status" + (includeUsers? " withUser" : "")}>Status</th>
                <th className={"edit" + (includeUsers? " withUser" : "")}></th>
            </tr>
            </thead>
            <tbody>
            {requestEntries}
            </tbody>
        </table>
    );
}