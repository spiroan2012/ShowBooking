import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/app/_models/booking';
import { Show } from 'src/app/_models/show';
import { BookingsService } from 'src/app/_services/bookings.service';
import { InfoService } from 'src/app/_services/info.service';

@Component({
  selector: 'app-booking-calendar-bookings',
  templateUrl: './booking-calendar-bookings.component.html',
  styleUrls: ['./booking-calendar-bookings.component.css']
})
export class BookingCalendarBookingsComponent implements OnInit {
  @Input() show: Show;
  @Input() showDate: Date;
  bookings: Booking[] = [];
  totalSeats = 0;
  totalAppeared = 0;
  percentOfBooked: number;
  percentOfAppeared: number;

  constructor(private bookingService: BookingsService, private infoService: InfoService) { }

  ngOnInit(): void {
    this.getBookingOfShow();
  }

  getBookingOfShow(){
    this.bookingService.getBookingsForShow(this.show.id, this.showDate).subscribe(response => {
      console.log(response);

      this.bookings = response;
      this.calculateStatistics();
    })
  }

  openSeatsModal(index){
    return this,this.infoService.info('Θέσεις', this.bookings[index].seats.join('-'));
  }

  calculateStatistics(){
    this.bookings.forEach(element => {
      this.totalSeats+= element.numOfSeats
      if(element.appeared){
        this.totalAppeared += element.numOfSeats
      }
    });
    this.percentOfBooked = Math.round((this.totalSeats / this.show.hallCapacity) * 100);
    this.percentOfAppeared = Math.round((this.totalAppeared / this.totalSeats) * 100);
  }


}
