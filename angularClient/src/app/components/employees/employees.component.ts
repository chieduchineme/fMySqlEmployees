import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Subject, Subscription, interval, map, takeWhile, tap } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const MY_INJECTION_TOKEN = new InjectionToken<string>('my_injection_token');
interface Employee {
  username: number;
  email: string;
  acctNumber: string;
  // other properties...
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
// export class EmployeesComponent {
  

//   EmployeeArray : any[] = [];
//   isResultLoaded = false;
//   isUpdated = false;

//   username: string = "";
//   email: string = "";
//   acctNumber: string = "";
//   currentEmployeeId = "";

//   constructor(private http: HttpClient) {
//     this.getAllStudent();
//   }

//   getAllStudent() {
//     this.http.get("http://localhost:3000/user/getAll").subscribe((resultData: any)=> {
//       // console.log(resultData);
//       this.EmployeeArray = resultData.data;
//       this.isResultLoaded = true;
//     })
//   }

//   ngOnInit(): void {
//   }

//   register() {
//     let bodyData = {
//       "username": this.username,
//       "address": this.email,
//       "acctNumber": this.acctNumber,
//     };
//     this.http.post("http://localhost:3000/user/register", bodyData).subscribe((resultData: any)=> {
//       // console.log(resultData);
//       console.log("Student Registered Successfully")
//       this.username = "";
//       this.email= "";
//       this.acctNumber= "";
//       this.getAllStudent();
//     });
//   }

//   setUpdate(data: any) {
//     this.username = data.username;
//     this.email = data.email;
//     this.acctNumber = data.acctNumber;

//     this.currentEmployeeId = data._id;
//     //console.log(this.currentEmployeeId);
//   }

//   UpdateRecords() {
//     let bodyData = {
//       "username": this.username,
//       "address": this.email,
//       "acctNumber": this.acctNumber,
//     };
//     // console.log(this)
//     this.http.patch("http://localhost:3000/user/update"+ "/"+ this.currentEmployeeId, bodyData).subscribe((resultData: any)=> {
//       this.isUpdated = true;
//       console.log("Employee Updated");
//       this.getAllStudent();
//     });
//   }

//   save() {
//     if(this.currentEmployeeId == '') {
//       this.register();
//     } else {
//       this.UpdateRecords();
//     }
//   }

//   setDelete(data: any) {
//     this.http.delete("http://localhost:3000/user/delete"+ "/"+ data.id).subscribe((resultData: any)=> {
//       console.log(resultData);
//       console.log("Employee Deleted")
//       this.getAllStudent();
//     });
//   }
// }
export class EmployeesComponent {
  name: string;
	health: number;
	damageSubscription: Subscription;

	constructor(@Inject(MY_INJECTION_TOKEN) name: string, damageSubject: Subject<number>) {
		this.name = name;
		this.health = 100;
		this.damageSubscription = damageSubject.subscribe((damage) => {
			this.health -= damage;
			console.log(`${this.name} was hurt for ${this.health} ${damage} damage`);
		});
	}

	takeCover() {
	 	// this.damageSubscription.unsubscribe();
		interval(1000)
			.pipe(
				takeWhile(() => this.health < 100),
				map(() => 10),
				tap(() =>
					console.log(`${this.name} is healing, current health is ${this.health}`)
				)
			)
			.subscribe((heal) => {
	 			this.health += heal;
        console.log(this.health)
			});
	}
}

const explosion = new Subject<number>();
const john = new EmployeesComponent("John", explosion);
const sam = new EmployeesComponent("Sam", explosion);

explosion.next(10);
john.takeCover();
explosion.next(20);

const paul = new EmployeesComponent("Paul", explosion);
sam.takeCover();
explosion.next(20);
paul.takeCover();







