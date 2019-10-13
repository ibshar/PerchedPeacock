import { Injectable } from '@angular/core';
import { ParkingInfo } from './parkingInfo';
import { PARKINGS } from './MockParkingInfos';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

    private parkingInfoUrl = 'api/ParkingInfo';  // URL to web api
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
        console.info("Parking service Init!")
        //PARKINGS.forEach(function (value) {
        //    this.addParking(value).subscribe();
        //});
    }

    getParkings(): Observable<ParkingInfo[]> {
        return this.http.get<ParkingInfo[]>(this.parkingInfoUrl)
            .pipe(catchError(this.handleError<ParkingInfo[]>('getParkings', [])));
    }

    getParking(id: number): Observable<ParkingInfo> {
        const url = `${this.parkingInfoUrl}/${id}`;
        return this.http.get<ParkingInfo>(url).pipe(
            catchError(this.handleError<ParkingInfo>(`getParking id=${id}`)));
    }

    updateParking(parking: ParkingInfo): Observable<any> {
        return this.http.put(this.parkingInfoUrl, parking, this.httpOptions).pipe(
            catchError(this.handleError<any>('updateParking')));
    }

    addParking(parking: ParkingInfo): Observable<ParkingInfo> {
        console.info(`adding ParkingInfo w/ id=${parking.id}, ${parking.vehicleNo}, ${parking.vehicleWeight}, ${parking.lotId}`)
        return this.http.post<ParkingInfo>(this.parkingInfoUrl, parking, this.httpOptions).pipe(
            tap((newParking: ParkingInfo) => console.info(`added ParkingInfo w/ id=${newParking.id}`)),
            catchError(this.handleError<ParkingInfo>('addParking')));
    }

    deleteParking(parking: ParkingInfo | number): Observable<ParkingInfo> {
        const id = typeof parking === 'number' ? parking : parking.id;
        const url = `${this.parkingInfoUrl}/${id}`;
        return this.http.delete<ParkingInfo>(url, this.httpOptions).pipe(
            catchError(this.handleError<ParkingInfo>('deleteParking')));
    }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            //// TODO: better job of transforming error for user consumption
            //this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
