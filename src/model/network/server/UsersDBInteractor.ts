/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Credentials, DBInteractor} from '../interfaces';
import {User} from '../../entities/user';
import {httpRequest} from "./request/http.hook";
import * as LocalStorage from "../../localStorage/storage";

export class UsersDBInteractor implements DBInteractor {
  private keyName = 'login';

  login(credentials: Credentials): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      httpRequest('/api/auth/login', 'POST', credentials)
        .then((result) => {
          const {user, token} = result;
          const loginData = new LoginData(user._id, token);
          LocalStorage.setStorageObjectItem(this.keyName, loginData)
            .then(() => {
              resolve({uid: user._id, user: user});
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Register the user using email and password
  registerNewUser(credentials: Credentials): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      httpRequest('/api/auth/register', 'POST', credentials)
        .then((result) => {
          const {uid, email, token} = result;
          const loginData = new LoginData(uid, token);
          LocalStorage.setStorageObjectItem(this.keyName, loginData)
            .then(() => {
              resolve(uid);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Send Password Reset Email
  resetPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      reject(Error('This functionality for "Node.js" backend has not implemented yet.'));
    });
  }

  signOut(): Promise<any> {
    return LocalStorage.removeStorageItem(this.keyName);
  }

  isUserAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getCurrentUser()
        .then((_) => {
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          resolve(false);
        });
    });
  }

  // Get current registered user from the Authentication Firebase database
  async getCurrentUser(): Promise<User> {
    console.log('API. getCurrentUser');
    const uid = await this.getCurrentUserId();
    return this.getUser(uid);
  }

  getCurrentUserId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      LocalStorage.getStorageObjectItem(this.keyName).then((data) => {
        const loginData = data as LoginData;
        if (loginData) {
          resolve(loginData.uid);
        } else {
          reject(Error('Any user has not signed in yet'));
        }
      });
    });
  }

  getUser(uid: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      httpRequest(`/api/users/${uid}`, 'GET')
        .then((result) => {
          const {snapshot} = result;
          if (snapshot) {
            const userObj = new User(snapshot);
            resolve(userObj);
          } else {
            reject(Error('User structure data on server is wrong'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateUser(user: User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      httpRequest('/api/users/user', 'POST', user)
        .then((result) => {
          console.log(result);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  fetchAllUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>((resolve, reject) => {
      reject(Error('Not implemented yet'));
    });
  }
}

export class LoginData {
  private readonly _jwtToken: string;
  private readonly _userId: string;
  get token(): string {
    return this._jwtToken;
  }
  get uid(): string {
    return this._userId;
  }
  constructor(uid: string, token: string) {
    this._userId = uid;
    this._jwtToken = token;
  }
}
