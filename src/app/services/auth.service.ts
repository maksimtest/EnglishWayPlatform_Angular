import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8089/api/';
  private loginApiUrl = this.apiUrl + 'auth';
  private rememberPasswordApiUrl = this.apiUrl + 'remember';
  private changePasswordApiUrl = this.apiUrl + 'change-password';
  private activateApiUrl = this.apiUrl + 'activate';
  private regApiUrl = this.apiUrl + 'reg';
  private simpleRegApiUrl = this.apiUrl + 'simple-reg';
  private cabinetApiUrl = this.apiUrl + 'cabinet';


  constructor(private http: HttpClient) {}

  reg(credentials: { username: string; name: string; password: string; email: string }): Observable<any> {
    console.log('AuthService, credentials=' + JSON.stringify(credentials))
    return this.http.post(this.regApiUrl, credentials);
  }
  rememberPassword(credentials: {email: string }): Observable<any> {
    console.log('AuthService, credentials.email=' + credentials.email)
    return this.http.post(this.rememberPasswordApiUrl, credentials);
  }
  changePassword(credentials: { password: string; code: string }): Observable<any> {
    return this.http.post(this.changePasswordApiUrl, credentials);
  }

  simpleReg(credentials: { email: string; password: string; }): Observable<any> {
    return this.http.post(this.simpleRegApiUrl, credentials);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.loginApiUrl, credentials);
  }

  active(code: string | null): Observable<any> {
    return this.http.get(this.activateApiUrl+"?code="+code);
  }
  cabinet(): Observable<any>{
    return this.http.post(this.cabinetApiUrl, '');
  }
}
