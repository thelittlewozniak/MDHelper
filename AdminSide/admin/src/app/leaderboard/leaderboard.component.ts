import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { delay } from 'q';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users;
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get('https://wamdhelperapi.azurewebsites.net/api/User').subscribe(
      async (result) => {
        this.users = result;
        await delay(1000);
        this.getUsers();
      }
    );
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  delete(id: number) {
    this.http.delete('https://wamdhelperapi.azurewebsites.net/api/User/' + id).subscribe(
      (result) => {
        if (result) {
          this.snackBar.open('User ' + id + ' deleted', 'ok', {
            duration: 2000
          });
        }
      }
    );
  }
}
