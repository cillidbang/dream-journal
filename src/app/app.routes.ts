import { Routes } from '@angular/router';
import { Loginpage } from './components/loginpage/loginpage';
import { LandingPage } from './components/journal-overview/landing-page';
import {HeroPage} from './components/hero-page/hero-page/hero-page';

export const routes: Routes = [
  {path: '', component: HeroPage},
  {path: 'overview', component: LandingPage},
];
