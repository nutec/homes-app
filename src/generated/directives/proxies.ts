import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  inject,
} from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';
import type { Components } from '../../../stencil-library/src/components';
import { defineCustomElement as defineMyComponent } from '../../../stencil-library/src/components/my-component/my-component';

@ProxyCmp({
  defineCustomElementFn: defineMyComponent,
})
@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
})
export class MyComponent implements Components.MyComponent {
  @Input() first!: string;
  @Input() last!: string;
  @Input() middle!: string;

  protected z = inject(NgZone);
  protected el: HTMLMyComponentElement;

  constructor() {
    const cdr = inject(ChangeDetectorRef);
    const elementRef = inject(ElementRef);

    cdr.detach();
    this.el = elementRef.nativeElement;
  }
}
