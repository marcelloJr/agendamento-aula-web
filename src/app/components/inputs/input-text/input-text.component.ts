import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  @Input() name = '';
  @Input() label = '';
  @Input() formGroup!: FormGroup;
  @Input() required: string | boolean = false;

  errorMessage = '';

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(control: SimpleChange){
    console.log(control);
  }

}
