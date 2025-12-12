import {Component, Input} from '@angular/core';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() imgSrc: string;
  @Input() coloredBG: boolean = true;

  isLoading: boolean = true;
  isError: boolean = false;

  onImageLoad() {
    this.isLoading = false;
    // setTimeout(() => {
    //   this.isLoading = false;
    //   this.isError = true;
    // }, 2000)
  }

  onImageError() {
    this.isLoading = false;
    this.isError = true;
  }
}
