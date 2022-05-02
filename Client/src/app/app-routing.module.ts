import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuard } from './_guards/admin-auth.guard';
import { ModeratorAuthGuard } from './_guards/moderator-auth.guard';
import { UserAuthGuard } from './_guards/user-auth.guard';
import { ShowBookingListComponent } from './show-booking/show-booking-list/show-booking-list.component';
import { ShowBookingDetailsComponent } from './show-booking/show-booking-details/show-booking-details.component';
import { ShowDetailResolver } from './_resolvers/show-detail.resolver';
import { BookingCalendarListComponent } from './booking-calendar/booking-calendar-list/booking-calendar-list.component';
import { BookingCalendarDetailComponent } from './booking-calendar/booking-calendar-detail/booking-calendar-detail.component';
import { ShowManagementIndexComponent } from './show-management/show-management-index/show-management-index.component';
import { ShowManagementViewComponent } from './show-management/show-management-view/show-management-view.component';
import { ShowManagementAddComponent } from './show-management/show-management-add/show-management-add.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'booking-calendar',component: BookingCalendarListComponent, canActivate: [ModeratorAuthGuard]},
      {path: 'booking-calendar/:id',component: BookingCalendarDetailComponent, resolve:{show: ShowDetailResolver}},
      {path: 'show-booking', component: ShowBookingListComponent, canActivate: [UserAuthGuard]},
      {path: 'show-booking/:id', component: ShowBookingDetailsComponent, resolve:{show: ShowDetailResolver}},
      {path: 'show-management-index', component: ShowManagementIndexComponent, canActivate: [ModeratorAuthGuard]},
      {path: 'show-management-create', component: ShowManagementAddComponent, canActivate: [ModeratorAuthGuard], canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'show-management-edit/:id', component: ShowManagementAddComponent, canActivate: [ModeratorAuthGuard], canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'show-management-view/:id',component: ShowManagementViewComponent, resolve:{show: ShowDetailResolver}},
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
