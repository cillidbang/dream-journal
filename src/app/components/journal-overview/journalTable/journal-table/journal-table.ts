import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {JournalPage} from '../../../interfaces/journal-page';
import {RestConnection} from '../../../../services/rest-connection';

@Component({
  selector: 'app-journal-table',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './journal-table.html',
  styleUrl: './journal-table.scss'
})
export class JournalTable {

  @Input() existingJournalPages: JournalPage[] | undefined;
  @Input() diplayCreationForm: boolean | undefined;

  @Output() editFormData: EventEmitter<JournalPage> = new EventEmitter();

  selectedPage: JournalPage | undefined;
  titelOfExtendedRows: string[] = [];

  constructor(private rest: RestConnection) {
  }


  editPage(id: number) {
    this.selectedPage = this.existingJournalPages!.find(page => page.id === id);
    if (!this.selectedPage) return;
    this.showEditingForm(this.selectedPage);
  }

  delPage(id: number) {
    this.rest.deleteJournalById(id).subscribe();
    window.location.reload();
  }

  generateImages(id: number) {
      //use the image generate endpoint, already done in backend.
  }

  viewImages(id: number) {
      //create an component "imageViewer" fetching images from backend and showing.
  }

  collapseRow(title: string) {
    let index = this.titelOfExtendedRows.indexOf(title);

    !this.titelOfExtendedRows.includes(title) ?
      this.titelOfExtendedRows.push(title) :
      this.titelOfExtendedRows.splice(index);
  }

  checkIfCollapsed(entry: string) {
    if (!this.titelOfExtendedRows) return;
    return this.titelOfExtendedRows.includes(entry);
  }

  showEditingForm(page: JournalPage) {
    this.editFormData.emit(page)
  }

  formatDate(dateString: string) {
      const date: Date = new Date(Date.parse(dateString));
      return date.toDateString()
  }

}
