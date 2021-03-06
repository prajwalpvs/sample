import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
 
  constructor(private us:UserService, private router:Router) { }
  courses:any;
  Update:boolean=false;
  ngOnInit(): void {
    this.getdata()
  }
  getdata(){
    this.us.getproducts().subscribe(
       res=>{
            
         this.courses= res["message"]
       },
       err=>{
         alert("Something went wrong in Adding product")
         console.log(err)
       }
     )
   }
userObj:any;
   onSubmit(formRef:any){
     this.userObj=formRef.value
    
        this.us.addproduct(this.userObj).subscribe(
          res=>{
               
                if(res["message"]=="product Added"){
                  alert("Product Added Successfuly")
                }
          },
          err=>{
            alert("Something went wrong in Adding Product")
            console.log(err)
          }
        )
        this.router.navigateByUrl("/viewproducts")
  }
   EditItem(a1,a2,a3,a4,a5,i){
    console.log(this.userObj)  
      /*this.courses[i].productname=a1;
      this.courses[i].productRam=a2;
      this.courses[i].productMemory=a3;
      this.courses[i].productscreensize=a4;
      this.courses[i].productprice=a5;*/
    this.Update = !this.Update;
   }
 
   DeleteItem(i){
    this.courses.splice(i, 1);
   }
 
   goto(){
    this.router.navigateByUrl("/admin")
   }
}