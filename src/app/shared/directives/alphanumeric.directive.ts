import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphanumeric]'
})
export class AlphanumericDirective {

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    const pattern = /^[a-zA-Z0-9]$/;
    return pattern.test(event.key);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const clean = text.replace(/[^a-zA-Z0-9]/g, '');
    document.execCommand('insertText', false, clean);
  }
}