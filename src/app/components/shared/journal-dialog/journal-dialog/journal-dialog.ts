import {Component, ViewChild, Input, SimpleChanges, ElementRef, Output, EventEmitter} from '@angular/core';
import {JournalPage} from '../../../interfaces/journal-page';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-journal-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './journal-dialog.html',
  styleUrl: './journal-dialog.scss'
})
export class JournalDialog {
    @Input() display: boolean = false;
    @Output() formSubmit: EventEmitter<JournalPage> = new EventEmitter;
    @Output() closeForm: EventEmitter<boolean> = new EventEmitter;

    inputValues: JournalPage | undefined = {
      title: "",
      subtitle: "",
      content: "",
      date: ""
    }

    closeDialog() {
      this.closeForm.emit();
    }

    submitDialog() {
      this.inputValues!.date = new Date().toISOString();
      this.formSubmit.emit(this.inputValues);
    }
}
