import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateBooking } from 'src/app/_models/createBooking';
import { Show } from 'src/app/_models/show';
import { ShowSeat } from 'src/app/_models/showSeat';
import { BookingsService } from 'src/app/_services/bookings.service';
import { ShowsService } from 'src/app/_services/shows.service';
import {DatePipe } from '@angular/common';
import { ConfirmService } from 'src/app/_services/confirm.service';

@Component({
  selector: 'app-show-booking-reserve',
  templateUrl: './show-booking-reserve.component.html',
  styleUrls: ['./show-booking-reserve.component.css']
})
export class ShowBookingReserveComponent implements OnInit {
  @Input()show: Show;
  seats: ShowSeat[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  dateSearchForm: FormGroup;
  seatsReserved: string[] = [];
  seatsReservedString: string;
  reserveDate: Date;
  
  constructor(
    private showService: ShowsService, 
    private fb: FormBuilder, 
    private bookingService: BookingsService, 
    private toastr: ToastrService,
    private router: Router, 
    private datePipe: DatePipe,
    private confirmService:ConfirmService) { }

  ngOnInit(): void {
    let tempMin = new Date(this.show.dateStart) > new Date() ? new Date(this.show.dateStart) : (new Date());
    let tempMax = new Date(this.show.dateEnd);
    
    this.minDate = tempMin;
    this.maxDate = tempMax;
    this.initializeForm();
    this.dateSearchForm.setValue({dateOfShow: tempMin});

    this.getSeatsOfShow();
    this.reserveDate = new Date(this.dateSearchForm.controls['dateOfShow'].value);
  }

  initializeForm(){
    this.dateSearchForm = this.fb.group({
      dateOfShow: ['', Validators.required]
    })
  }

  getSeatsOfShow(){
    let model = {
      'showId': this.show.id,
      'showDate': this.dateSearchForm.controls['dateOfShow'].value
    };
    this.showService.getSeatsOfShow(model).subscribe(response =>{
      this.seats = response;
      this.makeSeats2D();
      console.log(this.seats);
    })
  }

  checkboxChecked(values: any){
    console.log(values.target.checked+','+values.target.attributes.id.nodeValue);
    if(values.target.checked){
      this.seatsReserved.push(values.target.attributes.id.nodeValue);
    }
    else{
      for(let i = 0 ; i < this.seatsReserved.length; i++){
        if(this.seatsReserved[i] == values.target.attributes.id.nodeValue){
          this.seatsReserved.splice(i,1);
        }
      }
    }
    this.seatsReservedString = this.seatsReserved.join('-');
  }

  makeReservation(){
    //var givenDate = this.reserveDate.getFullYear()+'-'+(this.reserveDate.getMonth()+1)+'-'+this.reserveDate.getDate();

    let date = this.datePipe.transform(this.reserveDate, 'YYYY-MM-dd');
    this.openReserveConfirmDialog(this.show.title, date).subscribe(ans => {
      if(ans){
        let model = new CreateBooking(this.show.id, date, this.seatsReserved);
        this.bookingService.makeReservation(model).subscribe(response => {
          this.toastr.info('Η κράτηση για την παράσταση '+this.show.title+' στις '+this.datePipe.transform(this.reserveDate, 'dd/MM/yyyy')+' ολοκληρώθηκε με επιτυχία. Έχουν σταλεί τα στοιχεία της κράτησης στο email σας.');
          this.router.navigateByUrl('/');
        },
        error => {
          this.toastr.error(error);
        });
      }
    });
  }

  makeSeats2D(){
    let seats2d = [];
    let rowNo = 0;
    let i = 0;
    while(i < this.seats.length){
      seats2d[rowNo] = [];
      for(let j = 0; j < 6; j++){
        seats2d[rowNo][j] = this.seats[i];
        i++;
        if(i == this.seats.length){
          break;
        }
      }
      rowNo++;
    }
    this.seats = seats2d;
  }

  searchShowSeats(){
    this.seatsReserved = [];
    this.getSeatsOfShow();
    this.reserveDate = new Date(this.dateSearchForm.controls['dateOfShow'].value);
  }

  openReserveConfirmDialog(title: string, date: any){
    return this.confirmService.confirm("Επιβεβαίωση", 'Είστε σίγουροι ότι θέλετε να προχωρήσετε στην κράτηση της παράστασης '+title+' στις '+date+';');
  }

}
