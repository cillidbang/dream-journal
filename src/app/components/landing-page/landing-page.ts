import { Component } from '@angular/core';
import {TagebuchForm} from '../shared/tagebuch-form/tagebuch-form';
import {JournalStorage} from '../../services/journal-storage';


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
    TagebuchForm
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

    constructor(private storage: JournalStorage) {}

    showTagebuch: boolean = false;

    showTagebuchForm() {
      this.showTagebuch = true;
      console.log(this.showTagebuch)
    }

    hideForm() {
      this.showTagebuch = false;
    }

    clearStorage(){
      this.storage.clearPages();
      console.log("storage cleared.")
    }

    showPages() {
      console.log(this.storage.getPages());
    }

}
