function Activity({name, current_dur, previous_dur, period}) {
    const activityColors = {
        'Work': 'light-red',
        'Play': 'soft-blue',
        'Study': 'red',
        'Exercise': 'lime-green',
        'Social': 'violet',
        'Self Care': 'soft-orange',
    };

    return (
    <div className="activity">
        <div className={"activity__image-top" + ` bg--${activityColors[name]}`}></div>
        <p className="activity__name">{name}</p>
        <img src="./images/icon-ellipsis.svg"></img>
        <p className="activity__current-dur">{current_dur}hrs</p>
        <p className="activity__previous-dur">Last {period} - {previous_dur}hrs</p>
    </div>)
}

function User({setPeriod, currentPeriod}) {
    console.log(currentPeriod === "weekly");
    return <div className="user">
        <div className="user__header">
            <img src="./images/image-jeremy.png"></img>
            <div className="user__info">
                <p className="user__report-title">Report for</p>
                <p className="user__name">Jeremy Robson</p>
            </div>
        </div>
        <ul className="user__periods">
            <li onClick={() => setPeriod({"name": "Day", "period": "daily"})} className={currentPeriod === "daily" ? "user__period--active" : ""}>Daily</li>
            <li onClick={() => setPeriod({"name": "Week", "period": "weekly"})} className={currentPeriod === "weekly" ? "user__period--active" : ""}>Weekly</li>
            <li onClick={() => setPeriod({"name": "Month", "period": "monthly"})} className={currentPeriod === "monthly" ? "user__period--active": ""}>Monthly</li>
        </ul>
    </div>
}

function App() {
    const [data, setData] = React.useState([]);
    const [period, setPeriod] = React.useState({"name": "Week", "period": "weekly"});

    React.useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    return (
        <React.Fragment>
            <User currentPeriod={period.period} setPeriod={setPeriod} />
            {data.map((item) => 
                <Activity 
                    key={item.title} 
                    name={item.title} 
                    current_dur={item.timeframes[period.period].current} 
                    previous_dur={item.timeframes[period.period].previous}
                    period={period.name}
                />)
            }
        </React.Fragment>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);