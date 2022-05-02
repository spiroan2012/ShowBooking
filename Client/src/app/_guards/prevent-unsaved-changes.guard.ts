import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ShowManagementAddComponent } from '../show-management/show-management-add/show-management-add.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService){

  }

  canDeactivate(component: ShowManagementAddComponent): Observable<boolean> | boolean {
    if(component.showForm.dirty){
      return this.confirmService.confirm("Επιβεβαίωση", "Έχετε μη αποθηκευμένες αλλαγές. Θέλετε να φύγετε;");
    }
    return true;
  }
  
}

