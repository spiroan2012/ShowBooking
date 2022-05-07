import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Booking } from 'src/app/_models/booking';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BookingsService } from 'src/app/_services/bookings.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { InfoService } from 'src/app/_services/info.service';

@Component({
  selector: 'app-entrance-register-list',
  templateUrl: './entrance-register-list.component.html',
  styleUrls: ['./entrance-register-list.component.css']
})
export class EntranceRegisterListComponent implements OnInit {
  bookingsFound: Booking[] = [];
  user: User;

  constructor(private accountService: AccountService,
    private router: Router,
    private bookingService: BookingsService,
    private toastr: ToastrService,
    private infoService: InfoService,
    private confirmService: ConfirmService) {
      this.accountService.currentUser.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }


  ngOnInit(): void {
    this.getBookingsForLoggedUser();
  }

  getBookingsForLoggedUser(){
    this.bookingService.getBookingsForLoggedUser().subscribe(
      response => {
        this.bookingsFound = response;
      }
      ,error=> {
        this.toastr.error(error);
      }
    )
  }

  openAddSuccessModal(title, description){
    return this,this.infoService.info(title, description);
  }


  openSeatsModal(index){
    console.log(this.bookingsFound[index])
    return this,this.infoService.info('Θέσεις', this.bookingsFound[index].seats.join('-'));
  }

  setAppear(bookingId, index){
    this.openUpdateConfirmDialog().subscribe(ans =>{
      if(ans){
        this.bookingService.updateBookingToAppeared(bookingId).subscribe(response =>{
          this.toastr.info("Επιτυχής κοινοποίηση εισόδου για την παράσταση");
          this.bookingsFound.splice(index, 1);
        }, error=>{
          this.toastr.error(error);
        });
      }
    },error=>{
      console.log(error);
    });

  }

  openUpdateConfirmDialog(){
    return this.confirmService.confirm("Ειστε σίγουροι ότι θέλετε να κοινοποιήσετε την είσοδό σας στην παράσταση;");
  }

}