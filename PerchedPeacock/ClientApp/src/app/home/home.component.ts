import { Component, OnInit } from '@angular/core';
import { ParkingInfo } from '../parkingInfo';
import { ParkingService } from '../parking.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    pInfo = new ParkingInfo();
    newAmount: number;
    resultVisible = false;
    updateMode = false;

    reserveParking(): void {
        this.parkingService.addParking(this.pInfo).subscribe(newP => {
            this.pInfo = new ParkingInfo();
            this.pInfo.amount = newP.amount;
            this.resultVisible = true;
        });
    }

    updateParking(): void {
        this.parkingService.updateParking(this.pInfo).subscribe(() => this.goBack());
    }

    getParking(): void {
        this.updateMode = false;
        let id = +this.route.snapshot.paramMap.get('id');
        console.info(`get id = ${id}`);
        if (id) {
            this.parkingService.getParking(id)
                .subscribe(parking => this.pInfo = parking);
            this.resultVisible = true;
            this.updateMode = true;
        }
    }

    goBack(): void {
        this.location.back();
    }

    constructor(
        private route: ActivatedRoute,
        private parkingService: ParkingService,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.getParking();
    }
}
