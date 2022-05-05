import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Hall } from 'src/app/_models/hall';
import { HallParams } from 'src/app/_models/hallParams';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { HallsService } from 'src/app/_services/halls.service';

@Component({
  selector: 'app-hall-management-index',
  templateUrl: './hall-management-index.component.html',
  styleUrls: ['./hall-management-index.component.css']
})
export class HallManagementIndexComponent implements OnInit {
  pagination: Pagination;
  hallParams: HallParams;
  halls: Hall[] = [];
  user: User;

  constructor(private hallService: HallsService, private confirmService: ConfirmService,private toastr: ToastrService ) {
    this.hallParams = this.hallService.getHallParams();
   }

  ngOnInit(): void {
    this.loadHalls();
  }

  loadHalls(){
    this.hallService.setHallParams(this.hallParams);
    this.hallService.getHalls(this.hallParams).subscribe(response =>{
      this.halls = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any){
    this.hallParams.pageNumber = event.page;
    this.hallService.setHallParams(this.hallParams);
    this.loadHalls();
  }

}
