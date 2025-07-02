import {Component, OnInit} from '@angular/core';
import {TagebuchForm} from '../shared/tagebuch-form/tagebuch-form';
import {JournalStorage} from '../../services/journal-storage';
import {JournalPage} from '../interfaces/journal-page';


interface Json {
  entrys: Entry[]
}

interface Entry {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

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

  showTagebuchCreation: boolean = false;
  viewOldPage: boolean = false;



  constructor(private storage: JournalStorage) {
  }

  ngOnInit() {
    this.getExistingJournalPages();
  }

  showTagebuchForm() {
    this.showTagebuchCreation = true;
    console.log("creation mode: " +this.showTagebuchCreation)
  }
  showEditingForm() {
    this.viewOldPage = true;
    console.log("Editing mode: " + this.viewOldPage)

  }


  getSelectedPage(selectedPageName: string) {
    this.selectedPage = this.existingJournalPages.find(page => page.title === selectedPageName);
    console.log(this.selectedPage)
  }


  hideForm() {
    this.showTagebuchCreation = false;
    this.viewOldPage = false;
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
