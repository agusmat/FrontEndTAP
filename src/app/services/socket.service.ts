
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: io.Socket;
  private messages: Array<any>;
  constructor(private http: HttpClient) {}
  
  
  public iniServerSocket(){
  this.http.get('http://127.0.0.1:5000/api/socket')
  .subscribe(data => {
  console.log(data);
  })
  }
}