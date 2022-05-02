import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Show } from 'src/app/_models/show';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-show-management-view',
  templateUrl: './show-management-view.component.html',
  styleUrls: ['./show-management-view.component.css']
})
export class ShowManagementViewComponent implements OnInit {
  show: Show;
  user: User;

  constructor(private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute) {
      this.accountService.currentUser.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    this.route.data.subscribe(data =>{
      this.show = data.show;
    });
  }

}
