import { Component, Input, OnInit } from '@angular/core';
import { Show } from 'src/app/_models/show';

@Component({
  selector: 'app-show-booking-card',
  templateUrl: './show-booking-card.component.html',
  styleUrls: ['./show-booking-card.component.css']
})
export class ShowBookingCardComponent implements OnInit {
  @Input() show: Show;

  constructor() { }

  ngOnInit(): void {
  }

}
