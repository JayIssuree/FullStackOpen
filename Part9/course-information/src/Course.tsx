export interface Course {
    name: string;
    exerciseCount: number;
}

export const CourseInformation = ({course}: {course: Course}) => {

    return(
        <p>
            {course.name}: {course.exerciseCount}
        </p>
    )

}