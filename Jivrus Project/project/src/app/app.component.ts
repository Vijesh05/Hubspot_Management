import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http : HttpClient){}
  datas : any = []
  connected : boolean = false
  showCreate : boolean = false
  firstName : string = ''
  lastName : string = ''
  email : string = ''
  phone : any = null
  delContact(id : any){
    this.http.get('http://localhost:8081/delete?id='+id).subscribe(e => console.log(e))
    setTimeout(()=> this.connectHubspot(),2000)
  }
  connectHubspot(){
    this.http.get('http://localhost:8081')
    .subscribe(res => this.datas = res)
    this.connected = true
  }

  Disconnect(){
  this.connected = false
  }
  Create(){
   if(this.showCreate == true){
    this.showCreate = false
   } else {
    this.showCreate = true
   }
  }

  Save(){
    if(this.firstName && this.lastName && this.email && this.phone){
    let payload = {firstname: this.firstName, lastname : this.lastName, email : this.email ,phone : this.phone}
    this.http.post('http://localhost:8081/payload',JSON.stringify(payload),
    {headers : {'Content-Type' : 'application/json',
                 'payload':JSON.stringify(payload)}}).subscribe(res => this.datas = res)
    setTimeout(()=>{this.connectHubspot()},3000)
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.phone = ''
    } else {
      alert("Check all Input Field")
    }
  }
}
