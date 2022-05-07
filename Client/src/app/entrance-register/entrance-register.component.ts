import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-entrance-register',
  templateUrl: './entrance-register.component.html',
  styleUrls: ['./entrance-register.component.css']
})
export class EntranceRegisterComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

}
