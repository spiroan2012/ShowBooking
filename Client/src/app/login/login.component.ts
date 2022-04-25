import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  validationErrors: string[] = [];
  model

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    this.accountService.login(this.loginForm.value).subscribe(response =>{
      
      //console.log("Login success");
      if(response.isDisabled){
        this.toastr.error('Ο λογαριασμός σας έχει απενεργοποιηθεί από τους διαχειριστές');
      }
      else{
        this.router.navigateByUrl('/show-booking');
      }
      
    }, error =>{
      console.log("There was an error "+error.error);
    });
  }

  cancel(){
    
  }
}
