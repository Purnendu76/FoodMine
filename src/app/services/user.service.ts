import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shread/models/user';
import { IUserLogin } from '../shread/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USER_LOGIN_URL, USER_Register_URL } from '../shread/models/constant/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shread/interfaces/IUserRegester';
const USER_KEY = 'User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable: Observable<User>

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }
  
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStroge(user)
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to FoodMine ${user.name}!😉`,
            'Login Successful'   
          )
        },
        error: (errorResponce) => {
          this.toastrService.error(errorResponce.error, 'Login Faild!😥 ')
        }
      })
    )

  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_Register_URL, userRegister).pipe(
      tap({
        next: (User) => {
          this.setUserToLocalStroge(User);
          this.userSubject.next(User);
          this.toastrService.success(
            `Welcome to the FoodMine${User.name}😉`,
            'Regester Successful'
          )
        },
        error: (errorResponce) => {
          this.toastrService.error(errorResponce.error,
            'Rrgister Failed!!🥺'
          )
        }
      })
    )
  }





  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

private setUserToLocalStroge(user: User){
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();

  }

}
