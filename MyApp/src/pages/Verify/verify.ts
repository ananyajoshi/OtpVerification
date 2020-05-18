import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { VerifyService } from '../Verify/verify.service';
import { HttpClientModule } from '@angular/common/http';
import { HomePage} from '../home/home'

@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html'
})
export class VerifyPage {

  public mno;
  public otp;
 
  public disableVerifyOtp: boolean = false;
 // mno_str: string = this.mno.toString()

  constructor(public navCtrl: NavController, public verifyservice: VerifyService, http: HttpClientModule,public navParams: NavParams ) { 
    this.mno = navParams.get('item');
  }
  submitted = false;
  
  ngOnInit() {
    console.log('welcome to verification');
    // this.action();
  }

  action2(){
    console.log('verification of otp started');
    this.verifyservice.verifyOtp(this.otp,this.mno).subscribe(
    res=> console.log(res),
    error=> console.log(error),
    ()=> {
        console.log(this.mno);
        this.verifyservice.saveMobile(this.mno).subscribe(
            response => {
              console.log(response);},
           
            );
           
       
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

changenumber(){
    this.navCtrl.push(HomePage);
}

}


