import { Directive, ElementRef, AfterViewChecked, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {
    // class name to match height
    @Input() appMatchHeight: string;

    constructor(private eleRef: ElementRef) {
    }

    ngAfterViewChecked() {
        setTimeout(function(){
            this.matchHeight(this.eleRef.nativeElement, this.appMatchHeight);
        }.bind(this), 800);
    }

    matchHeight(parent: HTMLElement, className: string) {
        if(!parent) return;
        
        const children = parent.getElementsByClassName(className);
        if(!children) return;

        const itemHeights = Array.from(children).map(function(item){
            return item.getBoundingClientRect().height;
        });

        const maxHeight = itemHeights.reduce(function(prev,curr){
            return curr > prev ? curr : prev;
        }, 0);

        Array.from(children).forEach(
            (ele:HTMLElement) => ele.style.height = `${maxHeight}px`
        );
    }

    @HostListener('window:resize') 
    onResize() {
        // call our matchHeight function here
        this.matchHeight(this.eleRef.nativeElement, this.appMatchHeight);
    }

    
}