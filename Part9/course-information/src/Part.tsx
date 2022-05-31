import { CoursePart } from "./App"

const Part = ({course}: {course: CoursePart}) => {

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
      
    let part;

    switch(course.type){
        case "normal":
            part = <div>
                <h3> {course.name}: {course.exerciseCount}</h3> 
                {course.description}
            </div>
            break;
        case "groupProject":
            part = <div> 
                <h3> {course.name}: {course.exerciseCount} </h3> 
                <p> Group Projects: {course.groupProjectCount} </p> 
            </div>
            break;
        case "submission":
            part = <div>
                <h3> {course.name}: {course.exerciseCount} </h3> 
                <p> {course.description} </p>
                <p> Submit to: {course.exerciseSubmissionLink} </p>
            </div>
            break;
        case "special":
            part = <div>
            <h3> {course.name}: {course.exerciseCount} </h3> 
            <p> {course.description} </p>
                <p> Required Skills: {course.requirements.join(", ")} </p>
            </div>
            break;
        default:
            return assertNever(course)
    }

    return part

}

export default Part