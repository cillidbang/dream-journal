import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormOperationAfterSubmit, JournalPage, SubmitOperation} from '../interfaces/journal-page';
import {RestConnection} from '../../services/rest-connection';
import {JournalDialog} from '../shared/journal-dialog/journal-dialog/journal-dialog';
import {JournalTable} from './journalTable/journal-table/journal-table';


@Component({
  selector: 'app-landing-page',
  imports: [
    JournalDialog,
    JournalTable,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit {

  @ViewChild("dialogElement") dialog : ElementRef<HTMLDialogElement> | any;

  existingJournalPages: JournalPage[] = [];
  showCreationForm: boolean = false;
  dataForEditForm: JournalPage | undefined;


  constructor(private rest: RestConnection) {}

  ngOnInit() {
    this.getExistingJournalPages();
  }
  showTagebuchForm() {
    this.showCreationForm = true;
    this.dialog.nativeElement.showModal();
  }

  closeForm() {
    this.showCreationForm = false;
  }
  submitForm(submit: FormOperationAfterSubmit) {
    this.showCreationForm = false;
    if (submit.operation === SubmitOperation.CREATE) {
      this.rest.addJournal(submit.page).subscribe();
    }
    else if (submit.operation === SubmitOperation.EDIT) {
      this.rest.editJournal(submit.page).subscribe();
    }
  }

  setPageToEdit(pageToEdit: JournalPage) {
    this.showTagebuchForm();
    this.dataForEditForm = pageToEdit;
  }

  getExistingJournalPages() {
    this.rest.getJournals().subscribe(data => {
        this.existingJournalPages = data;
    });
  }

}
