import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable, Subject } from 'rxjs';
import { concatMap, map, shareReplay, takeUntil, tap } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<any>();
  @ViewChild('f') form;
  @ViewChild('send') send: FormControl;
  @ViewChild('selectedCity') selectedCity: FormControl;
  cityTownAreaSource: Observable<any> = this.http
    .get('/assets/data/cityarea.json')
    .pipe(shareReplay(1));

  citys: Observable<Array<string>> = this.cityTownAreaSource.pipe(map(x => Object.keys(x)));
  areas: Observable<any> = from([]);

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.send.valueChanges
      .pipe(
        tap(isSend => {
          if (!isSend) {
            return;
          }
          setTimeout(() => {
            this.areas = this.selectedCity.valueChanges.pipe(
              concatMap(cityName =>
                this.cityTownAreaSource.pipe(map(x => Object.keys(x[cityName] ? x[cityName] : {}))),
              ),
            );
          }, 0);
          // kevin大 提示上方的動作可以透過defer實現
          // defer(() => {}).subscribe();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  submitForm() {
    console.log('submit form');
    console.log(this.form);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
