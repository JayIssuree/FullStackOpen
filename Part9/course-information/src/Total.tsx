import { Course } from "./Course"

const Total = ({courses}: {courses: Course[]}) => {

    return(
        <div>
            <h1>__________</h1>
            Number of Exercises: {" "}
            {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )

}

export default Total;