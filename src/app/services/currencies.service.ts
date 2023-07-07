import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, delay, map, mergeMap, Observable, retry, retryWhen, tap, throwError, timer } from 'rxjs'
import { ICurrency } from '../models/currency'
import { environment } from 'src/environment'

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  constructor(
    private http: HttpClient
  ) {}

  private apiKey = environment.API_KEY
  private apiUrl = environment.API_URL

  getAlternativeData(): Observable<{ key: string, value: number }[]> {
    
    const headers = new HttpHeaders().set("apikey", this.apiKey);
  
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => {
        const quotesArray = Object.entries(response.quotes).map(([key, value]) => ({
          key,
          value: Number((1 / Number(value) ).toFixed(4)) // Cast value to number
        }));
        console.log(response);
        return quotesArray;
      }),
      retryWhen(errors => errors.pipe(
        mergeMap((error, retryCount) => {
          if (error.status === 429 && retryCount < 2) {

            console.log("Api limit exceeded");
            
          }
          throw error; // Throw the error if it's not a 429 error or exceeded retry count
        })
      )),
      catchError(error => this.handleGetAlternativeDataError(error))
    );
  }
  
  handleGetAlternativeDataError(error: any): Observable<never> {
    console.error('Error:', error);
    // Handle the error, e.g., show an error message or perform other actions
  
    return throwError(error);
  }
  private errorHandler(error: HttpErrorResponse) {
    return throwError(() => error.message)
  }
}