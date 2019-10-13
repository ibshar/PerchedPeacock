import { Component, OnInit } from '@angular/core';
import { ParkingInfo } from '../parkingInfo';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    pInfo = new ParkingInfo();
    newId: number;
    newAmount: number;
    resultVisible = false;

    reserveParking(): void {
        this.parkingService.addParking(this.pInfo).subscribe(newP => {
            this.newId = newP.id;
            this.newAmount = newP.amount;
            this.pInfo = new ParkingInfo();
            this.resultVisible = true;
        });
    }
    constructor(private parkingService: ParkingService) { }

    ngOnInit(): void {
    }
}
