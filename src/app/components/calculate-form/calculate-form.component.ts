import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserData } from 'src/app/UserData';
@Component({
  selector: 'app-calculate-form',
  templateUrl: './calculate-form.component.html',
  styleUrls: ['./calculate-form.component.css']
})
export class CalculateFormComponent implements OnInit {
  @Output() onRunCalc: EventEmitter<UserData> = new EventEmitter()

  //Input values for the user
  age!: number;
  weight!: number;
  height!: number;
  goalWeight!: number;

  //Hides the calculated values/paragraph until form is submitted
  isShow = true;

  //Store calculated values in their own variable to be displayed.
  BMI!: number;
  BMRF!: number;
  BMRM!: number;
  calroieAdjLength!: number;

  paragraph!: string;
  bmiSummary!: string;
  suggest!: string;

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    //If there is no value, let the user know to fill out all fields
    if (!this.weight) {
      alert("Please fill out all fields")
      return;
    }
    //Show the calculated values and resulting paragraph
    this.isShow = false;
    //Store user input into an object, Post-MVP = push to a db to store values and trach progess 
    const newCalc = {
      age!: this.age,
      weight: this.weight,
      height: this.height,
      goalWeight: this.goalWeight
    }

    //Calculate the BMI
    const BMI = (this.weight) / ((this.height) * (this.height)) * 703

    //Calculate the average BMR for females
    const BMRM = 66.47 + (6.24 * this.weight) + (12.7 * this.height) - (6.755 * this.age) - 500

    //Calculate the average BMR for males
    const BMRF = 655.1 + (4.35 * this.weight) + (4.7 * this.height) - (4.7 * this.age) - 500

    //Calculate the adjuested calories to lose one pound of body fat per week
    const calroieAdjLength = ((this.weight - this.goalWeight) * 3500) / 500 / 7

    this.paragraph = ("The calculated BMR for an individual with the given values is approximately " + (BMRF + 500).toFixed(2) +
      " calories for the average female and " + (BMRM + 500).toFixed(2) +
      " calories for the average male. If you continue to eat this amount of calories a day, you can maintain this weight. Additionally, your body mass index, or BMI, is calcualted to be " + (BMI).toFixed(2))

    if ((BMI) < 18.5) {
      this.bmiSummary = (
        "According to Medical News Today, a BMI of " + (BMI).toFixed(2) + " indicates that you are underweight, so you may need to put on some weight. It is recommended to ask your doctor or a dietitian for advice." )
    } else if ((BMI) > 18.5 && (BMI) < 24.9) {
      this.bmiSummary = (
        "According to Medical News Today, a BMI of " + (BMI).toFixed(2) + " indicates that you are at a healthy weight for your height. By maintaining a healthy weight, you lower your risk of developing serious health problems." )
    } else if ((BMI) > 25 && (BMI) < 29.9) {
      this.bmiSummary = (
        "According to Medical News Today, a BMI of " + (BMI).toFixed(2) + " indicates that you are slightly overweight. You may be advised to lose some weight for health reasons. It is recommended to talk to your doctor or a dietitian for advice." )
    } else if ((BMI) > 30) {
      this.bmiSummary = (
        "According to Medical News Today, a BMI of " + (BMI).toFixed(2) + " indicates that you are heavily overweight. Your health may be at risk if you do not lose weight. It is recommended to talk to your doctor or a dietitian for advice." )
    } else {
      this.bmiSummary = (
        (BMI).toFixed(2))
    }




    if (this.goalWeight < this.weight) {
      this.suggest = (
        "If you wanted to lose 1 pound a week you would need to adjust your daily caloric intake to " +
        (BMRF).toFixed(2) + " calories for females and " + (BMRM).toFixed(2) +
        " calories for males. These caloric values do not account for daily exercise activity and may need to be adjusted as exercise is included. In this 500 calorie deficit, it would take you " + calroieAdjLength +
        " weeks to reach your goal."
      );
    } else if (this.goalWeight = this.weight) {
      this.suggest = (
        "If you wanted to maintain your current weight, you can stick to " +
        (BMRF + 500).toFixed(2)  + " calories for females and " + (BMRM + 500).toFixed(2) +
        " calories for males. These caloric values do not account for daily exercise activity and may need to be adjusted as exercise is included."
      );
    } else {
      this.suggest = (
        "If you wanted to gain 1 pound a week you would need to adjust your daily caloric intake to " +
        (BMRF + 1000).toFixed(2) + " calories for females and " + (BMRM + 1000).toFixed(2) +
        " calories for males. These caloric values do not account for daily exercise activity and may need to be adjusted as exercise is included. With this 500 calorie surplus, it would take you " + (-1) * calroieAdjLength +
        " weeks to reach your goal.")
    }
    //Reset values to 0 after form is inputted
    // this.onRunCalc.emit(newCalc)
    // this.age =0,
    // this.weight = 0,
    // this.height = 0,
    // this.goalWeight = 0

    //Console log values, check for errors along the way
    // console.log(newCalc)
    // console.log(BMI)
    // console.log(BMRF)
    // console.log(BMRM)
    // console.log(calroieAdjLength)

  }
}
