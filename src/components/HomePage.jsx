import LoginBox from "./LoginBox.jsx";
import '../styles/HomePage.css'

function HomePage({ onLoginButtonClick }) {
    return (
        <>
            <div className="login-container">
                <LoginBox onLoginButtonClick={onLoginButtonClick} />
            </div>
        </>
    );
}


export default HomePage;