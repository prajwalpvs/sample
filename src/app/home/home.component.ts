import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
courses:any;
username:any;
products:any=[];
toview:any;
num=this.us.cartvalue;
constructor(private us:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getdata()
    this.getproduct()
    
    this.username=localStorage.getItem("username")
    
  }
 
getproduct(){
  this.us.getproduct(this.username).subscribe(
    res=>{
         
      this.products= res["message"]
     // this.num=this.products.length
      //this.num=this.us.cartvalue;
    },
    err=>{
      alert("Something went wrong in Adding course")
    })
}
Logout(){
  
    
    localStorage.clear();
  
  this.router.navigateByUrl("/login")
}

viewcart(){
  this.router.navigateByUrl("/viewcart")
}
  getdata(){
    this.us.getproducts().subscribe(
       res=>{
            
         this.courses= res["message"]
       },
       err=>{
         alert("Something went wrong in Adding course")
         console.log(err)
       }
     )
   }


   onSubmit(formRef:any){
    let userObj=formRef.value
    
    console.log(userObj)
    
        this.us.tocart(userObj).subscribe(
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
        
  }

  DeleteItem(i){
    console.log("product is ",this.courses[i])
  }

  viewItem(i){
    let userObj=this.courses[i]
    console.log(userObj)
    this.us.toview=userObj;
    this.router.navigateByUrl("/viewproducts")
    console.log("product is ",userObj)
  }


   addto(formRef){
    let userObj=formRef.value
    this.us.tocart(userObj).subscribe(
      res=>{
            if(res["message"]=="user existed"){
                alert("user name is already taken... choose different user name")
                formRef.clear();
            }
            if(res["message"]=="user created"){
              alert("Registration success")

              //navigate to login component
              this.router.navigateByUrl("/login")
            }

      },
      err=>{
        alert("Something went wrong in user creation")
        console.log(err)
      }
    )
   }
}