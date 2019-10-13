import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParkingInfo } from '../parkingInfo';
import { ParkingService } from '../parking.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent implements OnInit {
    public parkings: ParkingInfo[];

    constructor(private parkingService: ParkingService) { }

    getHeroes(): void {
        this.parkingService.getParkings().subscribe(p => this.parkings = p);
    }

    delete(parking: ParkingInfo): void {
        this.parkingService.deleteParking(parking.id).subscribe(() => this.getHeroes());
    }

    ngOnInit() {
        this.getHeroes();
    }
}
