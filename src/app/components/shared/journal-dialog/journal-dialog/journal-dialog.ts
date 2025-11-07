import {Component, ViewChild, OnChanges, Input, SimpleChanges, ElementRef} from '@angular/core';

@Component({
  selector: 'app-journal-dialog',
  imports: [],
  templateUrl: './journal-dialog.html',
  styleUrl: './journal-dialog.scss'
})
export class JournalDialog {
    @ViewChild("dialogElement") dialog : ElementRef<HTMLDialogElement> | any;
    @Input() display: boolean = false;

    ngOnChanges(changes: SimpleChanges) {
      if (changes['display']) {
        const dialogEl: any = this.dialog.nativeElement;

        if (this.display) {
          dialogEl.showModal();
        }
        else {
          dialogEl.close();
        }
      }
    }

    closeDialog() {
      const dialogEl: any = this.dialog.nativeElement;
      dialogEl.close();
    }
}
