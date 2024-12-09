const serviceName = "[Service Name]";

function LoginPage() {
    return(
        <>
        <div id="loginTitleContainer">
            <p id="loginTitle">{serviceName}</p>
            <p id="loginSubtitle">Login</p>
        </div>
        <div id="loginFormContainer">
            <form id="loginForm">
                <table id="loginFormTable">
                    <tr>
                        <td><label htmlFor="username">Username</label></td>
                        <td><input type="text" name="username" id="username" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password">Password</label></td>
                        <td><input type="password" name="password" id="password" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className="confirmLogin" type="button" onClick={() => { window.location.replace("/user_requests.html"); }}>Log in</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td id="loginError"></td>
                    </tr>
                </table>
            </form>
        </div>
        </>
    );
}

export default LoginPage;