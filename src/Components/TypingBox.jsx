import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useTestMode } from "../Context/TestModeContext";
import UpperMenu from "./UpperMenu"
import Stats from "./Stats";

var randomWords = require('random-words');

const TypingBox = () => {

    const inputRef = useRef(null);
    const { testSeconds } = useTestMode();
    const [countDown, setCountDown] = useState(testSeconds);
    const [testStart, setTestStart] = useState(false)
    const [testEnd, setTestEnd] = useState(false)
    const [intervalId, setIntervalId] = useState(null);
    const [currWordIndex, setCurrWordIndex] = useState(0)
    const [currCharIndex, setCurrCharIndex] = useState(0)
    const [correctChars, setCorrectChars] = useState(0)
    const [incorrectChars, setIncorrectChars] = useState(0)
    const [missedChars, setMissedChars] = useState(0)
    const [extraChars, setExtraChars] = useState(0)
    const [correctWords, setCorrectWords] = useState(0)
    const [graphData, setGraphData] = useState([])

    const [wordsArray, setWordsArray] = useState(() => {
        return randomWords(50)
    })

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null))
    }, [wordsArray])

    useEffect(() => {
        focusInput();
        wordsSpanRef[currWordIndex].current.childNodes[currCharIndex].className = 'current'
    }, [])

    useEffect(() => {
        resetTest();
    }, [testSeconds])

    // implementing timer logic :- whenever user start typing then start
    // countdown and keep timer running till it reach 0
    const startTimer = () => {
        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);
        function timer() {
            setCountDown((latestCountDown) => {
                setCorrectChars((correctChars) => {
                    setGraphData((graphData) => {
                        return [...graphData, [
                            testSeconds - latestCountDown + 1,
                            (correctChars / 5) / ((testSeconds - latestCountDown + 1) / 60)
                        ]]
                    })

                    return correctChars;
                })
                if (latestCountDown === 1) {
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return latestCountDown - 1;
            })
        }
    }

    // implementiong reset logic :- when user change time then
    // all functionality should start working from stratch, like - 
    // blinking at word[0]char[0], new words generated, 
    // reset most of the states to initial value
    const resetTest = () => {
        clearInterval(intervalId)
        setCountDown(testSeconds);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomWords(50));
        resetWordSpanRefClassName();
        focusInput();
    }

    // Reseting className from all words and chars span, and giving
    // className 'current' to word[0]char[0] to for blinking at 0th char as initiality happen.
    const resetWordSpanRefClassName = () => {
        wordsSpanRef.map(i => {
            Array.from(i.current.childNodes).map(j => {
                j.className = '';
            })
        })
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }

    const handleUserInput = (e) => {

        if (!testStart) {
            startTimer();
            setTestStart(true);
        }

        // assigning all current word characters to allCurrChars variable
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        // implementing logic for space button
        if (e.keyCode === 32) {

            let correctCharInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if (correctCharInWord.length === allCurrChars.length) {
                setCorrectWords(correctWords + 1);
            }

            if (allCurrChars.length <= currCharIndex) {
                // removing blinking from right for the last char of any words.
                allCurrChars[currCharIndex - 1].classList.remove('currentRight')
            } else {
                // removing blinking from left when currChar is not the last char of word.
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex))
                allCurrChars[currCharIndex].classList.remove('current')
            }

            // jumping blinking to next word whenever click space button in between typing
            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current'

            // setting currWordIndex to next by increasing +1
            setCurrWordIndex(currWordIndex + 1)

            // setting currCharIndex to 0 :- Now input will be 
            // checked on the next word's first charIndex.
            setCurrCharIndex(0)

            return;
        }

        // Implementing logic for backSpace
        if (e.keyCode === 8) {

            // perform it only when currCharIndex is not at 0, 
            // Bcoz We don't want to interfare in past words.
            if (currCharIndex !== 0) {

                // when currChar is at lastIndex then
                if (currCharIndex === allCurrChars.length) {
                    // if it includes 'extra' that means whatever currChar is thats extra 
                    // input from user which needs to be removed by backSpace.
                    if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += ' currentRight';
                    } else {
                        allCurrChars[currCharIndex - 1].className = 'current';
                    }
                    // set prev Char as currChar to perform input
                    setCurrCharIndex(currCharIndex - 1)
                    return;
                }

                // set currChar's className as null and prev's as current to move blinking 
                // and also set prev char as currChar
                allCurrChars[currCharIndex].className = ''
                allCurrChars[currCharIndex - 1].className = 'current'
                setCurrCharIndex(currCharIndex - 1)
            }
            return;
        }

        // implementing logic for handling extra chars written by user after last char of word.
        if (currCharIndex === allCurrChars.length) {

            // add new input in span and append at the end of that specific word, 
            // give classNames like inCorrect to show user, currentRight to keep blinking at right,
            // extra to perform remove operation later on click of backSpace. and also remove 
            // currentRight from prev char Now at the end update currCharIndex to next by 1

            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'inCorrect extra currentRight'
            allCurrChars[currCharIndex - 1].classList.remove('currentRight')
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1)
            setExtraChars(extraChars + 1);
            return;
        }

        // implementing logic for validation like :- checking if input is right or wrong,
        // if it's right then make text color green by className 'correct' otherwise make
        // it red by className 'inCorrect'
        if (e.key === allCurrChars[currCharIndex].innerText) {
            allCurrChars[currCharIndex].className = 'correct';
            setCorrectChars(correctChars + 1);
        } else {
            allCurrChars[currCharIndex].className = 'inCorrect';
            setIncorrectChars(incorrectChars + 1)
        }
        // give className 'currentRight' and show blinking in right of
        // last char when input char is the last char of word otherwise give 
        // className 'current' to keep blinking at left side of input char.
        if (currCharIndex + 1 == allCurrChars.length) {
            allCurrChars[currCharIndex].className += ' currentRight'
        } else {
            allCurrChars[currCharIndex + 1].className = 'current'
        }
        // updating currCharIndex after every key input
        setCurrCharIndex(currCharIndex + 1)
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    const calculateWPM = () => {
        return Math.round((correctChars / 5) / (testSeconds / 60))
    }

    const calculateAcc = () => {
        return Math.round((correctWords / currWordIndex) * 100)
    }

    return (
        <div>
            <UpperMenu countDown={countDown} />
            {(testEnd) ? (<Stats
                wpm={calculateWPM()}
                accuracy={calculateAcc()}
                correctChars={correctChars}
                incorrectChars={incorrectChars}
                missedChars={missedChars}
                extraChars={extraChars}
                graphData={graphData}
            />) : <div className="typingBox" onClick={focusInput}>
                <div className="words">
                    {
                        wordsArray.map((word, index) => (
                            <span className="word" ref={wordsSpanRef[index]}>
                                {
                                    word.split('').map(char => (
                                        <span className="char">{char}</span>
                                    ))
                                }
                            </span>
                        ))
                    }
                </div>
            </div>}
            <input
                type="text"
                className="hiddenInput"
                onKeyDown={handleUserInput}
                ref={inputRef}
            />
        </div>

    )
}


export default TypingBox;




