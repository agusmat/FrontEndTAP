import { Component, OnInit } from '@angular/core';
import { Chatroom } from 'src/app/models/chatroom';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chatroom!: Chatroom;
  chatrooms!: Array<Chatroom>;
  constructor(
    private crService:ChatroomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerChatrooms();
  }

  obtenerChatrooms() {
    //this.asistentes = this.asistenteService.getAsistente();
    console.log(sessionStorage.getItem("token"))

    this.chatrooms = new Array<Chatroom>();
    var cr: Chatroom = new Chatroom();
    this.crService.getChatroom().subscribe(
      (result) => {
        console.log(result)
        result.forEach(element => {
          Object.assign(cr, element);
          this.chatrooms.push(cr);
          cr = new Chatroom();
        });
      },
      (error) => {
        console.log("Error");
      }
    )
    console.log(this.chatrooms)
  }

  entrarSala(schatroom:any){
    console.log(schatroom["_id"])
    sessionStorage.setItem('crId', schatroom["_id"])
    this.router.navigate(['conversation']);
  }
}
