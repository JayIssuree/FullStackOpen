import Part from "./Part"

const Content = (props) => {
    return(
        <div>
            {props.parts.parts.map(item => {
                return <Part parts={item} />
            })}
        </div>
    )
}

export default Content