import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JournalPage} from '../components/interfaces/journal-page';
import {catchError, map, Observable, of, startWith} from 'rxjs';

export type ViewModel = {
  loading: boolean;
  error: string | null;
  journals: JournalPage[];
};

@Injectable({
  providedIn: 'root'
})
export class RestConnection {

  BASE_URL: string = "http://localhost:8080";
  JOURNAL_DIRECTIVE: string = "/journal";
  constructor(private httpClient: HttpClient) { }

  getJournals(): Observable<ViewModel> {
      const url = this.BASE_URL + this.JOURNAL_DIRECTIVE;
      return this.httpClient.get<JournalPage[]>(url).pipe(
        map(journals => ({ loading: false, error: null, journals })), // Erfolg
        startWith({ loading: true, error: null, journals: [] }),      // Start-Zustand
        catchError(err => of({ loading: false, error: err.message, journals: [] })) // Fehler
      );
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
