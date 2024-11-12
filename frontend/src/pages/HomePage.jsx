import '../styles/style.css'

const serviceName = "[Service Name]";

function HomePage() {
  return (
    <>
    <div id="titleContainer">
        <p id="welcome">Welcome to</p>
        <p id="title">{serviceName}</p>
    </div>
    <div id="homePageButtons">
        <button className="login">
            <a href="login.html" className="login">Login</a>
        </button>
        <button className="register">
            <a href="register.html" className="register">Register</a>
        </button>
    </div>
    </>
  )
}

export default HomePage
