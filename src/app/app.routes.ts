import { Routes } from '@angular/router';
import { JournalOverview } from './components/journal-overview/journal-overview.component';
import {HeroPage} from './components/hero-page/hero-page/hero-page';

export const routes: Routes = [
  {path: '', component: HeroPage},
  {path: 'overview', component: JournalOverview},
];
