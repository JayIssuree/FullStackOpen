import Part from "./Part"

const Content = (props) => {
    return(
        <div>
            <Part info={props.data.part1} />
            <Part info={props.data.part2} />
            <Part info={props.data.part3} />
        </div>
    )
}

export default Content