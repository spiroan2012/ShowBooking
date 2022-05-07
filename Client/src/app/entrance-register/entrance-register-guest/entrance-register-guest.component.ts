import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/_models/booking';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { BookingsService } from '../../_services/bookings.service';
import { InfoService } from '../../_services/info.service';

@Component({
  selector: 'app-entrance-register-guest',
  templateUrl: './entrance-register-guest.component.html',
  styleUrls: ['./entrance-register-guest.component.css']
})
export class EntranceRegisterGuestComponent {
  bookingsFound: Booking[] = [];
  fileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailAddress: new FormControl('', [Validators.required, , this.testPattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email')])
  });

  fileToUpload: any;

  constructor(private bookingService: BookingsService, private infoService: InfoService, private confirmService: ConfirmService, private toastr: ToastrService) {
  }

  handleFileInput(e: any) {
    this.fileToUpload = e?.target?.files[0];
  }

  openAddSuccessModal(title, description){
    return this,this.infoService.info(title, description);
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

  saveFileInfo(){
    const formData: FormData = new FormData();
    formData.append('myFile', this.fileToUpload);
    formData.append('firstName', this.fileForm.value.firstName);
    formData.append('lastName', this.fileForm.value.lastName);
    formData.append('emailAddress', this.fileForm.value.emailAddress);

    this.bookingService.searchForBookingForUser(formData).
    subscribe(response => {
      if(response?.length == 0 || response == null){
        this.openAddSuccessModal("Προσοχή", "Δεν βρέθηκαν κρατήσεις με τα στοιχεία που δώσατε");
      }
      else{
        this.bookingsFound = response;
      }
    }, 
    error => {
      console.log(error);
    });
  }

  openSeatsModal(index){
    console.log(this.bookingsFound[index])
    return this,this.infoService.info('Θέσεις', this.bookingsFound[index].seats.join('-'));
  }

  setAppear(bookingId, index){
    this.openUpdateConfirmDialog().subscribe(ans =>{
      if(ans){
        this.bookingService.updateBookingToAppeared(bookingId).subscribe(response =>{
          this.toastr.info("Επιτυχής κοινοποίηση εισόδου για την παράσταση");
          this.bookingsFound.splice(index, 1);
        }, error=>{
          this.toastr.error(error);
        });
      }
    },error=>{
      console.log(error);
    });
    
  }

  openUpdateConfirmDialog(){
    return this.confirmService.confirm("Ειστε σίγουροι ότι θέλετε να κοινοποιήσετε την είσοδό σας στην παράσταση;");
  }
}
