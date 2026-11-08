import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

interface CounterContext {
  $implicit: number;
}

@Directive({
  selector: '[appCounter]',
})
export class CounterDirective {
  private readonly template = inject<TemplateRef<CounterContext>>(TemplateRef);
  private readonly container = inject(ViewContainerRef);

  @Input({ required: true })
  set appCounterOf(count: number) {
    const total = Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0;

    while (this.container.length > total) {
      this.container.remove();
    }

    while (this.container.length < total) {
      this.container.createEmbeddedView(this.template, {
        $implicit: this.container.length + 1,
      });
    }
  }

  static ngTemplateContextGuard(
    _directive: CounterDirective,
    _context: unknown,
  ): _context is CounterContext {
    return true;
  }
}
