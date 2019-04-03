import { Component, OnInit } from '@angular/core';
import { StorageService}  from '../storage.service';
import {Item} from '../../models/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})

export class ListPage implements OnInit {
  input:string; //variable for input field
  listItems:Array<Item> = []; //array to store the list items
  
  constructor(private storage:StorageService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.readData('list')
    .then((response:any)=>{
      if(response){
        this.listItems = JSON.parse(response);
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  //add item to the list
  addListItem( name:string ){
    this.input = '';
    
    //create new item object
    let item ={name:name, id: new Date().getTime(), status:false };
    //push object to the list item array
    this.listItems.push(item);
    
    //sort before saving
    this.sortList();
    //save the changes to localstorage
    this.saveList();
  }

  //delete item from the list
  deleteItem(id:number){
    this.listItems.forEach((item, index)=>{
      if(item.id == id){
          this.listItems.splice(index,1);          
      }
    });
    //save the changes to localstorage
    this.saveList();
  }

  //change item status after so we can edit it
  changeItemStatus(id:number){
    this.listItems.forEach( (item)=>{
      if(item.id == id){
        item.status = (item.status == false) ? true : false; 
      }
    });
    //save the changes to localstorage
    this.saveList();
  }

  //save data to localstorage
  saveList(){
    //save the data from our list to localstorage
    this.storage.saveData('list', this.listItems)
    .then((response)=>{
      //data written successfully
      console.log('Data saved successfully! :)');
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  //sorting the list
  sortList(){
    this.listItems.sort((item1, item2)=>{
      return item2.id - item1.id;
    });
  }

  //read data from localstorage
  readData( key ){
    return new Promise((resolve,reject)=>{
      try{
        let data = window.localStorage.getItem( key );
        if( data ){
          resolve(data);
        }else{
          throw('no data');
        }
      }
      catch(exception){
        reject(exception);
      }
    })
  }

}
