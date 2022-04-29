import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { max } from 'rxjs/operators';
import { Show } from 'src/app/_models/show';
import { BookingsService } from 'src/app/_services/bookings.service';
import { ShowsService } from 'src/app/_services/shows.service';

@Component({
  selector: 'app-booking-calendar-list',
  templateUrl: './booking-calendar-list.component.html',
  styleUrls: ['./booking-calendar-list.component.css']
})
export class BookingCalendarListComponent implements OnInit {
  minDate: Date = new Date();
  maxDate: Date = new Date();
  dateSearchForm: FormGroup;
  showsForDate: Show[] = [];
  searchDate: Date;

  constructor(private bookingService: BookingsService, private showService: ShowsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.minDate = new Date("01/01/1970");
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    this.initializeForm();
    this.dateSearchForm.setValue({dateOfShow: new Date()});
    this.getShowsForDate();
    
  }

  initializeForm(){
    this.dateSearchForm = this.fb.group({
      dateOfShow: ['', Validators.required]
    });
  }

  getShowsForDate(){
    this.searchDate = this.dateSearchForm.controls['dateOfShow'].value;
    this.showService.getShowsForDate(this.searchDate)
        .subscribe(response =>{
          console.log(response);
          this.showsForDate = response;
        });
  }

  navigateToShowDetails(showId){
    this.router.navigateByUrl('/booking-calendar/'+showId, {state: {searchDate: this.searchDate}});
  }

}
