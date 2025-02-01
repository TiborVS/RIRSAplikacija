import { useState } from "react";

const serviceName = "[Service Name]";

function LoginPage() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submitHandler(event) {
        event.preventDefault();
        setError("");
        if (username.trim().length < 1) {
            setError("Username cannot be empty!")
        }
        else if (password.length < 1) {
            setError("Password cannot be empty!")
        }
        else {
            const data = {
                username: username,
                password: password
            }
            fetch(process.env.VITE_API_LOCATION + "/users/login/",{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(async (res) => {
                const responseBody = await res.json();
                console.log(responseBody);
                if (!res.ok) {
                    setError(responseBody.detail);
                    return;
                }
                localStorage.setItem("token", responseBody.token);
                localStorage.setItem("username", responseBody.username);
                window.location.replace("/user_requests.html");
            }).catch((res) => {
                console.log(res);
                setError("Unknown error during login, please try again later.");
            })
        }
    }

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
                        <td><input type="text" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password">Password</label></td>
                        <td><input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className="confirmLogin" type="button" onClick={submitHandler}>Log in</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td id="loginError">{error}</td>
                    </tr>
                </table>
            </form>
        </div>
        </>
    );
}

export default LoginPage;