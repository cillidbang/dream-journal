import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormOperationAfterSubmit, JournalPage, SubmitOperation} from '../interfaces/journal-page';
import {RestConnection} from '../../services/rest-connection';
import {JournalDialog} from '../shared/journal-dialog/journal-dialog/journal-dialog';
import {MessageToaster} from '../shared/message-toaster/message-toaster';
import {JournalTable} from './journal-table/journal-table';



@Component({
  selector: 'app-landing-page',
  imports: [
    JournalDialog,
    JournalTable,
    MessageToaster,
  ],
  templateUrl: './journal-overview.component.html',
  styleUrl: './journal-overview.component.scss'
})
export class JournalOverview implements OnInit {

  @ViewChild("dialogElement") dialog : ElementRef<HTMLDialogElement> | any;

  existingJournalPages: JournalPage[] | null = [];
  showCreationForm: boolean = false;
  dataForEditForm: JournalPage | undefined;
  showToast: boolean = false;
  responseStatus: boolean = true;

  constructor(private rest: RestConnection) {}

  showMessageToaster(status: boolean) {
    this.showToast = status;

    setTimeout(() => {
      this.showToast = false;
    }, 5000);

  }

  ngOnInit() {
    this.getExistingJournalPages();
  }
  showTagebuchForm() {
    this.showCreationForm = true;
    this.dialog.nativeElement.showModal();
  }

  closeForm() {
    this.showCreationForm = false;
    this.dialog.nativeElement.close();
  }
  submitForm(submit: FormOperationAfterSubmit) {
    if (submit.operation === SubmitOperation.CREATE) {
      this.rest.addJournal(submit.page).subscribe(s => {
        this.showMessageToaster(s.ok);
        console.log(s.ok)
      });
    }
    else if (submit.operation === SubmitOperation.EDIT) {
      this.rest.editJournal(submit.page).subscribe(s => {
        this.showMessageToaster(s.ok);
      });
    }
    this.showCreationForm = false;
    this.dialog.nativeElement.close();
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
