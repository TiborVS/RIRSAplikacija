
import '../styles/style.css'

export default function Header({siteTitle, username}) {

    function clickHandler() {
        window.alert("Meow!");
    }
    
    return(
        <div id="header">
            <h1>{siteTitle}</h1>
            <div id="userBlock">
                <span id="username">{username}</span>
                <button onClick={clickHandler}>Log out</button>
            </div>
        </div>
    );
}
