import {Component, ElementRef, OnInit, OnChanges, ViewChild, SimpleChanges} from '@angular/core';
import {JournalPage} from '../interfaces/journal-page';
import {NgOptimizedImage} from '@angular/common';
import {RestConnection} from '../../services/rest-connection';
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
export class LandingPage implements OnInit, OnChanges {

  @ViewChild("dialogElement") dialog : ElementRef<HTMLDialogElement> | any;


  existingJournalPages: JournalPage[] = [];
  titelOfExtendedRows: string[] = [];
  selectedPage: JournalPage | undefined;

  displayEditingForm: boolean = false;


  constructor(private rest: RestConnection) {}

  ngOnInit() {
    this.getExistingJournalPages();
  }

  ngOnChanges(change: SimpleChanges) {

    if (change['displayEditingForm']) {
      console.log("CHAGE");
    }

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
    this.dialog.nativeElement.showModal();
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

  closeForm() {
    this.displayEditingForm = false;
  }
  submitForm(journalPage: JournalPage) {
    this.displayEditingForm = false;
    this.rest.addJournal(journalPage).subscribe();
  }


  getExistingJournalPages() {
    this.rest.getJournals().subscribe(data => {
        this.existingJournalPages = data;
    });
  }

  reloadTableContent() {
    window.location.reload();
  }
}
