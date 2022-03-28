import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;
  bsModalref: BsModalRef;
  
  constructor(private adminService: AdminService, private modalService: BsModalService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUserWithRoles().subscribe(users => {
      console.log(users);
      this.users = users;
    })
  }

  changeUserStatus(user:User){
    this.adminService.changeUserStatus(user.username).subscribe(resp => {
      user.isDisabled = !user.isDisabled;
    });
  }

  openRolesModal(user: User){
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalref = this.modalService.show(RolesModalComponent, config);
    this.bsModalref.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate= {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if(rolesToUpdate && rolesToUpdate.roles.length > 0){
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles];
        })
      }
    });
  }

  private getRolesArray(user: User){
    const roles = [];
    const userRoles = user.roles;

    const availableRoles: any[] = [
     // {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'}
    ];

    availableRoles.forEach(role => {
      let isMatch = false;

      for(const userRole of userRoles){
        if(role.name === userRole){
          isMatch = true;
          role.checked= true;
          roles.push(role);
          break;
        }
      }

      if(!isMatch){
        role.check = false;
        roles.push(role);
      }
    });
    return roles
  }
}
