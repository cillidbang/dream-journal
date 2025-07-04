import { Injectable } from '@angular/core';
import {JournalPage} from '../components/interfaces/journal-page';

@Injectable({
  providedIn: 'root'
})
export class JournalStorage {

  constructor() {}

  savePage(journalPage: JournalPage) {

    const pageTitle = journalPage.title;
    const pageContent = {
      subtitle: journalPage.content.subtitle,
      description: journalPage.content.description
    };

    localStorage.setItem(pageTitle, JSON.stringify(pageContent))

  }

  getPage(pageTitle: string) {
    return localStorage.getItem(pageTitle);
  }

  clearPages() {
    localStorage.clear();
  }

  getPages() {
    const storageLength = localStorage.length;

    if (storageLength <= 0) {
      return [];
    }

    let storageContent = [];

    for (let i = 0; i <= storageLength - 1; i++) {

      const key = localStorage.key(i)!;
      const content = JSON.parse(localStorage.getItem(key)!);

      const obj: JournalPage = { title: key, content: content}

      storageContent.push(obj)
    }
    return storageContent;

  }

}
