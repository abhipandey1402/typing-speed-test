import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
    box-sizing: border-box;
}

body{
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    transition: all 0.25s linear;
}

.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    align-items: center;
    text-align: center;
    width: 100vw;
    gap: 0.5rem;
    padding: 2rem;
}

.typingBox {
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.words{
    display: flex;
    flex-flow: row wrap;
    font-size: 25px;
    color: ${({ theme }) => theme.typeBoxText}
}

.word {
    margin: 5px;
    padding-right: 2px;
}

.hiddenInput {
    opacity: 0;
}





.testSeconds:hover {
    color: green;
}

.upperMenu {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px
}

.testTime {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
.testMode {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.current {
    border-left: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;

    @keyframes blinking {
        0%{
            border-left-color: ${({ theme }) => theme.textColor};
        }
        25%{
            border-left-color: ${({ theme }) => theme.background};
        }
        50%{
            border-left-color: ${({ theme }) => theme.textColor};
        }
        75%{
            border-left-color: ${({ theme }) => theme.background};
        }
        100%{
            border-left-color: ${({ theme }) => theme.textColor};
        }
    }
}

.currentRight {
    border-right: 1px solid;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;

    @keyframes blinkingRight {
        0%{
            border-right-color: ${({ theme }) => theme.textColor};
        }
        25%{
            border-right-color: ${({ theme }) => theme.background};
        }
        50%{
            border-right-color: ${({ theme }) => theme.textColor};
        }
        75%{
            border-right-color: ${({ theme }) => theme.background};
        }
        100%{
            border-left-color: ${({ theme }) => theme.textColor};
        }
    }
}

.correct {
    color: ${({ theme }) => theme.textColor};
}

.inCorrect {
    color: red;
}


.footer {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.statsBox {
    display: flex;
    width: 1000px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.leftStats {
    width: 30%;
    padding: 30px;
}

.rightStats {
    width: 70%;
}

.title {
    font-size: 20px;
    color: ${({ theme }) => theme.typeBoxText}
}

.subtitle {
    font-size: 30px;
}









`


