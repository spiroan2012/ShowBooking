import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { InfoDialogComponent } from '../modals/info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  bsModelRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  info(title ,message ): Observable<boolean>{
    const config = {
      initialState: {
        title: title,
        message: message
      }
    }
    this.bsModelRef = this.modalService.show(InfoDialogComponent, config);
    return new Observable<boolean>(this.getResult())
  }

  private getResult(){
    return (observer) => {
      const subscription = this.bsModelRef.onHidden.subscribe(() => {
        observer.next(this.bsModelRef.content.result);
        observer.complete();
      });

      return {
        unsubscribe(){
          subscription.unsubscribe();
        }
      }
    }
  }
}
