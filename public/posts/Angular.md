---
name: "Angular"
date: "2024-01-03"
category: "post"
tags: ["Angular", "JavaScript"]
---
# day 1
[[node]]
spa 
component, services, modules
```c
// create new app
ng new appointment-app
// build and run for development
ng serve -o
```

### components
```js
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appointment-app';
  message = 'Hello World';
}
```
### one way data binding
```
{{message}}
```

### create new component
```sh
ng g component appointment-list
```
### create new interface (model)
```
ng generate interface models/appointment
```
### two way binding
Dodać do appmodule.ts FormsModule
```js
@NgModule({
  declarations: [AppComponent, AppointmentListComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
```
```html
<div>
    <input [(ngModel)]="newAppointmetTitle" placeholder="Appointment description" >
    <input [(ngModel)]="newAppointmentDate" type="date" placeholder="Appointment date">
    <button (click)="addAppointment()">Add</button>
</div>
```
```js
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})

export class AppointmentListComponent {
  newAppointmetTitle: string = '';
  newAppointmentDate: Date = new Date();
  appointments: Appointment[] = [];
  addAppointment() {}
}
```

### lists and loops
```html
<ul>
    <li *ngFor="let appointment of appointments">
        <p>{{appointment.title}} {{appointment.date | date:'dd.MM.yyyy'}}</p>
    </li>
</ul>
```
### lifecycle hooks
```js
// import
import { OnInit } from '@angular/core';
// extend class
class AppointmentListComponent implements OnInit

//implement method
  ngOnInit() {
    this.appointments = this.getSavedAppointments();
  }
```

# day 2
generate module `ng generate module module-name` or `ng g m module-name`

generate component `ng generate component component-name` or `ng g c component-name`

generate component for module `ng g c component-name --module=module-name`

generate service `ng generate service service-name` or `ng g s service-name`

generate interface (model) `ng g i interface-name`

### form validation
1. reactive - validate from TypeScript class
2. Template-driven validate in HTML 
### binding form and formgroup
```ts
export class ReservationFormComponent {
  reservationForm: FormGroup = new FormGroup({});
}
```
```html
<form [formGroup]="reservationForm">

</form>
```
### validation messages
```html
<div>
	<label for="">Room number</label>
	<input type="number" formControlName="roomNumber">
	<div *ngIf="reservationForm.get('roomNumber')?.invalid
		&& reservationForm.get('roomNumber')?.touched">
		room number date required
	</div>
</div>
```
### ng template, conditional rendering
```html
<h2>Reservations list</h2>
<ul *ngIf="reservations.length; else noReservation">
    <li *ngFor="let reservation of reservations">
        Guest: {{reservation.guestName}}
        CheckInDate: {{reservation.checkInDate}}
        CheckOutDate: {{reservation.checkOutDate}}
    </li>
</ul>

<ng-template #noReservation>
    <p>No reservation available</p>
</ng-template>
```
### router navigate
```js
import { Router } from '@angular/router';
this.router.navigate(['/list']);
```
# day 3
### observables