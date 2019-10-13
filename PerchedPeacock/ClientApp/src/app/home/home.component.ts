import { Component, OnInit } from '@angular/core';
import { ParkingInfo } from '../ParkingInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    pInfo: ParkingInfo;

    public ReserveParking() {
        
    }
    constructor() { }

    ngOnInit(): void {
    }
}
