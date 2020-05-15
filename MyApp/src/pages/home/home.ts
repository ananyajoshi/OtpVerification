import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../home/home.service';
import { HttpClientModule } from '@angular/common/http';
import {VerifyPage} from '../Verify/verify';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public mno : number;
  public otp;
  
 


  constructor(public navCtrl: NavController, public homeservice: HomeService, http: HttpClientModule) { 
   
  }
  submitted = false;
  ngOnInit() {
    console.log('welcome');
    // this.action();
  }

 

  action() {
    console.log("action done");
    try {
      this.homeservice.getOtp(this.mno)
        .subscribe((res: Response) => {
          console.log(res);

        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }


 
  public test(event ,item ){
    this.navCtrl.push(VerifyPage,{
    item:this.mno
    });
    }
  




}
