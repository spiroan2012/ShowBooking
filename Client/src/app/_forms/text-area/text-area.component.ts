import { Component, Input, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {
  @Input() label: string;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }
  
  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
  }

}
