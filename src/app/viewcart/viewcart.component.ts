import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  products:any;
  username:any;
  total:any=0;
  length:number;
  productname:any;
 
  constructor(private us:UserService, private router:Router) { }
 
  ngOnInit(): void {
    this.username=localStorage.getItem("username")
    this.getproducts();
    this.totalamnt();
  }
 
  getproducts(){
    this.us.getproduct(this.username).subscribe(
      res=>{
           
        this.products= res["message"]
        let cartnum:[]=this.products
        this.us.cartvalue=cartnum.length
      },
      err=>{
        alert("Something went wrong in Adding product")
        console.log(err)
      }
    )
  }
 
  totalamnt(){
for(let i=0;i<this.products.length;i++)
{
  this.total=this.total+this.products[i].productprice
 
}
  }
 
  deleteproduct(productname){
    
    this.us.deleteproduct(productname).subscribe(
      res=>{
           
        if(res["message"]=="Product details deleted")
        {
          alert("product removed")
          this.getproducts();
        }
      },
      err=>{
        alert("Something went wrong in Adding product")
        console.log(err)
      }
    )
  }
  goback(){
    this.router.navigateByUrl("/viewproducts")
  }
 
}