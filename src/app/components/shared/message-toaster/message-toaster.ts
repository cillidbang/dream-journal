import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-message-toaster',
  imports: [
    NgClass
  ],
  templateUrl: './message-toaster.html',
  styleUrl: './message-toaster.scss'
})
export class MessageToaster {

  @Input() errorMessage: string | undefined;
  @Input() responseStatus: boolean = false;

}
