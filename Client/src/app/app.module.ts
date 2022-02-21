import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    BookingCalendarComponent,
    SeatBookingComponent,
    TicketManagementComponent,
    UserManagementComponent,
    EntranceRegisterComponent,
    HasRoleDirective
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
    BsDropdownModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
