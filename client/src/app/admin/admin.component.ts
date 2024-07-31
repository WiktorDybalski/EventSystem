import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {ChatWindowComponent} from "../chat-window/chat-window.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgForOf,
    ChatWindowComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
