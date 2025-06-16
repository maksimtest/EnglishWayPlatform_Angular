import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAnimateIntersection]'
})
export class AnimateDirectiveIntersection implements OnInit {
  @Input('appIntersectionAnimate') direction: 'from-left' | 'from-right' | 'from-bottom' = 'from-bottom';
  @Input() appAnimateIntersection!: void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;

    this.renderer.addClass(element, this.direction);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'animate-in');
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
  }
}
