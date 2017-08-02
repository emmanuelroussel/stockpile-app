import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserActions } from '../../store/user/user.actions';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccountPage {
  user: Observable<User>;

  constructor(
    public userService: UserService,
    public userActions: UserActions,
  ) {}

  /**
   * Gets the user.
   */
  ngOnInit() {
    this.user = this.userService.getUser();
  }

  /**
   * Updates the user's info.
   */
  onSave(form: NgForm) {
    this.userActions.updateUser(form.value);
  }
}
