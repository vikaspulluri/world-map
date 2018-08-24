import { Directive, OnInit, ElementRef, Renderer2, AfterViewInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";

@Directive({
    selector: '[toggleWelcomeScreen]'
})
export class ToggleWelcomeScreenDirective implements OnInit, AfterViewInit{
    constructor(private eleRef:ElementRef, private renderer:Renderer2, private router:Router){}
    ngOnInit(){}

    ngAfterViewInit(){
        setTimeout(function(){
            this.renderer.removeClass(this.eleRef.nativeElement.parentNode.parentNode,'content-hidden');
        }.bind(this),900)
    }

    @HostListener('click',['$event']) onClick(event:MouseEvent){
        event.preventDefault();
        this.renderer.addClass(this.eleRef.nativeElement.parentNode.parentNode,'content-hidden');
        this.router.navigate(['/continents']);
    }
}