import {Component, ViewChild, Input, SimpleChanges, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-journal-dialog',
  imports: [],
  templateUrl: './journal-dialog.html',
  styleUrl: './journal-dialog.scss'
})
export class JournalDialog {
    @Input() display: boolean = false;
    @Output() formSubmit: EventEmitter<boolean> = new EventEmitter;

    closeDialog() {
      this.formSubmit.emit();
    }

    submitDialog() {
        /*this.formSubmit.emit();*/
    }
}
