import {Component, EventEmitter, Input, Output, OnInit, inject} from '@angular/core';
import {AsyncPipe, NgOptimizedImage} from "@angular/common";

import {Observable} from 'rxjs';
import {ImageViewer} from '../../image-viewer/image-viewer';
import {JournalPage} from '../../interfaces/journal-page';
import {RestConnection} from '../../../services/rest-connection';

@Component({
  selector: 'app-journal-table',
  imports: [
    NgOptimizedImage,
    AsyncPipe,
  ],
  templateUrl: './journal-table.html',
  styleUrl: './journal-table.scss'
})
export class JournalTable implements OnInit{

  private rest: RestConnection = inject(RestConnection);

  @Input() diplayCreationForm: boolean | undefined;
  @Input() imageViewer!: ImageViewer;

  @Output() editFormData: EventEmitter<JournalPage> = new EventEmitter();

  journals$: Observable<JournalPage[]> | undefined;
  extendedRowIdList: number[]  = [];

  ngOnInit() {
    this.getJournals();
  }

  editPage(id: number) {
    this.journals$!.subscribe(pages => {
      const page = pages.find(page => page.id === id);
      if (page) {
        this.showEditingForm(page);
      }
    });
  }

  private getJournals() {
    this.journals$ = this.rest.getJournals();
  }

  protected delPage(id: number) {
    this.rest.deleteJournalById(id).subscribe();
    window.location.reload();
  }

  protected generateImages(page: JournalPage) {
    this.rest.generateImagesForJournal(page).subscribe();
  }

  fetchImagesForPage(page:  JournalPage) {
    this.rest.getImagesForJorunalId(page).subscribe(dbImages => {
      this.imageViewer.images = dbImages.body.images;
    });
    this.imageViewer.open();
  }

  collapseRow(id: number) {
    if (!id) return;
    if (this.extendedRowIdList.includes(id)) {
      const i = this.extendedRowIdList.indexOf(id);
      this.extendedRowIdList.splice(i!);
    }
    else {
      this.extendedRowIdList.push(id);
    }
  }

  isNotCollapsed(id: number) {
    return this.extendedRowIdList.includes(id);
  }

  private showEditingForm(page: JournalPage) {
    this.editFormData.emit(page)
  }

  formatDate(dateString: string) {
    return new Date(Date.parse(dateString)).toDateString()
  }

}
