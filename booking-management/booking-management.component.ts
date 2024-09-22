import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs'; // Use 'of' to return an observable when handling errors



@Component({
  selector: 'app-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent {
  bookingType: string | undefined;
  bookingData: any = {};
  bookings: any[] | undefined;

  constructor(private dataService: DataService) {}

  createBooking() {
    if (this.bookingType === 'room') {
      this.dataService.bookRoom(this.bookingData).subscribe(data => {
        console.log('Room booked:', data);
      });
    } else if (this.bookingType === 'uber') {
      this.dataService.bookUber(this.bookingData).subscribe(data => {
        console.log('Uber booked:', data);
      });
    } else if (this.bookingType === 'meal') {
      this.dataService.bookMeal(this.bookingData).subscribe(data => {
        console.log('Meal booked:', data);
      });
    }
  }

  fetchBookings() {
    this.dataService.getBookings().subscribe(data => {
      this.bookings = data.bookings;
    });
  }

}
