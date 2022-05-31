import { CoursePart } from "./App"
import Part from "./Part"

const Content = ({courses}: {courses: CoursePart[]}) => {

    const courseList: JSX.Element[] = courses.map((course, index) => <Part key={index + 1} course={course} />)

    return(
        <div>
            {courseList}
        </div>
    )

}

export default Content