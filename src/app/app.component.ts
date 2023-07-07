import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';
import { CurrenciesService } from './services/currencies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  showCurrencies = 3;
  currentDate = new Date();
  currenciesArray: { key: string, value: number }[] = [];
  previousCurrencies: { [key: string]: number } = {};
  errorMessage: string = '';
  getRemoteApi: boolean = false
  timeInterval: number = 5000

  private dataSubscription: Subscription;

  constructor(
    private currenciesService: CurrenciesService,
    private changeDetectorRef: ChangeDetectorRef
  ) { timer(0, 1000).subscribe(() => this.currentDate = new Date()) }

  ngOnInit(): void {
    this.loadRemoteData();
    this.startRemoteDataUpdates(); 
  }

  ngOnDestroy(): void {
    this.stopDataUpdates(); 
  }

  private loadRemoteData(): void {
    this.currenciesService.getAlternativeData().subscribe(
      (currencies) => {
        this.previousCurrencies = { ...this.currenciesArray.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {}) };
        this.currenciesArray = currencies.sort((a, b) => {
          const sortOrder = ["RUBGBP", "RUBEUR", "RUBUSD"];
          const indexA = sortOrder.indexOf(a.key);
          const indexB = sortOrder.indexOf(b.key);
          return indexA - indexB;
        });
        this.currenciesArray.reverse();
        this.errorMessage = ''; // Clear error message if successful
        this.changeDetectorRef.detectChanges(); // Trigger change detection
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching the data.';
        console.error(error);
      }
    );
  }


  private startRemoteDataUpdates(): void {
    this.dataSubscription = interval(this.timeInterval).subscribe(() => {
      this.loadRemoteData();
    });
  }

  private stopDataUpdates(): void {
    this.dataSubscription.unsubscribe();
  }

  calculateDifference(currentValue: number, previousValue: number): string {
    const difference = currentValue - previousValue;
    if (difference == 0) {
      return difference.toFixed(2);
    }
    if (difference < 0) {
      return difference.toFixed(2);
    } else {
      return "+" + difference.toFixed(2);
    }
  }


}
