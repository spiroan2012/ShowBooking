import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HallManagementAddComponent } from '../hall-management/hall-management-add/hall-management-add.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesHallsGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService){

  }

  canDeactivate(component: HallManagementAddComponent): Observable<boolean> | boolean {
    if(component.hallForm.dirty){
      return this.confirmService.confirm("Επιβεβαίωση", "Έχετε μη αποθηκευμένες αλλαγές. Θέλετε να φύγετε;");
    }
    return true;
  }
  
}
