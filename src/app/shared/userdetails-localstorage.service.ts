import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserdetailsLocalstorageService {
  private key = "userSessionDetails"
  constructor() {}

  async setSession(id_token: string, defaultBranch: number = 0) {
    let userDetails = {
      id_token: id_token,
      defaultBranch: defaultBranch,
    };

    console.log('setdetails', userDetails);
    localStorage.setItem(this.key, JSON.stringify(userDetails));
  }

  getSession() {
    let userDetails = localStorage.getItem(this.key) || '{}';
    console.log('getdetails', userDetails);
    return JSON.parse(userDetails);
  }

  removeSession() {
    localStorage.clear();
  }
}
