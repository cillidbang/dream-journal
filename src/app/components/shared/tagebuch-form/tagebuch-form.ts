import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JournalPage} from '../../interfaces/journal-page';
import {JournalStorage} from '../../../services/journal-storage';

@Component({
  selector: 'app-tagebuch-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tagebuch-form.html',
  styleUrl: './tagebuch-form.scss'
})
export class TagebuchForm {

  @Input() showTagebuchForm = false;
  @Output() closeForm = new EventEmitter<boolean>();

  formValues = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private storageService: JournalStorage) {

  }


  handleSubmit() {
    alert(this.formValues.value.title + ' | ' + this.formValues.value.subtitle + ' | ' + this.formValues.value.description);

    const currentPageEntry: JournalPage = {
        title: this.formValues.value.title!,
        content: {
          subtitle: this.formValues.value.subtitle!,
          description: this.formValues.value.description!
        }
    }
    this.storageService.savePage(currentPageEntry);
    console.log("saved entry: " + this.storageService.getPage(currentPageEntry.title))

    this.closeForm.emit();
  }

  close() {
    this.closeForm.emit();
  }


  protected readonly onsubmit = onsubmit;
}
