import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models';
import { UserService } from '../../services/user.service';
import { UserActions } from '../../store/user/user.actions';
import { LayoutActions } from '../../store/layout/layout.actions';
import { LoadingMessages } from '../../constants';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccountPage {
  user: Observable<User>;
  userForm: FormGroup;
  blur = {
    firstName: false,
    lastName: false,
    email: false
  };

  constructor(
    public userService: UserService,
    public userActions: UserActions,
    public layoutActions: LayoutActions,
    public formBuilder: FormBuilder
  ) {}

  /**
   * Gets the user and builds the form.
   */
  ngOnInit() {
    this.user = this.userService.getUser();

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])]
    });
  }

  /**
   * Updates the user's info.
   */
  onSave() {
    this.blur.firstName = true;
    this.blur.lastName = true;
    this.blur.email = true;

    if (this.userForm.valid) {
      this.layoutActions.showLoadingMessage(LoadingMessages.updatingUser);
      this.userActions.updateUser(this.userForm.value);
    }
  }

  get firstName() { return this.userForm.get('firstName'); }

  get lastName() { return this.userForm.get('lastName'); }

  get email() { return this.userForm.get('email'); }
}
