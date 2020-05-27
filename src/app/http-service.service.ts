import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private apiUrl = 'http://fraudaiml1.herokuapp.com/datafetchdup/ ';
 private apiUrl = '/CONTMALERT/datafetchdup/';
  // http://fraudaiml1.herokuapp.com/datafetch/?from=02/01/2020 11:56 AM&to=03/23/2020

  constructor(private http: HttpClient) { }

  alertname1: string;

  private userApiUrl = '/services/userapi/currentUser';
  getLoggedInUser(): Observable<any> {
      const observable = this.http.get<any>(this.userApiUrl)
      .pipe(map(data => data.firstName));
      return observable;
    }

  getdata(fromdate: string, todate: string): Observable<any> {

    const observable = this.http.post<any>(this.apiUrl + 'datafetch/', {
      from: fromdate,
      to: todate,
      check: '1',
    })
      .pipe(
        map((data) => {
          return data;
        })
      );
    return observable;
  }
  getresult(fromdate: string, todate: string): Observable<any> {

    const observable = this.http.post<any>(this.apiUrl + 'datafetch/', {
      from: fromdate,
      to: todate,
      check: '2',

    }) .pipe(
        map((data) => {
          return  _.sortBy(data, 'labels');
        })
      );
    return observable;
  }

  postresult(fromdate: string, todate: string, saverunid: string): Observable<any> {

    const observable = this.http.post<any>(this.apiUrl + 'datafetch/', {
      from: fromdate,
      to: todate,
      check: '3',
      runid: saverunid,
    }) .pipe(
        map((data) => {
          return data;
        })
      );
    return observable;
  }

}


