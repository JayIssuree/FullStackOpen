import Header from "./Header";
import StatisticsLine from "./StatisticsLine";

const Statistics = ({data}) => {
    
    const total = data.good + data.neutral + data.bad

    const calculateAverage = () => {
        return (data.good - data.bad)/total
    }

    const positivePercent = () => {
        return data.good / total
    }

    const render = () => {
        if(total > 0){
            return(
                <table>
                    <StatisticsLine text="Good" value={data.good} />
                    <StatisticsLine text="Neutral" value={data.neutral} />
                    <StatisticsLine text="Bad" value={data.bad} />
                    <StatisticsLine text="All" value={total} />
                    <StatisticsLine text="Average" value={calculateAverage()} />
                    <StatisticsLine text="Positive" value={positivePercent()} />
                </table>
            )
        } else {
            return(
                <div>
                    No Feedback Given
                </div>
            )
        }
    }

    return(
        <>
            <Header text="Statistics" />
            {render()}
        </>
    )

}

export default Statistics