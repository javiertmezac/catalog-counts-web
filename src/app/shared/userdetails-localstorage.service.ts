import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserdetailsLocalstorageService {
  private userDataKey = 'userData';

  constructor() {}

  setSession(user: User) {
    localStorage.setItem(this.userDataKey, JSON.stringify(user));
  }

  getSession(): User {
    try {
      let userDetails = localStorage.getItem(this.userDataKey) || '{}';
      return JSON.parse(userDetails);
    } catch (error) {
      throw new Error('Error while getting user details from local storage')
    }
  }

  updateDefaultBranch(branchId: number) {
    let userDetails = this.getSession();
    userDetails.defaultBranch = branchId;
    this.setSession(userDetails);
  }

  removeSession() {
    localStorage.clear();
  }

}
