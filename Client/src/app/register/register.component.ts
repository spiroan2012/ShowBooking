import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate:Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.checkYearOfDate()]],
      password: ['', [Validators.required, this.testPattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'pass')]],
      email: ['', [Validators.required, this.testPattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email')]],
      confirmPassword: ['', [Validators.required,this.matchValues('password')]]
    });

    this.registerForm.controls.password.valueChanges.subscribe(() =>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value
       ? null : {isMatching: true}
    }
  }

  testPattern(regExp, type): ValidatorFn{
    //const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (control: AbstractControl) =>{
      const valid = regExp.test(control.value);
      if(type === 'pass')
        return valid ? null : { invalidPatternPass: true };
      else
      return valid ? null : { invalidPatternEmail: true };
    }
  }

  checkYearOfDate(){
    return (control: AbstractControl) =>{
      const dateYear = new Date(control.value).getFullYear();
      const currentYear = new Date().getFullYear();
      if(currentYear - dateYear < 13){
        return {hasAgeRestrict: true}
      }
      else{
        return null;
      }
    }
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(
      response => {
        this.router.navigateByUrl('/members');
        this.cancel();
      },
      error => {
        this.validationErrors = error;
      }
    );
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
