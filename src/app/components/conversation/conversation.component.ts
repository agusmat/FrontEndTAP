import { Message } from 'src/app/models/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EnterConversationService } from 'src/app/services/enter-conversation.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

import { interval, Subscription, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { stringify } from 'querystring';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})

export class ConversationComponent implements OnInit {
  @ViewChild('messagess') ul;
  message : Message= new Message();
  messages!: Array<Message>;
  messagesDB!: Array<Message>;
  i:number;
  private socket: io.Socket
  constructor(
    private messageService:EnterConversationService,
    private router: Router,
    private socketS: SocketService,
    private ssocket: Socket
    
    
    // private socket: Socket
  ) { }
  timerSubscription: Subscription;
  ngOnInit(): void {
    this.obtenerMensajes();
  //   this.timerSubscription = timer(0, 5000).pipe(
  //     map(() => {
  //        this.checkearCambiosBD();// load data contains the http request
  //     })
  //  ).subscribe();
    this.ssocket.connect();
    this.socket=io.io('http://127.0.0.1:5000');
    this.socketS.iniServerSocket();
    this.ssocket.emit('message', 'hola amigos del internet');
  // this.socket.emit('message', 'hello');
  // this.socket.on('message', function(msg) {
  //  this.ul.append('<li>' + msg + '</li>');
  //  console.log("hola soy sockete")})


  }
  checkearCambiosBD(){
    this.i=0;
    this.messageService.getMessage(sessionStorage.getItem("crId")).subscribe(
      (result) => {
        result.forEach(element => {
          
          this.i=this.i+1;
          console.log(this.i);
        });
      },
      (error) => {
        console.log("Error", error);
      }
    )
    // console.log(this.messages.length)
    // console.log(this.i)

    
    if (this.messages.length!=this.i){
      this.obtenerMensajes();
    }
    else{
      // this.obtenerMensajes();
    }
  }
  obtenerMensajes() {
    //this.asistentes = this.asistenteService.getAsistente();
    console.log(sessionStorage.getItem("token"))
    console.log(sessionStorage.getItem("crId"))
    this.messages = new Array<Message>();
    var msg: Message = new Message();
    this.messageService.getMessage(sessionStorage.getItem("crId")).subscribe(
      (result) => {
        console.log(result)
        result.forEach(element => {
          Object.assign(msg, element);
          this.messages.push(msg);
          msg = new Message();
        });
      },
      (error) => {
        console.log("Error", error);
        
      }
    )
    console.log(this.messages)
  }
  sendMsg() {
    // var dateM = Date.now();
    // console.log(dateM)
    // // this.message.sentDate=dateM;
    console.log("dombi se la come")
    this.messageService.sendMessage(this.message.messageText,sessionStorage.getItem("userId"), sessionStorage.getItem("crId")).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log("Error", error);
      }
    );
    setTimeout(() => {
      this.obtenerMensajes();
    }, 500);
    
    this.message=new Message();
  }
  back(){
    this.router.navigate(['home']);
    sessionStorage.removeItem("crId");
    // this.messages = new Array<Message>();
  }
  deleteMsg(){
    this.messageService.deleteMessage(sessionStorage.getItem("userId"), sessionStorage.getItem("crId")).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log("Error", error);
      }
    );
    setTimeout(() => {
      this.obtenerMensajes();
    }, 500);
  }
  
  sendSocketMessage(){
    console.log("hola amigos del youtube")
    
    this.ssocket.emit('message', 'hola amigos del internet');
    this.ssocket.on('message', (res) => console.log("pepe"));
    this.ssocket.emit('message', "message");
    this.socket.emit('message', "message2");
    this.socket.on('message', (res) => console.log("pepito"));
    this.socket.send("pepe");
    console.log("hola amigos del youtubeeeee")
  }

  addML(msg:string){
    this.ul.append('<li>' + msg + '</li>')
    return "hola";
  }

  connect(){

  }

  // const socket : io()
  //   listarMensajesSocket(){
  //     socket.emit('message', 'hello')
  //     socket.on('message', function(msg) {
  //     $('#messages').append('<li>' + msg + '</li>')
  //   })
  //   }
  //   enviarMensajeSocket(){
  //     $('#send').on('click', function() {
  //       socket.send($('#myMessage').val());
  //       $('#myMessage').val('');
  //     })
  //   }

    
}
