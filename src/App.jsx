import {useState} from 'react'
import './styles/App.css'
import HomePage from "./components/HomePage.jsx";
import Background from "./components/Background.jsx";
import DreamPromptBox from "./components/DreamPromptBox.jsx";
import ImageBox from "./components/ImageBox.jsx";
function App() {

    const [isLoginVisible, setLoginVisible] = useState(true);
    const [isDreamPromptBoxVisible, setDreamPromptBoxVisible] = useState(false);
    const [isImageBoxVisible, setImageBoxVisible] = useState(false);
    const [imageData, setImageData] = useState('');

    // Hide login box and show dream prompt box.
    const handleLoginButtonClick = () => {
        setLoginVisible(false);
        setDreamPromptBoxVisible(true);
    };

    // Hide dream prompt box and show image box.
    const handleOnInterpretButtonClick = (data) => {
        setDreamPromptBoxVisible(false);
        setImageBoxVisible(true);
        handleImageUpdate(data);
    };

    // Update image data received from server.
    const handleImageUpdate = (data) => {
        setImageData(data);
    };

    // Let user return to dream prompt box.
    const handleRefresh = () => {
        setDreamPromptBoxVisible(true);
        setImageBoxVisible(false);
    };


    return (
        <>
            <div className="header">
                <h2 className="logo">dreamscape.ai</h2>
                <p>
                    <em>
                        Using the power of AI to turn your dreams into stunning AI-generated images. Share
                        your dreams, and watch them come to life in captivating artwork.
                    </em>
                </p>
            </div>

            <div className={'background'}>
                <Background/>
            </div>

            {/* Conditional rendering of main interactive components. */}
            <div className="main-view">
                {isLoginVisible ? (
                    <HomePage onLoginButtonClick={handleLoginButtonClick}/>
                ) : null}
                {isDreamPromptBoxVisible ? (
                    <DreamPromptBox onInterpretButtonClick={handleOnInterpretButtonClick}/>
                ) : null}
                {isImageBoxVisible ? (
                    <ImageBox imageData={imageData} onRefreshButtonClick={handleRefresh}/>
                ) : null}
            </div>
        </>
    );
}

export default App;