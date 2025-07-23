import { Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  protected title = 'test-seite';


  constructor() {
  }




}
