import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { UserPage } from '../user/user';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  religionList = [];
  stateList = [];
  genderList = [];
  statusList = [];
  raceList = [];
  //declare object filter
  filter : { agama,bangsa,jantina,status,negeri};

  constructor(public navCtrl: NavController, public http:Http) {
      //define value object sebagai null
      this.filter = { agama : null,bangsa : null,jantina:null,status:null,negeri:null};

      this.getReligion();
      //cuba buat dapat 4 value ni . 
      this.getState();    
      this.getGender();  
      this.getStatus();   
      this.getRace();    
  }

  tapisUser(){
        //console.log(this.filter);
        this.navCtrl.push(UserPage, {
          tapis : this.filter
        });
  }

    getReligion(){
      this.http.get('http://api.ainakhai.com/v1/religion')
      .map(res => res.json())
      .subscribe(
        data => {
          this.religionList = data;
          console.log(this.religionList);
        });
    }

    getGender(){
      this.http.get('http://api.ainakhai.com/v1/gender')
      .map(res => res.json())
      .subscribe(
        data => {
          this.genderList = data;
          console.log(this.genderList);
        });
    }

    getStatus(){
      this.http.get('http://api.ainakhai.com/v1/status')
      .map(res => res.json())
      .subscribe(
        data => {
          this.statusList = data;
          console.log(this.statusList);
        });
    }

    getRace(){
      this.http.get('http://api.ainakhai.com/v1/race')
      .map(res => res.json())
      .subscribe(
        data => {
          this.raceList = data;
          console.log(this.raceList);
        });
    }

    getState(){
      this.http.get('http://api.ainakhai.com/v1/state')
      .map(res => res.json())
      .subscribe(
        data => {
          this.stateList = data;
          console.log(this.stateList);
        });
    }
}
