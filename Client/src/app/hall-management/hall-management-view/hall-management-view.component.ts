import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hall } from 'src/app/_models/hall';
import { Show } from 'src/app/_models/show';

@Component({
  selector: 'app-hall-management-view',
  templateUrl: './hall-management-view.component.html',
  styleUrls: ['./hall-management-view.component.css']
})
export class HallManagementViewComponent implements OnInit {

  hall: Hall;
  showsOfHall: Show[] =[];

  constructor(private router: Router,
    private route: ActivatedRoute) {
      //this.accountService.currentUser.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.hall = data.show;
    });
  }

}
