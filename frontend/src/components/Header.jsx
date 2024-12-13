export default function Header({siteTitle, username, isAdmin}) {

    function logOutClickHandler() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.replace("/");
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
