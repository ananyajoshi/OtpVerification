
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { VerifyPage } from '../Verify/verify';
import { HomeService } from './home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public mno : number;
  public otp;
  public id;

  constructor(public navCtrl: NavController, public homeservice: HomeService, http: HttpClientModule) { 
   
  }
  submitted = false;
  ngOnInit() {
    console.log('welcome');
    
  }

 
  action() {
    console.log("action done");
    this.homeservice.logintry(this.mno).subscribe((res: Response) => {
      this.id=res["id"];
      console.log("id is "+this.id);
      //this.homeservice.updId(this.id);
      this.test(this.id,this.mno);
    },
      error => {
        console.log(error, "error");
      });
    try {
      this.homeservice.getOtp(this.mno)
        .subscribe((res: Response) => {
          console.log(res);

        },
          error => {
            console.log(error, "error");
          });
        
    } catch (e) {
      console.log(e);
    }
  }
    //(click)="test($event,item)"
  public test(obj ,item ){
    this.navCtrl.push(VerifyPage,{
    item:this.mno,
    obj:this.id
    });
    }
}
