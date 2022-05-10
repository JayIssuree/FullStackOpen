const Total = (props) => {

    let sum = 0;
    props.parts.parts.forEach(element => {
        sum += element.exercises;
    });

    return(
        <p>
            Number of exercises {sum}
        </p>
    )
}

export default Total