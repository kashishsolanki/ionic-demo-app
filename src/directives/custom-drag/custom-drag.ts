import { Directive, Input, ElementRef, Renderer } from '@angular/core';

/*
* Custom Directive for drag button event
*/

@Directive({
  selector: '[custom-drag]',
  host: {
    '(pan)': 'handlePan($event)'
  }
})
export class CustomDragDirective {

  @Input('startLeft') startLeft: any;
  @Input('startTop') startTop: any;

  constructor(public element: ElementRef, public renderer: Renderer) {
    
  }

  ngAfterViewInit(){
    //set button left, top and position
    this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
    this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');
  }

  handlePan(event) {
    // handle drag events

    let newLeft = event.changedPointers[0].x;
    let newTop = event.changedPointers[0].y;

    console.log(newLeft);
    console.log(newTop);

    if(newLeft == 0 && newTop == 0){
      newLeft = 20;
      newTop = 100;
    }

    this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
    this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
  }

}
