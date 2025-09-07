import {Component, OnInit} from '@angular/core';
import {TagebuchForm} from '../shared/tagebuch-form/tagebuch-form';
import {JournalStorage} from '../../services/journal-storage';
import {JournalPage} from '../interfaces/journal-page';
import {NgOptimizedImage} from '@angular/common';
import {RestConnection} from '../../services/rest-connection';


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

  constructor(private storage: JournalStorage, private rest: RestConnection) {
  }

  ngOnInit() {
    this.getExistingJournalPages();
  }


  collapseRow(title: string) {

    let collapsed = this.titelOfExtendedRows;
    let index = collapsed.indexOf(title);

    !collapsed.includes(title) ?
      collapsed.push(title) :
      collapsed.splice(index);
  }

  checkIfCollapsed(entry: string) {
    return this.titelOfExtendedRows.includes(entry);
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
    this.rest.getJournals().subscribe(data => {
        this.existingJournalPages = data;
    });
  }

  protected readonly localStorage = localStorage;
}
