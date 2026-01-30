import {Component, EventEmitter, Input, Output, OnInit, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";

import { Observable } from 'rxjs';
import {JournalPage} from '../../interfaces/journal-page';
import {RestConnection, ViewModel} from '../../../services/rest-connection';

@Component({
  selector: 'app-journal-table',
  imports: [
    NgOptimizedImage,
    AsyncPipe,
  ],
  templateUrl: './journal-table.html',
  styleUrl: './journal-table.scss'
})
export class JournalTable {

  private rest: RestConnection = inject(RestConnection);

  @Input() diplayCreationForm: boolean | undefined;
  @Input() journals$: Observable<ViewModel> | undefined;

  @Output() editFormData: EventEmitter<JournalPage> = new EventEmitter();
  @Output() refresh: EventEmitter<any> = new EventEmitter();


  extendedRowIdList: number[]  = [];

  protected _editPage(id: number) {
    if (this.journals$ == undefined) return;
    this.journals$.subscribe(pages => {
      const page = pages.journals!.find(page => page.id === id);
      if (page) {
        this.showEditingForm(page);
      }
    });
  }

  protected delPage(id: number) {
    this.rest.deleteJournalById(id).subscribe(() => {
      this.refresh.emit();
    });
  }


  protected collapseRow(id: number) {
    if (!id) return;
    if (this.extendedRowIdList.includes(id)) {
      const i = this.extendedRowIdList.indexOf(id);
      this.extendedRowIdList.splice(i!);
    }
    else {
      this.extendedRowIdList.push(id);
    }
  }

  protected isNotCollapsed(id: number) {
    return this.extendedRowIdList.includes(id);
  }

  private showEditingForm(page: JournalPage) {
    this.editFormData.emit(page)
  }

  formatDate(dateString: string) {
    return new Date(Date.parse(dateString)).toDateString()
  }

}
