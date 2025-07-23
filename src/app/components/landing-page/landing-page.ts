import {Component, OnInit} from '@angular/core';
import {TagebuchForm} from '../shared/tagebuch-form/tagebuch-form';
import {JournalStorage} from '../../services/journal-storage';
import {JournalPage} from '../interfaces/journal-page';
import {NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-landing-page',
  imports: [
    TagebuchForm,
    NgOptimizedImage,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit {


  existingJournalPages: JournalPage[] = [];
  titelOfExtendedRows: string[] = [];
  selectedPage: JournalPage | undefined;
  displayCreationForm: boolean = false;
  displayEditingForm: boolean = false;

  constructor(private storage: JournalStorage) {
  }

  ngOnInit() {
    this.getExistingJournalPages();
    /*this.existingJournalPages = this.storage.testJournalPages;*/
  }


  checkRow(entry: string) {
    return this.titelOfExtendedRows.includes(entry);
  }


  handleRow(entry: string) {
    if (!this.titelOfExtendedRows.includes(entry)) {
      this.titelOfExtendedRows.push(entry);
    }
    else {
      const index = this.titelOfExtendedRows.indexOf(entry);
      this.titelOfExtendedRows.splice(index);
    }
  }

  showTagebuchForm() {
    this.displayCreationForm = true;
  }
  showEditingForm() {
    console.log(this.selectedPage?.content)
    this.displayEditingForm = true;
  }


  editPage(selectedPageName: string) {
    this.selectedPage = this.existingJournalPages.find(page => page.title === selectedPageName);
    this.showEditingForm();
  }


  delPage(entry: string) {
    this.storage.deletePage(entry);
  }

  clearEntrys() {
    localStorage.clear();
  }

  hideForm() {
    this.displayCreationForm = false;
    this.displayEditingForm = false;
  }

  getExistingJournalPages() {
    this.existingJournalPages = this.storage.getPages();
  }

  protected readonly localStorage = localStorage;
}
