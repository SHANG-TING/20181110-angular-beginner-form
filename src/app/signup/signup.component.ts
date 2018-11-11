import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('f') form;
  cityTownAreaSource: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get('/assets/data/cityarea.json').subscribe(data => {
      console.log(data);
      this.cityTownAreaSource = data;
    });
  }

  submitForm() {
    console.log('submit form');
    console.log(this.form);
  }
}
