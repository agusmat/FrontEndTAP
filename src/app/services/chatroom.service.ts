import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatroom } from '../models/chatroom';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  api: string = "http://127.0.0.1:5000/api/chats/listChatRoom"
  chatRoom!:Chatroom;
  constructor(private _http: HttpClient) {
    
   }
  getChatroom(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: `Bearer ${sessionStorage.getItem("token")}`})
    }
    return this._http.get(this.api, httpOptions);
  }
  deleteChatroom(cr: Chatroom): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({

      })
    };

    return this._http.delete(this.api + '/' + cr.chatRoom_id, httpOptions);
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
  addChatroom(cr: Chatroom): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(cr);
    return this._http.post(this.api, body, httpOptions);
  }
  upDateMensaje(cr: Chatroom): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(cr);
    return this._http.put(this.api + '/' + cr.chatRoom_id, body, httpOptions);
  }
}
