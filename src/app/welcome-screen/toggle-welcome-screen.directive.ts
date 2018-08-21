import { Directive, OnInit, ElementRef, Renderer2, AfterViewInit, HostListener } from "@angular/core";

@Directive({
    selector: '[toggleWelcomeScreen]'
})
export class ToggleWelcomeScreenDirective implements OnInit, AfterViewInit{
    constructor(private eleRef:ElementRef, private renderer:Renderer2){}
    ngOnInit(){}

    ngAfterViewInit(){
        setTimeout(function(){
            this.renderer.removeClass(this.eleRef.nativeElement.parentNode.parentNode,'content-hidden');
        }.bind(this),900)
    }

    @HostListener('click',['$event']) onClick(event:MouseEvent){
        event.preventDefault();
        this.renderer.addClass(this.eleRef.nativeElement.parentNode.parentNode,'content-hidden');
        this.renderer.setStyle(this.eleRef.nativeElement.parentNode.parentNode,'display','none');
    }
}