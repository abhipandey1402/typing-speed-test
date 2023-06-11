import React from 'react'

const Stats = (
    { wpm,
        accuracy,
        correctChars,
        incorrectChars,
        missedChars,
        extraChars }
) => {
    return (
        <div className='statsBox'>
            <div className='leftStats'>
                <div className="title">WPM</div>
                <div className="subtitle">{wpm}</div>
                <div className="title">Accuracy</div>
                <div className="subtitle">{accuracy}</div>
                <div className="title">Characters</div>
                <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
            </div>
            <div className='righrStats'>
                {/* Graphs goes here */}
            </div>
        </div>
    )
}

export default Stats


