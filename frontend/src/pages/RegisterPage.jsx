const serviceName = "[Service Name]";

function RegisterPage() {
    return(
        <>
        <div id="registerTitleContainer">
            <p id="registerTitle">{serviceName}</p>
            <p id="registerSubtitle">Register</p>
        </div>
        <div id="registerFormContainer">
            <form id="registerForm">
                <table id="registerFormTable">
                    <tr>
                        <td><label htmlFor="username">Username</label></td>
                        <td><input type="text" name="username" id="username" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="password">Password</label></td>
                        <td><input type="password" name="password" id="password" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="repeatPassword">Repeat password</label></td>
                        <td><input type="password" name="repeatPassword" id="repeatPassword" /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className="confirmRegister">Register</button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td id="registerError"></td>
                    </tr>
                </table>
            </form>
        </div>
        </>
    );
}

export default RegisterPage;