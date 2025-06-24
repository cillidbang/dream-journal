import {Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-form-component',
  imports: [],
  templateUrl: './form-component.html',
  styleUrl: './form-component.scss'
})
export class FormComponent {

  @Input() showModal : boolean = false;

  constructor(private formBuilder: FormBuilder) {
  }

  close() {
    this.showModal = false;
  }

}
