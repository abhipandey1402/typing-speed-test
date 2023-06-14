
import { useState } from "react"
import Select from "react-select"
import { themeOptions } from "../Utils/themeOptions"
import { useTheme } from "../Context/ThemeContext"
import github from '../Assets/github.svg'
import linkedin from '../Assets/linkedin.svg'


const Footer = () => {
    const { setTheme, theme } = useTheme();

    const handleChange = (e) => {
        setTheme(e.value)
        localStorage.setItem('theme', JSON.stringify(e.value));
    }
    return (

        <div className="footer">
            <div className="footerLinks" style={{ display: 'flex', gap: '10px' }}>
                <a href="https://github.com/abhipandey1402/typing-speed-test" target="_blank" rel="noreferrer"><img src={github} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} /></a>
                <a href="https://linkedin.com/in/abhipandey1402" target="_blank" rel="noreferrer"><img src={linkedin} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} /></a>
            </div>
            <div className="themeButton">
                <Select
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement="top"
                    defaultValue={{ label: theme.label, value: theme }}
                    styles={{
                        control: styles => ({ ...styles, backgroundColor: theme.background }),
                        menu: styles => ({ ...styles, backgroundColor: theme.background }),
                        option: (styles, { isFocused }) => {
                            return {
                                ...styles,
                                backgroundColor: (!isFocused) ? theme.background : theme.textColor,
                                color: (!isFocused) ? theme.textColor : theme.background,
                                cursor: 'pointer'
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Footer


