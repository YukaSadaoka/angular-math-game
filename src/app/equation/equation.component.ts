import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { AnswerHighlightDirective } from '../answer-highlight.directive';

import { MathValidators } from '../math-validators';


@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  constructor() { }
  secondsPerSolution: number = 0;

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  
  ngOnInit(){

    this.mathForm.statusChanges.pipe(
      // Stop the pipeline as soon as the value is invalid
      filter(value => value === 'VALID'),
      delay(150),
      scan((acc) =>{
        return {
          numSolved: acc.numSolved + 1,
          startTime: acc.startTime
        }
      }, { numSolved: 0, startTime: new Date()})
    ).subscribe(({numSolved, startTime}) =>{
      // Calculate the avg solving time
      this.secondsPerSolution = (new Date().getTime() - startTime.getTime()) / numSolved / 1000;

      // If the value is valid, update operands
      this.mathForm.setValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: ''
      });
    })
    
  }

  get a(){ return this.mathForm.value.a; }
  get b(){ return this.mathForm.value.b; }

  randomNumber(){ return Math.floor(Math.random() * 10); }
 
}
