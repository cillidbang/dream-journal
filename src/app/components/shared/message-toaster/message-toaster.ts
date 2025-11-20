import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-message-toaster',
  imports: [],
  templateUrl: './message-toaster.html',
  styleUrl: './message-toaster.scss'
})
export class MessageToaster {

  @Input() error: boolean = false;

}
