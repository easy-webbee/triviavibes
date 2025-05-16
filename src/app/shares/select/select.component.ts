import { Component, EventEmitter, Input, Output } from '@angular/core';
export interface SelectOption {
  label: string;
  value: string | number;
}
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() value:  string = '';
  @Input() options: SelectOption[] = [];
  @Output() valueChange = new EventEmitter< string>();

  onChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const newValue = target.value;
    this.valueChange.emit(newValue);
  }
}
