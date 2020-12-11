import { AbstractControl } from '@angular/forms';


// Custom validator for the FormGroup in equation component
export class MathValidators {

    static addition(target: string, v1: string, v2: string){

        return (form: AbstractControl) => {
            const sum = form.value[target];
            const num1 = form.value[v1];
            const num2 = form.value[v2];

            if(num1 + num2 === parseInt(sum)){
                return null;
            }
            
            return { addition: true};
        }
    }

}
