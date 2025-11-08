import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormOperationAfterSubmit, JournalPage, SubmitOperation} from '../../../interfaces/journal-page';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-journal-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './journal-dialog.html',
  styleUrl: './journal-dialog.scss'
})
export class JournalDialog implements OnChanges{
    @Input() display: boolean = false;
    @Input() pageToEditData: JournalPage | undefined;
    @Output() formSubmit: EventEmitter<FormOperationAfterSubmit> = new EventEmitter;
    @Output() closeForm: EventEmitter<boolean> = new EventEmitter;

    editInDb: boolean = false;

    inputValues: JournalPage | undefined = {
      title: "",
      subtitle: "",
      content: "",
      date: ""
    }

    ngOnChanges(changes:SimpleChanges) {

      if (changes['pageToEditData']) {
        if (this.pageToEditData) {
          this.inputValues = this.pageToEditData;
          this.editInDb = true;
        }
      }
    }

    closeDialog() {
      this.closeForm.emit();
      window.location.reload();
    }

    submitDialog() {
      this.inputValues!.date = new Date().toISOString();

      if (this.editInDb) {
        this.formSubmit.emit({page: this.inputValues!, operation: SubmitOperation.EDIT});
      }
      else {
        this.formSubmit.emit({page: this.inputValues!, operation: SubmitOperation.CREATE});
      }
    }
}
