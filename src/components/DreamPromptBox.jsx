import React, {useEffect, useState, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import '../styles/DreamPromptBox.css';

function DreamPromptBox({onInterpretButtonClick}) {
    const [dreamText, setDreamText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const handleInterpretClick = () => {
        // Define the API endpoint URL
        setIsLoading(true);
        const apiUrl = 'https://frabjous-heliotrope-3148d9.netlify.app/generate_image/';

        // Create a JSON object with the description box text
        const requestBody = {
            userPrompt: dreamText,
        };

        // Call DreamScape server to generate the image.
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error while generating image');
                }
                return response.json();
            })
            .then((data) => {
                // Extract the URL from the response data
                const imageUrl = data.data[0].url;

                // Trigger the callback function to send the URL to the App().
                onInterpretButtonClick(imageUrl);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Max word count function. Prevent users from consuming too many OpenAI tokens.
    useEffect(() => {
        const maxWordCount = 150;
        const textarea = document.getElementById("dreamTextArea");
        const wordCount = document.getElementById("wordCount");

        textarea.addEventListener("input", function () {
            const words = textarea.value.split(/\s+/);
            const currentWordCount = words.length;
            wordCount.textContent = currentWordCount + "/150 words";

            if (currentWordCount > maxWordCount) {
                wordCount.style.color = "red";

                // Trim the text to the maximum word count
                const trimmedText = words.slice(0, maxWordCount).join(" ");
                textarea.value = trimmedText;
            } else {
                wordCount.style.color = "black";
            }
        });
    }, []);


    return (
        <>
            <div className={"prompt-box"}>
                <div className="header-container">
                    <h3 className={"header-description"}>describe your dream ... </h3>
                    <div className = "button-container">
                        <Button className="overlay-button" ref={target} onClick={() => setShow(!show)}>
                            ℹ️
                        </Button>
                        <Overlay target={target.current} show={show} placement="right">
                            {({
                                  placement: _placement,
                                  arrowProps: _arrowProps,
                                  show: _show,
                                  popper: _popper,
                                  hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                  ...props
                              }) => (
                                <div className={"overlay-text"}
                                    {...props}
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'rgba(217, 217, 217, 0.85)',
                                        padding: '2px 10px',
                                        color: 'black',
                                        borderRadius: 3,
                                        ...props.style,
                                    }}
                                >
                                    <strong>Welcome to Dreamscape.ai!</strong> <br/>
                                    Using the power of AI to turn your dream descriptions into stunning AI-generated images. Share your dreams, and watch them come to life in captivating artwork.
                                    Describe your dream in ~150 words to be interpreted and submit to create an AI-generated image describing your dream.
                                    <br/>
                                    <br/>
                                    * As a guest user, you will not be able to save your images and prompts for viewing later.
                                    <br/>
                                    * As the AI models are trained primarily in English, non-English text will be <strong>translated</strong> into English for prompting.

                                </div>
                            )}
                        </Overlay>
                    </div>
                </div>
                <form>
                    <label>
                    <textarea
                        className="dream-text-box"
                        id="dreamTextArea"
                        placeholder="Today I dreamt that I was a bird flying over Tokyo, and ..."
                        value={dreamText}
                        onChange={(e) => setDreamText(e.target.value)}
                    ></textarea>
                    </label>
                    <p className={'word-count'} id="wordCount">
                        {dreamText.split(/\s+/).length}/150
                    </p>
                    {isLoading ? (
                        <img
                            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                            alt="Loading..."
                            className="loading-gif"
                        />
                    ) : (
                        <>
                            <button
                                className="submit-button"
                                type="button"
                                onClick={handleInterpretClick}
                            >
                                interpret
                            </button>
                        </>
                    )}
                </form>
            </div>
        </>
    );
}

export default DreamPromptBox;