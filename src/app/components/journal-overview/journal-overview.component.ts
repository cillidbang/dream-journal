import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormOperationAfterSubmit, JournalPage, SubmitOperation} from '../interfaces/journal-page';
import {RestConnection, ViewModel} from '../../services/rest-connection';
import {JournalDialog} from '../shared/journal-dialog/journal-dialog/journal-dialog';
import {MessageToaster} from '../shared/message-toaster/message-toaster';
import {JournalTable} from './journal-table/journal-table';
import {Observable, timeout} from 'rxjs';



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

  journals$: Observable<ViewModel> | undefined;

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
    this.fetchAllJournals();
  }

  protected fetchAllJournals() {
    this.journals$ = this.rest.getJournals();
  }

  closeForm() {
    this.showCreationForm = false;
    this.dialog.nativeElement.close();
  }
  submitForm(submit: FormOperationAfterSubmit) {
    if (submit.operation === SubmitOperation.CREATE) {
      this.rest.addJournal(submit.page).subscribe(s => {
        if (s != null) {
          this.showMessageToaster(s.ok);
        }
        this.fetchAllJournals();
      });
    }
    else if (submit.operation === SubmitOperation.EDIT) {
      this.rest.editJournal(submit.page).subscribe(s => {
        this.showMessageToaster(s.ok);
        this.fetchAllJournals();
      });
    }
    this.showCreationForm = false;
    this.dialog.nativeElement.close();
  }

  openFormular() {
    this.showCreationForm = true;
    this.dataForEditForm = {
      title: '',
      subtitle: '',
      date: '',
      content: ''
    }
    this.dialog.nativeElement.showModal();
  }

  openEditFormular(pageToEdit: JournalPage) {
    this.showCreationForm = true;
    this.dataForEditForm = pageToEdit;
    this.dialog.nativeElement.showModal();
  }

}
