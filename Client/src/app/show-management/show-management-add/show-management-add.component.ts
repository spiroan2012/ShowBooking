import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
import { HallsService } from 'src/app/_services/halls.service';
import { Hall } from 'src/app/_models/hall';
import { ShowCreate } from 'src/app/_models/showCreate';
import { ShowsService } from 'src/app/_services/shows.service';
import { stringify } from 'querystring';
import { InfoService } from 'src/app/_services/info.service';
import { Show } from 'src/app/_models/show';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-management-add',
  templateUrl: './show-management-add.component.html',
  styleUrls: ['./show-management-add.component.css']
})
export class ShowManagementAddComponent implements OnInit {
  showForm: FormGroup;
  title: string;
  showId: string;
  maxDate:Date;
  minDate: Date;
  validationErrors: string[] = [];
  dropdownHalls: any[] = [];
  selectedHall: number;
  editMode: boolean;

  constructor(private showService: ShowsService,
    private hallService: HallsService, 
    private infoService: InfoService, 
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {

    this.showId = this.route.snapshot.params['id'];
    this.editMode = !!this.showId;
    this.initializeForm();
    console.log(this.showForm.dirty);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 2);
    this.minDate = new Date();
    
  }

  initializeForm(){
    this.showForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateStart: ['', [Validators.required]],
      dateEnd: ['', [Validators.required]],
      timeStart: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.min(0)]],
      hall: ['1', Validators.required],
      actors: [''],
      directors: [''],
    });
    this.populateDropDownWithShows();

    if(this.editMode){
      this.showService.getShowById(this.showId)
            .pipe(map(el => {
              let timestart = el.timeStart.toString().substring(11,16);
              let hour = parseInt(timestart.substring(0,2));
              let minutes = timestart.substring(3,5);
              let day;
              if(hour <= 11){
                day = 'π.μ.'
              }
              else{
                hour = hour - 12;
                day = 'μ.μ.'
              }
              console.log(timestart);
              return ({
                hall: el.hallId,
                title: el.title,
                description: el.description,
                dateStart: new Date(el.dateStart),
                dateEnd: new Date(el.dateEnd),
                timeStart: hour+':'+minutes+' '+day,
                actors: el.actors.join(','),
                directors: el.directors.join(','),
                duration: el.duration,
              })
            }))
            .subscribe(x =>{
              this.showForm.patchValue(x);
              this.title = "Επεξεργασία παράστασης "+x.title;
            } );
    }
    else{
      this.title = "Εισαγωγή νέας παράστασης";
    }
    // this.showForm.controls.password.valueChanges.subscribe(() =>{
    //   this.registerForm.controls.confirmPassword.updateValueAndValidity();
    // })
  }

  checkSelected(){
    console.log(this.selectedHall);
  }

  submitForm(){
    let dateTemp = new Date(this.showForm.value.dateStart);
    let dateStart = dateTemp.getFullYear()+'-'+(dateTemp.getMonth()+1).toString().padStart(2, '0')+'-'+dateTemp.getDate().toString().padStart(2, '0');
    dateTemp = new Date(this.showForm.value.dateEnd);
    let dateEnd = dateTemp.getFullYear()+'-'+(dateTemp.getMonth()+1).toString().padStart(2, '0')+'-'+dateTemp.getDate().toString().padStart(2, '0');
    dateTemp = new Date(this.showForm.value.dateStart);
    let hours: string;
    if(this.showForm.value.timeStart.length == 9){
      let hour = parseInt(this.showForm.value.timeStart.substring(0,1));
      let minutes = parseInt(this.showForm.value.timeStart.substring(2,4));
      if(this.showForm.value.timeStart.substring(5,9) == 'μ.μ.'){
        hour += 12;
      }
      hours = hour.toString().padStart(2, '0')+':'+minutes.toString().padStart(2, '0')+':00';
    }
    else if(this.showForm.value.timeStart.length == 10){
      let hour = parseInt(this.showForm.value.timeStart.substring(0,2));
      let minutes = parseInt(this.showForm.value.timeStart.substring(3,5));
      if(this.showForm.value.timeStart.substring(6,19) == 'μ.μ.'){
        hour += 12;
      }
      hours = hour.toString().padStart(2, '0')+':'+minutes.toString().padStart(2, '0')+':00';
    }
    let timeStart = dateStart+'T'+hours;
    let model = new ShowCreate(
      this.showForm.value.title, 
      this.showForm.value.description, 
      dateStart, 
      dateEnd, 
      this.showForm.value.actors.split(','), 
      this.showForm.value.directors.split(','),
      this.showForm.value.duration,
      timeStart,
      this.showForm.value.hall);
    console.log(model);
    if(!this.editMode){
      this.showService.addShow(model).subscribe(response => {
        this.openAddSuccessModal(response.title);
        this.clearForm();
      });
    }
    else if(this.showForm.dirty){
      this.showService.updateShow(model, this.showId).subscribe(response => {
        this.openAddSuccessModal(this.showForm.value.title);
        this.clearForm();
        this.router.navigateByUrl('/show-management-index');
      });
    }

  }

  openAddSuccessModal(title){
    if(!this.editMode){
      return this,this.infoService.info('Επιτυχία', 'Η παράσταση '+title+' δημιουργήθηκε με επιτυχία');
    }
    else{
      return this,this.infoService.info('Επιτυχία', 'Η παράσταση '+title+' άλλαξε με επιτυχία');
    }
  }

  clearForm(){
    this.showForm.reset();
  }

  populateDropDownWithShows(){

    this.hallService.getHallsWithoutPagination().subscribe(response => {
      console.log(response);
      this.dropdownHalls = response;
    })
  }

  checkYearOfDate(){}

}
