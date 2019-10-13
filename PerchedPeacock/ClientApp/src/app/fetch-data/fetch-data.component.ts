import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParkingInfo } from '../ParkingInfo';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {
    public parkings: ParkingInfo[];

    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        http.get<ParkingInfo[]>(baseUrl + 'api/parkinginfo').subscribe(result => {
            this.parkings = result;
        }, error => console.error(error));
    }
}
