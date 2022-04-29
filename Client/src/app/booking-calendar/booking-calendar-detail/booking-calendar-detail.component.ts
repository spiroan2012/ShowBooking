import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Show } from 'src/app/_models/show';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-booking-calendar-detail',
  templateUrl: './booking-calendar-detail.component.html',
  styleUrls: ['./booking-calendar-detail.component.css']
})
export class BookingCalendarDetailComponent implements OnInit {
  @ViewChild('showTabs', {static: true}) showTabs: TabsetComponent;
  show: Show;
  activeTab: TabDirective;
  user: User;
  @Input() showDate: Date;

  constructor(private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
      this.accountService.currentUser.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.showDate = new Date(history.state.searchDate);
    console.log(this.showDate);
    this.route.data.subscribe(data =>{
      this.show = data.show;
    });

    this.route.queryParams.subscribe(params => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });
  }

  selectTab(tabId: number){
    this.showTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
  }

}
