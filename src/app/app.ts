import { Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {JournalPage} from './components/interfaces/journal-page';
import {JournalStorage} from './services/journal-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'test-seite';

  journalPages: JournalPage[] = [];

  constructor(private storage: JournalStorage) {
  }

  ngOnInit() : void {
    this.setPages();
  }

  setPages() {
    this.journalPages = this.storage.getPages();
  }


}
