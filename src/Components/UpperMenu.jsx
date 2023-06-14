import { useTestMode } from "../Context/TestModeContext"


const UpperMenu = ({ countDown }) => {

    const { setTestSeconds } = useTestMode();

    const updateTestTime = (e) => {
        setTestSeconds(Number(e.target.id));
    }

    return (
        <div className="upperMenu">
            <div className="countDown">
                {countDown}
            </div>
            {/* <div className="testMode">
                <div>Mode -</div>
                <div>Time</div>
                <div>Word</div>
            </div> */}
            <div className="testTime">
                <div className="testSeconds" id={15} onClick={updateTestTime}>15s</div>
                <div className="testSeconds" id={30} onClick={updateTestTime}>30s</div>
                <div className="testSeconds" id={60} onClick={updateTestTime}>60s</div>
            </div>
        </div>
    )
}


export default UpperMenu



