import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class EnterConversationService {

  api: string = "http://127.0.0.1:5000/api/chats/listMessages"
  apiSM: string = "http://127.0.0.1:5000/api/chats/sendMessage"
  apiDM: string = "http://127.0.0.1:5000/api/chats/delete-messages"
  message!:Message;

  constructor(private _http: HttpClient) {
    
   }
  getMessage(crId:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: `Bearer ${sessionStorage.getItem("token")}`})
    }
    return this._http.get(this.api + '/' + crId, httpOptions);
  }
  deleteMessage(userId:string, chatRoomId:string): Observable<any> {
    var crIdN=parseInt(userId);
    var uIdN=parseInt(chatRoomId);
    const httpOptions = {
      headers: new HttpHeaders({Authorization: `Bearer ${sessionStorage.getItem("token")}`})
    };
    var body = JSON.stringify({ userId: userId, chatRoomId: chatRoomId });
    return this._http.delete(this.apiDM + '/' + crIdN + '/' + uIdN, httpOptions);
  }
  getIdDisponible() {
    //var maxid: number;
    //maxid = 0;
    //for (var i = 0; i < this.asistentes.length; i++) {
    // if (maxid < this.asistentes[i].id) {
    // maxid = this.asistentes[i].id;
    //}
    //}
    //return maxid + 1;
  }
  sendMessage(messageText: string, userId: string, chatRoomId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: `Bearer ${sessionStorage.getItem("token")}`}
      )
    };
    var body = JSON.stringify({ messageText: messageText, userId: userId, chatRoomId: chatRoomId });
    return this._http.post(this.apiSM, body, httpOptions);
  }
  upDateMensaje(cr: Message): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(cr);
    return this._http.put(this.api + '/' + cr.message_id, body, httpOptions);
  }
}
