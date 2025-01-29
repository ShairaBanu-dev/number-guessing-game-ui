import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  [x: string]: any;
  constructor(private router: Router, private titleService: Title) {} 

  ngOnInit() {
    this.titleService.setTitle('Number Guessing Game');
  }


  navigate(path: string) {
    this.router.navigate([path]); 
    console.log(`Navigating to: ${path}`);
  }
}
