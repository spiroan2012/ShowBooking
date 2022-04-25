import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { AdminAuthGuard } from './_guards/admin-auth.guard';
import { ModeratorAuthGuard } from './_guards/moderator-auth.guard';
import { UserAuthGuard } from './_guards/user-auth.guard';
import { ShowBookingListComponent } from './show-booking/show-booking-list/show-booking-list.component';
import { ShowBookingDetailsComponent } from './show-booking/show-booking-details/show-booking-details.component';
import { ShowDetailResolver } from './_resolvers/show-detail.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'booking-calendar',component: BookingCalendarComponent, canActivate: [ModeratorAuthGuard]},
      {path: 'show-booking', component: ShowBookingListComponent, canActivate: [UserAuthGuard]},
      {path: 'show-booking/:id', component: ShowBookingDetailsComponent, resolve:{show: ShowDetailResolver}},
      {path: 'ticket-management', component: TicketManagementComponent, canActivate: [ModeratorAuthGuard]},
      {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AdminAuthGuard]},
      {path: 'entrance-register', component: EntranceRegisterComponent, canActivate: [UserAuthGuard]}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
