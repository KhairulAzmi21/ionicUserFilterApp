import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public userList = [];
  public filter;
  isNotFiltered:boolean = false;
  
  //base 
  url = "http://api.ainakhai.com/v1/user?";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: Http,public loadingCtrl: LoadingController) {
      this.httpRequestGet();
  }

  httpRequestGet() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loading.present();
    
    console.log(this.navParams.get('tapis'));
    this.filter = this.navParams.get('tapis');
    this.getFilteredUser();
     
     //http request
     this.http.get(this.url)
     .map(res => res.json())
     .subscribe(data => {
         this.userList = data.data;
          if(this.userList.length < 1){
            this.isNotFiltered = true;
          }
     },
     () => {
      loading.dismiss();
      });
  }

  getFilteredUser(){
          //check agama null atau tidak
    if(this.filter.agama != null){    
        //  tambah perkataan(String) dalam url atau concatenate url
        this.url = this.url + "agama="+ this.filter.agama+"&";
    }
      //check status null atau tidak
    if(this.filter.status != null){
        this.url = this.url + "status="+ this.filter.status+"&";
    }
    //check jantina null atau tidak
    if(this.filter.jantina != null){
      this.url = this.url + "jantina="+ this.filter.jantina+"&";
    }
    //check bangsa null atau tidak
    if(this.filter.bangsa != null){
      this.url = this.url + "bangsa="+ this.filter.bangsa+"&";
    }
    //check bangsa null atau tidak
    if(this.filter.negeri != null){
      this.url = this.url + "negeri="+ this.filter.negeri+"&";
    }
  }
}
