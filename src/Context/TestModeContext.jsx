const { createContext, useState, useContext } = require("react");



const TestModeContext = createContext();


export const TestModeContextProvider = ({ children }) => {

    const [testMode, setTestMode] = useState('time')
    const [testSeconds, setTestSeconds] = useState(15)
    const [testWords, setTestWords] = useState(10)

    const values = {
        testMode,
        setTestMode,
        testSeconds,
        setTestSeconds,
        testWords,
        setTestWords
    }

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}


export const useTestMode = () => useContext(TestModeContext);


