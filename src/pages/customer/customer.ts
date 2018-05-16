import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import {Storage } from '@ionic/storage'
import { ImagePicker } from '@ionic-native/image-picker';
import { SelectSearchable } from 'ionic-select-searchable';
import { empty } from 'rxjs/Observer';

@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
  
})
export class CustomerPage {
  private customers:any;
  private isToogle: boolean = false;
  private isList: boolean = true;
  private isSearch: boolean = true;
  private itemList = [];
  private items = [];
  private item =  {"bookImg":"","bookName":"","bookPlace":"","bookPrice":""};
  private base64Image:any;

  constructor(public toastCtrl: ToastController
    , public platform: Platform
    , public alertCtrl: AlertController
    , public navCtrl: NavController
    , public navParams: NavParams,
      public storage: Storage,
      private imagePicker: ImagePicker) {
      
      this.storage.ready().then(() => {
        storage.get('myList').then((username) => {
          if(username != null){
             this.itemList = username;
          }
        });      
      });           
    }

  ionViewDidLoad(){
    // this.permissions.requestPermission(this.permissions.READ_EXTERNAL_STORAGE, success, error);
    // function error() {
    //   console.warn('read external storage permission is not turned on');
    // }
    // function success(status) {
    //   if(!status.hasPermission) error();
    // }
    console.log('ionViewDidLoad CustomerPage');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = this.itemList
    // set val to the value of the searchbar
    let val = ev.target.value;
    var j = "";
    if(val == ""){
      j = null;
    }else{
      j = val;
    }
    
    // if the value is an empty string don't filter the items
    if(val !== ""){
      this.items = this.items.filter((item:any) => { 
        return (item.bookName.indexOf(val.toLowerCase()) > -1); 
      })
      this.isList = false;
    }else{
      this.items = [];
      this.isList = true;
    }
  }

  public img(){
    let options = {
      maximumImagesCount: 1,
      quality: 100
    }

    this.imagePicker.getPictures(options)
                    .then((results) => {
                       this.base64Image = results;

                    }, (err) => { 
                      console.log('error') });
  
  }

  public add(form){
    let bookList = {"bookImg":this.base64Image,
                    "bookName": form.bookName,
                    "bookPlace": form.bookPlace,
                    "bookPrice":form.bookPrice}
    this.itemList.push(bookList); 
    this.storage.set('myList',this.itemList);
    this.openForm();
  }

  public delete(item){
    this.itemList.splice(item,1);
    this.storage.remove('myList');
    this.storage.set('myList',this.itemList);
  }

  public deleteList(item,num){
    this.items.splice(num,1);
    let target =  this.item.bookName
    for(let i = 0;i<this.itemList.length;i++){

      if(this.itemList[i].bookName == target){
        this.delete(i);
      }
      
    }
    this.delete(item)
  }


  openForm(){
    this.isToogle = !this.isToogle;
    this.isSearch = !this.isSearch
    this.isList = !this.isList;
  }

  ionViewDidLeave(){
    this.storage.remove('myList');
    this.storage.set('myList',this.itemList);
  }


}
