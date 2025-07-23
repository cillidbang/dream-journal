import { Injectable } from '@angular/core';
import {JournalPage} from '../components/interfaces/journal-page';

@Injectable({
  providedIn: 'root'
})
export class JournalStorage {

  constructor() {}

  savePage(entry: JournalPage) {
    localStorage.setItem(entry.title, JSON.stringify(entry))
  }

  deletePage(entry: string) {
    localStorage.removeItem(entry);
  }

  getPage(title: string) {
    const page = JSON.stringify(localStorage.getItem(title));

    if (page != null) {
      return JSON.stringify(localStorage.getItem(title));
    }
    return undefined;
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

      const obj: JournalPage = {
        title: key,
        subtitle: content.subtitle,
        content: content.content,
        date: content.date
      }

      storageContent.push(obj)
    }
    return storageContent;

  }

  testJournalPages: JournalPage[] = [
    {
      title: "Mein erster Eintrag",
      subtitle: "Ein neuer Anfang",
      content: "Heute starte ich mein neues Tagebuch. Ich bin gespannt, was die kommenden Tage bringen werden.",
      date: "2025-07-01"
    },
    {
      title: "Sonniger Tag",
      subtitle: "Wetter und Laune",
      content: "Das Wetter war heute fantastisch! Ich habe einen langen Spaziergang gemacht und dabei Musik gehört.",
      date: "2025-07-02"
    },
    {
      title: "Kleine Herausforderungen",
      subtitle: "Nicht alles lief rund",
      content: "Heute gab es einige Hürden im Job. Aber am Ende habe ich alles gemeistert und bin stolz auf mich.",
      date: "2025-07-03"
    },
    {
      title: "Ein ruhiger Abend",
      subtitle: "Zeit für mich",
      content: "Den Abend habe ich ganz entspannt mit einem Buch auf dem Balkon verbracht.",
      date: "2025-07-04"
    },
    {
      title: "Gedanken zum Wochenende",
      subtitle: "Pläne schmieden",
      content: "Das Wochenende steht vor der Tür. Ich freue mich auf Zeit mit Freunden und gutes Essen.",
      date: "2025-07-05"
    },
    {
      title: "Mein erster Eintrag",
      subtitle: "Ein neuer Anfang",
      content: "Heute starte ich mein neues Tagebuch. Ich bin gespannt, was die kommenden Tage bringen werden.",
      date: "2025-07-01"
    },
    {
      title: "Sonniger Tag",
      subtitle: "Wetter und Laune",
      content: "Das Wetter war heute fantastisch! Ich habe einen langen Spaziergang gemacht und dabei Musik gehört.",
      date: "2025-07-02"
    },
    {
      title: "Kleine Herausforderungen",
      subtitle: "Nicht alles lief rund",
      content: "Heute gab es einige Hürden im Job. Aber am Ende habe ich alles gemeistert und bin stolz auf mich.",
      date: "2025-07-03"
    },
    {
      title: "Ein ruhiger Abend",
      subtitle: "Zeit für mich",
      content: "Den Abend habe ich ganz entspannt mit einem Buch auf dem Balkon verbracht.",
      date: "2025-07-04"
    },
    {
      title: "Gedanken zum Wochenende",
      subtitle: "Pläne schmieden",
      content: "Das Wochenende steht vor der Tür. Ich freue mich auf Zeit mit Freunden und gutes Essen.",
      date: "2025-07-05"
    },
    {
      title: "Mein erster Eintrag",
      subtitle: "Ein neuer Anfang",
      content: "Heute starte ich mein neues Tagebuch. Ich bin gespannt, was die kommenden Tage bringen werden.",
      date: "2025-07-01"
    },
    {
      title: "Sonniger Tag",
      subtitle: "Wetter und Laune",
      content: "Das Wetter war heute fantastisch! Ich habe einen langen Spaziergang gemacht und dabei Musik gehört.",
      date: "2025-07-02"
    },
    {
      title: "Kleine Herausforderungen",
      subtitle: "Nicht alles lief rund",
      content: "Heute gab es einige Hürden im Job. Aber am Ende habe ich alles gemeistert und bin stolz auf mich.",
      date: "2025-07-03"
    },
    {
      title: "Ein ruhiger Abend",
      subtitle: "Zeit für mich",
      content: "Den Abend habe ich ganz entspannt mit einem Buch auf dem Balkon verbracht.",
      date: "2025-07-04"
    },
    {
      title: "Gedanken zum Wochenende",
      subtitle: "Pläne schmieden",
      content: "Das Wochenende steht vor der Tür. Ich freue mich auf Zeit mit Freunden und gutes Essen.",
      date: "2025-07-05"
    }
  ]

}
