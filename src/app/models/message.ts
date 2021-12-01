import { Usuario } from './usuario';
import { Chatroom } from './chatroom';

export class Message {
    message_id!: number;
    messageText!: string;
    chatRoom !: Chatroom;
    usuario !: Usuario;
    sentDate !: Date;
    userName!: string

    Message(message_id?:number, messageText?:string, chatRoom?:Chatroom, usuario?:Usuario, sentDate?:Date, userName?:string){
        this.message_id != message_id;
        this.messageText != messageText;
        this.chatRoom != chatRoom;
        this.usuario != usuario;
        this.sentDate != sentDate;
        this.userName !=userName;
      }
}
