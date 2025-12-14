import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {JournalPage} from '../../../interfaces/journal-page';
import {RestConnection} from '../../../../services/rest-connection';
import {ImageViewer} from '../../../shared/image-viewer/image-viewer';

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
  @Input() imageViewer!: ImageViewer;

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

  generateImages(page: JournalPage) {
      //use the image generate endpoint, already done in backend.
      this.rest.generateImagesForJournal(page).subscribe();
  }

  getImagesForPage(page:  JournalPage) {
      //create an component "imageViewer" fetching images from backend and showing.
      this.imageViewer.open();
      /*this.rest.getImagesForJorunalId(page).subscribe();*/
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
