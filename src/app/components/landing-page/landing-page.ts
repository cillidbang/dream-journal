import {Component, OnInit} from '@angular/core';
import {TagebuchForm} from '../shared/tagebuch-form/tagebuch-form';
import {JournalStorage} from '../../services/journal-storage';
import {JournalPage} from '../interfaces/journal-page';


@Component({
  selector: 'app-landing-page',
  imports: [
    TagebuchForm,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit {

  existingJournalPages: JournalPage[] = [];
  selectedPage: JournalPage | undefined;
  displayCreationForm: boolean = false;
  displayEditingForm: boolean = false;

  constructor(private storage: JournalStorage) {
  }

  ngOnInit() {
    this.getExistingJournalPages();
  }

  showTagebuchForm() {
    this.displayCreationForm = true;
    console.log("creation mode: " +this.displayCreationForm)
  }
  showEditingForm() {
    this.displayEditingForm = true;
    console.log("Editing mode: " + this.displayEditingForm)

  }


  getSelectedPage(selectedPageName: string) {
    this.selectedPage = this.existingJournalPages.find(page => page.title === selectedPageName);
    console.log(this.selectedPage)
  }


  hideForm() {
    this.displayCreationForm = false;
    this.displayEditingForm = false;
  }

  clearStorage() {
    this.storage.clearPages();
    console.log("storage cleared.")
  }

  showPages() {
    console.log(this.storage.getPages());
  }

  getExistingJournalPages() {
    this.existingJournalPages = this.storage.getPages();
  }

}
