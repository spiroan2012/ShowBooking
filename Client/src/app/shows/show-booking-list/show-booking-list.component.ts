import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Show } from 'src/app/_models/show';
import { ShowParams } from 'src/app/_models/showParams';
import { User } from 'src/app/_models/user';
import { ShowsService } from 'src/app/_services/shows.service';

@Component({
  selector: 'app-show-booking-list',
  templateUrl: './show-booking-list.component.html',
  styleUrls: ['./show-booking-list.component.css']
})
export class ShowBookingListComponent implements OnInit {
  shows: Show[];
  pagination: Pagination;
  showParams: ShowParams;
  user: User;

  constructor(private showsService: ShowsService) { 
    this.showParams = this.showsService.getShowsParams();
  }

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(){
    this.showsService.setShowsParams(this.showParams);
    this.showsService.getShows(this.showParams).subscribe(response =>{
      this.shows = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any){
    this.showParams.pageNumber = event.page;
    this.showsService.setShowsParams(this.showParams);
    this.loadShows();
  }

}
