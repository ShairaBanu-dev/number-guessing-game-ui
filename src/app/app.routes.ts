import { Routes } from '@angular/router';
import { GameComponent } from '../components/game/game.component';
import { LeaderboardComponent } from '../components/leaderboard/leaderboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';


export const routes: Routes = [
    { path: '', redirectTo: '/register', pathMatch: 'full' },  // Redirect to the game or home page
    { path: 'login', component: LoginComponent, data: { title: 'Login - Number Guessing Game' } },
    { path: 'game', component: GameComponent, data: { title: 'Play Game - Number Guessing Game' } },
    { path: 'leaderboard', component: LeaderboardComponent, data: { title: 'Leaderboard - Number Guessing Game' } },
    { path: 'register', component: RegisterComponent, data: { title: 'Register - Number Guessing Game' } }
  ];
  