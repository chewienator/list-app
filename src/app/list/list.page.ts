import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  input:string; //variable for input field
  listItems:Array<string> = []; //array to store the list items
  constructor() { }

  ngOnInit() {
  }

  addListItem( item:string ){
    this.input = '';
    this.listItems.push( item );
    // console.log(this.listItem);
}

}
