import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { DataQuestions } from './models/question.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getQuestions(path: string) {
    return this.http.get(this.baseUrl + path) as Observable<DataQuestions>;
  }
}
