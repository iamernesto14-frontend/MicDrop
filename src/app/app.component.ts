import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadTheme } from './store/theme/theme.actions';
import { selectTheme } from './store/theme/theme.selectors';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tittle = 'micdrop';
  constructor(
    private store: Store,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Load the saved theme from localStorage
    this.store.dispatch(loadTheme());

    // Apply the theme class to the <html> tag
    this.store.select(selectTheme).subscribe((theme) => {
      const html = this.document.documentElement;
      this.renderer.setAttribute(html, 'data-theme', theme);
    });
  }
}
