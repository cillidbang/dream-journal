import { Component } from '@angular/core';
import {FormComponent} from '../shared/form-component/form-component';

@Component({
  selector: 'app-loginpage',
  imports: [
    FormComponent
  ],
  templateUrl: './loginpage.html',
  styleUrl: './loginpage.scss'
})
export class Loginpage {

  showModal: boolean = false;


  logStatement() {
    console.log("passt");
    this.showModal = true;
  }

}
