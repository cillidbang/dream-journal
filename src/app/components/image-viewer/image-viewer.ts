import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './image-viewer.html',
  styleUrl: './image-viewer.scss'
})
export class ImageViewer {

  @Input() images: String[] = [];
  @ViewChild('dialog') dialog : ElementRef<HTMLDialogElement> | any;


  getFormattedImages() {
    let converted: string[] = []

    if (!this.images || this.images.length <= 0) return [];

    for (const base64 of this.images) {
      converted.push(`data:image/jpg;base64,${base64}`)
    }
    return converted;
  }

  open() {
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }

}
