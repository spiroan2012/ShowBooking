import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Show } from 'src/app/_models/show';
import { ShowSeat } from 'src/app/_models/showSeat';
import { ShowsService } from 'src/app/_services/shows.service';

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
  
  constructor(private showService: ShowsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    let tempMin = new Date(this.show.dateStart) > new Date() ? new Date(this.show.dateStart) : (new Date());
    let tempMax = new Date(this.show.dateEnd);
    
    this.minDate = tempMin;
    this.maxDate = tempMax;
    this.initializeForm();
    this.dateSearchForm.setValue({dateOfShow: tempMin});

    this.getSeatsOfShow();
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
      console.log(this.seats);
    })
  }

  searchShowSeats(){}

}
