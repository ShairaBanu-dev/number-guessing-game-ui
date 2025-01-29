import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-game',
  imports:[FormsModule,RouterModule,NgIf],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  score: number = 0; // Current score (attempt count)
  gameData: any; // Game data from backend (like target number)
  username: string | null = localStorage.getItem('username'); // Fetching username from localStorage
  guessedNumber: number = 0; // Variable for user input

  ngOnInit() {
    if (!this.username) {
      alert('Please log in first!');
      this.router.navigate(['/login']);
    } else {
      this.startGame(); // Start the game if user is logged in
    }
  }

  startGame() {
    // Call backend to start the game (pass username)
    this.http.post(`${environment.apiBaseURL}/game/start`, { username: this.username }).subscribe(
      (data: any) => {
        this.gameData = data; // Backend response
        this.score = data.score || 0; // Initialize score
      },
      (error) => {
        console.error('Error starting game:', error);
      }
    );
  }

  guessNumber() {
    if (!this.username) {
      alert('Please log in to continue!');
      this.router.navigate(['/login']);
      return;
    }

//   this.http.post<any>(`${environment.apiBaseURL}/game/guess`, 
//   { username: this.username, guessedNumber: this.guessedNumber },
//   { responseType: 'json' } // Explicitly expect JSON response
// ).subscribe(
//   (response) => {
//     if (response && response.message) {  // Ensure response has expected properties
//       alert(response.message);
//       this.score = response.updatedScore || 0; // Update score
//     } else {
//       console.error("Unexpected response format:", response);
//     }
//   },
//   (error) => {
//     console.error("Error submitting guess:", error);
//   }
// );

this.http.post<any>(`${environment.apiBaseURL}/game/guess`, 
  { username: this.username, guessedNumber: this.guessedNumber }
).subscribe(
  (response) => {
    if (response && response.message) {
      alert(response.message);
    } else {
      console.error("Unexpected response format:", response);
    }
  },
  (error) => {
    console.error("Error submitting guess:", error);
  }
);


  }
}
