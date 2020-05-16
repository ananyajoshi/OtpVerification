import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { VerifyService } from '../Verify/verify.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})
export class VerifyPage {

  public mno;
  public otp;
  public id  ;
 
  public disableVerifyOtp: boolean = false;


  constructor(public navCtrl: NavController, public verifyservice: VerifyService, http: HttpClientModule,public navParams: NavParams ) { 
    this.mno = navParams.get('item');
  }
  submitted = false;
  
  ngOnInit() {
    console.log('welcome to verification');
    
  }

  action2(){
    console.log('verification of otp started');
    this.verifyservice.verifyOtp(this.otp,this.mno).subscribe(
    res=> console.log(res),
    error=> console.log(error),
    ()=> {

        this.verifyservice.updateLogin(this.id).subscribe(
            response => {
              console.log(response);},
            error => {
              console.log(error);
            });
    }
     ) }
   


  
 
  action3() {
    console.log('action3 done');
    try {
      this.verifyservice.resendOtp(this.mno)
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



}


