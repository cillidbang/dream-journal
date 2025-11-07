import {Component, ContentChildren, OnInit} from '@angular/core';
import {JournalPage} from '../interfaces/journal-page';
import {NgOptimizedImage} from '@angular/common';
import {RestConnection} from '../../services/rest-connection';
import {FormComponent} from '../shared/form-component/form-component';
import {JournalDialog} from '../shared/journal-dialog/journal-dialog/journal-dialog';


@Component({
  selector: 'app-landing-page',
  imports: [
    NgOptimizedImage,
    JournalDialog,
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage implements OnInit {


  existingJournalPages: JournalPage[] = [];
  titelOfExtendedRows: string[] = [];
  selectedPage: JournalPage | undefined;

  displayEditingForm: boolean = false;


  constructor(private rest: RestConnection) {
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
    this.displayEditingForm = true;
  }

  showEditingForm() {
    this.displayEditingForm = true;
  }

  editPage(selectedPageName: string) {
    this.selectedPage = this.existingJournalPages.find(page => page.title === selectedPageName);
    this.showEditingForm();
  }

  delPage(entry: string) {
    const page = this.existingJournalPages.find(journal => journal.title === entry)!;
    this.rest.deleteJournalById(page.id).subscribe();
    this.reloadTableContent();
  }

  clearEntrys() {
    localStorage.clear();
  }

  afterFormSubmit() {
    this.displayEditingForm = false;
    this.reloadTableContent();
  }

  getExistingJournalPages() {
    this.rest.getJournals().subscribe(data => {
        this.existingJournalPages = data;
    });
  }

  openEditDialog(element: HTMLDialogElement) {
    element.showModal();
  }

  reloadTableContent() {
    window.location.reload();
  }
}
