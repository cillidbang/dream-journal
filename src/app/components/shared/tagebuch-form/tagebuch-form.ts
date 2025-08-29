import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JournalPage} from '../../interfaces/journal-page';
import {JournalStorage} from '../../../services/journal-storage';

@Component({
  selector: 'app-tagebuch-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tagebuch-form.html',
  styleUrl: './tagebuch-form.scss'
})
export class TagebuchForm implements OnInit {

  @Input() showTagebuchCreationForm = false;
  @Input() showTagebuchEditingForm = false;
  @Input() pageToEditFormData: JournalPage | undefined;

  @Output() closeForm = new EventEmitter<boolean>();

  formValues: FormGroup | undefined;


  constructor(private storageService: JournalStorage) {
  }


  ngOnInit() {

    this.getEmptyFormGroup();
    if (this.showTagebuchEditingForm) {
      this.overwriteValues();
      console.log("form values filled")
    }
  }


  overwriteValues() {

    console.log("overwrite page: \n")
    console.log(this.pageToEditFormData)

    if (!this.pageToEditFormData) {
      return console.error("no page to edit.");
    }
    this.formValues!.controls["title"].setValue(this.pageToEditFormData.title);
    this.formValues!.controls["subtitle"].setValue(this.pageToEditFormData.subtitle);
    this.formValues!.controls["content"].setValue(this.pageToEditFormData.content);

  }

  getEmptyFormGroup() {
    this.formValues = new FormGroup({
      title: new FormControl(''),
      subtitle: new FormControl(''),
      content: new FormControl(''),
    });
  }

  handleSubmit() {
    alert(this.formValues!.value.title + ' | ' + this.formValues!.value.subtitle + ' | ' + this.formValues!.value.content);

    const entry: JournalPage = {
        title: this.formValues?.value.title,
        subtitle: this.formValues?.value.subtitle,
        content: this.formValues?.value.content,
        date: new Date().toISOString().slice(0, 10)
    }

    this.storageService.savePage(entry);
    this.closeForm.emit();
  }

  close() {
    this.closeForm.emit();
  }


  protected readonly onsubmit = onsubmit;
}
