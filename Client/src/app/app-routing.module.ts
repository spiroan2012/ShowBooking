import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminAuthGuard } from './_guards/admin-auth.guard';
import { ModeratorAuthGuard } from './_guards/moderator-auth.guard';
import { UserAuthGuard } from './_guards/user-auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'booking-calendar',component: BookingCalendarComponent, canActivate: [ModeratorAuthGuard]},
      {path: 'seat-booking', component: SeatBookingComponent, canActivate: [UserAuthGuard]},
      {path: 'ticket-management', component: TicketManagementComponent, canActivate: [ModeratorAuthGuard]},
      {path: 'user-management', component: UserManagementComponent, canActivate: [AdminAuthGuard]},
      {path: 'entrance-register', component: EntranceRegisterComponent, canActivate: [UserAuthGuard]}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
