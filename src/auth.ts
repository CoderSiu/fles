import {User} from './model/User';
import {api} from './api/APIService';
let _user: User | null = null;

export default {
  _user,
  loggedIn() {
    return !!_user;
  },

  async logIn(userName:string, password:string) {
      return api.login({userName,password})
        .then(response=>{
          _user = response.data;
          return {
            isOk: true,
            data: _user
          };
        }).catch(reason=>{
          return {
            isOk: false,
            message: "Authentication failed"
          };
        })  
  },

  async logOut() {
    this._user = null;
  },

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  },

  async resetPassword(email:string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  },

  async changePassword(email:string, recoveryCode:string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }
  },

  async createAccount(email:string, password:string) {
    try {
      // Send request
      console.log(email, password);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }
};
