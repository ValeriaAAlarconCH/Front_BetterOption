import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatMenuModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Front';
}
