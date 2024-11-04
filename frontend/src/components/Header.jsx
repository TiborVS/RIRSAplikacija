
import '../styles/style.css'

export default function Header({siteTitle, username, isAdmin}) {

    function logOutClickHandler() {
        window.alert("Log out button pressed!");
    }
    
    return(
        <div id="header">
            <h1>{siteTitle}</h1>
            {isAdmin && <h3>Admin</h3>}
            <div id="userBlock">
                <span id="username">{username}</span>
                <button onClick={logOutClickHandler}>Log out</button>
            </div>
        </div>
    );
}
