import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JournalPage} from '../components/interfaces/journal-page';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestConnection {

  BASE_URL: string = "http://localhost:8080";
  JOURNAL_DIRECTIVE: string = "/journal";


  constructor(private httpClient: HttpClient) { }


  getJournals(): Observable<JournalPage[]> {
      const url = this.BASE_URL + this.JOURNAL_DIRECTIVE;
      return this.httpClient.get<JournalPage[]>(url);
  }

  addJournal(page: JournalPage): Observable<any> {
    return this.httpClient.post<JournalPage>(this.BASE_URL + this.JOURNAL_DIRECTIVE, page, {observe: "response"});
  }

  editJournal(page: JournalPage) : Observable<any> {
    return this.httpClient.put<JournalPage>(this.BASE_URL + this.JOURNAL_DIRECTIVE, page, {observe: "response"});
  }

  deleteJournalById(id: number | undefined) : Observable<any> {
    return this.httpClient.delete<JournalPage>(this.BASE_URL + this.JOURNAL_DIRECTIVE + `/${id}`, {observe: "response"});
  }
}
