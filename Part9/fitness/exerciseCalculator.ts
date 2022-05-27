interface exerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: ratingDescription,
    target: number,
    average: number
};

type ratingDescription = "Not too bad but could be better" | "Good job, keep it up, I'm proud of you" | "Room for improvement"

const calculateExercises = (weeklySchedule: number[], target: number): exerciseResult => {
    let sum:number = 0;
    weeklySchedule.forEach(day => sum += day);
    const average:number = sum/weeklySchedule.length
    let rating:number;
    let ratingDescription: ratingDescription;

    if(average >= target){
      rating = 3;
      ratingDescription = "Good job, keep it up, I'm proud of you";
    } else if(average >= target*0.8){
      rating = 2;
      ratingDescription = "Not too bad but could be better";
    } else {
      rating = 1;
      ratingDescription = "Room for improvement"
    }

    return {
        periodLength: weeklySchedule.length,
        trainingDays: weeklySchedule.filter(day => day > 0).length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

interface exerciseValues {
    target: number;
    weeklySchedule: number[];
  };
  
  const parseExerciseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let target:number = 0;
    let weeklySchedule:number[] = [];
    
    for(let i:number = 2; i < args.length; i++){
        if(isNaN(Number(args[i]))){
            throw new Error('Provided values were not numbers!');
        } else {
            if(i === 2){
                target = Number(args[i])
            } else {
                weeklySchedule.push(Number(args[i]))
            }
        }
    }

    return{
        target: target,
        weeklySchedule: weeklySchedule
    }
  
  };
  
  try {
    const { target, weeklySchedule } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(weeklySchedule, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

export default calculateExercises