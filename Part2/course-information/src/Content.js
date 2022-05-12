import Part from './Part'

const Content = ({parts}) => {

    const total = parts.reduce((sum, currPart) => sum += currPart.exercises, 0)

    return(
        <>
            {parts.map(part => <Part info={part} key={part.id} />)}
            <b> Total of {total} exercises </b>
        </>
    )

}

export default Content