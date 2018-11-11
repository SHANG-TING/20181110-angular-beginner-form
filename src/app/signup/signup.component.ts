import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('f') form;
  constructor() {}

  ngOnInit() {}

  submitForm() {
    console.log('submit form');
    console.log(this.form);
  }
}
