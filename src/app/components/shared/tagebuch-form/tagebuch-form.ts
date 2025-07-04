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
    console.log("form init");
    console.log("creation: " + this.showTagebuchCreationForm);
    console.log("editing: " + this.showTagebuchEditingForm);

    this.getEmptyFormGroup();
    console.log("form set empty")

    if (this.showTagebuchEditingForm) {
      this.setFormValues();
      console.log("form values filled")
    }
  }


  setFormValues() {

    if (!this.pageToEditFormData) {
      return console.error("no page to edit.");
    }
    this.formValues!.controls["title"].setValue(this.pageToEditFormData.title);
    this.formValues!.controls["subtitle"].setValue(this.pageToEditFormData.content.subtitle);
    this.formValues!.controls["description"].setValue(this.pageToEditFormData.content.description);

    console.log("new")
  }

  getEmptyFormGroup() {
    this.formValues = new FormGroup({
      title: new FormControl(''),
      subtitle: new FormControl(''),
      description: new FormControl(''),
    });
  }

  handleSubmit() {
    alert(this.formValues!.value.title + ' | ' + this.formValues!.value.subtitle + ' | ' + this.formValues!.value.description);

    const currentPageEntry: JournalPage = {
        title: this.formValues!.value.title!,
        content: {
          subtitle: this.formValues!.value.subtitle!,
          description: this.formValues!.value.description!
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
