import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
//import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterComponent } from './register/register.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import {TabsModule} from 'ngx-bootstrap/tabs'
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { ShowsBookingListComponent } from './seat-booking/shows-booking-list/shows-booking-list.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { ShowBookingListComponent } from './shows/show-booking-list/show-booking-list.component';
import { ShowBookingCardComponent } from './shows/show-booking-card/show-booking-card.component'

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    BookingCalendarComponent,
    TicketManagementComponent,
    EntranceRegisterComponent,
    HasRoleDirective,
    RegisterComponent,
    DateInputComponent,
    AdminPanelComponent,
    UserManagementComponent,
    ConfirmDialogComponent,
    RolesModalComponent,
    ShowBookingListComponent,
    ShowBookingCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
