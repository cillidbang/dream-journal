import {FormControl, FormGroup} from '@angular/forms';

export interface JournalPage {
  title: string;
  content: PageContent;
}

export interface PageContent {
  subtitle: string,
  description: string
}


export interface JournalForm {
   FormGroup: FormGroup<{
    title: FormControl<string | null>
    subtitle: FormControl<string | null>
    description: FormControl<string | null>
  }>
}
