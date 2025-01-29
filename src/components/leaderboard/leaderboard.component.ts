import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent {
  leaderboard: any[] = [];
  private http = inject(HttpClient);

  ngOnInit() {
    this.fetchLeaderboard();
  }

  fetchLeaderboard() {
    this.http.get<any[]>(`${environment.apiBaseURL}/game/leaderBoard`).subscribe(
      (data) => {
        this.leaderboard = data;
      },
      (error) => {
        console.error('Error fetching leaderboard:', error);
      }
    );
  }
}
