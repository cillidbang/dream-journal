

export interface JournalPage {
  id?: number;
  title: string;
  subtitle: string;
  date: string;
  content: string;
}

export interface FormOperationAfterSubmit {
  page: JournalPage;
  operation: SubmitOperation;
}


export enum SubmitOperation {
    CREATE = 'create',
    EDIT = 'edit'
}

