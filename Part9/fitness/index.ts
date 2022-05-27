import express from 'express'
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json())

app.get('/bmi', (req, res) => {
  const height:number = Number(req.query.height)
  const weight:number = Number(req.query.weight)
  const bmi:string = calculateBmi(height, weight)
  res.json({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  const daily_exercises: number[] = req.body.daily_exercises;
  const target: number = req.body.target
  res.json(calculateExercises(daily_exercises, target))
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});