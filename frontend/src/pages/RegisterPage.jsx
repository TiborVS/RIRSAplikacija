import { useState } from "react";

const serviceName = "[Service Name]";

function RegisterPage() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function submitHandler(event) {
        event.preventDefault();
        setError("");
        if (username.trim().length < 3) {
            setError("Username cannot be shorter than 3 characters!")
        }
        else if (!emailRegex.test(email)) {
            setError("E-mail address not valid!")
        }
        else if (password.length < 5) {
            setError("Password must be at least 5 characters long!")
        }
        else if (password != repeatPassword) {
            setError("Passwords must match!")
        }
        else {
            const data = {
                username: username,
                password: password,
                email: email
            }
            fetch("http://localhost:8000/users/",{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }).then(async (res) => {
                const responseBody = await res.json();
                console.log(responseBody);
                localStorage.setItem("token", responseBody.token);
                localStorage.setItem("username", responseBody.username);
                window.location.replace("/user_requests.html");
            }).catch((res) => {
                console.log(res);
                setError("Unknown error during registration, please try again later.");
            })
        }
    }

    return(
        <>
        <div id="registerTitleContainer">
            <p id="registerTitle">{serviceName}</p>
            <p id="registerSubtitle">Register</p>
        </div>
        <div id="registerFormContainer">
            <form id="registerForm" onSubmit={submitHandler}>
                <table id="registerFormTable">
                    <tbody>
                        <tr>
                            <td><label htmlFor="username">Username</label></td>
                            <td><input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="email">E-mail</label></td>
                            <td><input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Password</label></td>
                            <td><input type="password" name="password" id="password"  data-testid="password" value={password} onChange={(e) => setPassword(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="repeatPassword">Repeat password</label></td>
                            <td><input type="password" name="repeatPassword" id="repeatPassword" data-testid="repeatPassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button className="confirmRegister" type="submit">Register</button>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td id="registerError">{error}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        </>
    );
}

export default RegisterPage;