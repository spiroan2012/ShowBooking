import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Show } from 'src/app/_models/show';
import { ShowParams } from 'src/app/_models/showParams';
import { User } from 'src/app/_models/user';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { InfoService } from 'src/app/_services/info.service';
import { ShowsService } from 'src/app/_services/shows.service';

@Component({
  selector: 'app-show-management-index',
  templateUrl: './show-management-index.component.html',
  styleUrls: ['./show-management-index.component.css']
})
export class ShowManagementIndexComponent implements OnInit {
  @Input() hallId: number = -1;
  pagination: Pagination;
  showParams: ShowParams;
  shows: Show[] = [];
  user: User;

  constructor(private showsService: ShowsService, private confirmService: ConfirmService,private toastr: ToastrService ) {
    this.showParams = this.showsService.getShowsParams();
   }

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(){
    this.showsService.setShowsParams(this.showParams);
    if(this.hallId != -1){
      this.showsService.getShowsForHall(this.hallId).subscribe(response =>{
        this.shows = response;
      });
    }
    else{
      this.showsService.getShows(this.showParams).subscribe(response =>{
        this.shows = response.result;
        this.pagination = response.pagination;
      });
    }

  }

  deleteShow(showId: number, showTitle: string){
    this.openDeleteConfirmDialog(showTitle).subscribe(ans =>{
      if(ans){
        this.showsService.deleteShow(showId).subscribe(() =>{
          this.toastr.info("Επιτυχής διαγραφή της παράστασης "+showTitle);
          this.loadShows();
          this.showParams.pageNumber = 1;
        },
        error =>{
          this.toastr.error("Υπήρξε σφάλμα κατά την διαγραφή της παράστασης");
        });
      }
    });
  }

  pageChanged(event: any){
    this.showParams.pageNumber = event.page;
    this.showsService.setShowsParams(this.showParams);
    this.loadShows();
  }

  openDeleteConfirmDialog(title: string){
    return this.confirmService.confirm("Είστε σίγουροι ότι θέλετε να διαγράψετε την παράσταση "+title);
  }

}
