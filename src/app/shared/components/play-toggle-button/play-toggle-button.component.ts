import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Episode } from '../../../models/episode.model';
import { LucideAngularModule, Play, Pause } from 'lucide-angular';
import { PlayerService } from '../../../core/services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-toggle-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './play-toggle-button.component.html',
  styleUrls: ['./play-toggle-button.component.scss']
})
export class PlayToggleButtonComponent implements OnInit, OnDestroy {
  @Input() episode!: Episode;

  readonly Play = Play;
  readonly Pause = Pause;

  isCurrent = false;
  isPlaying = false;

  private subs: Subscription[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.subs.push(
      this.playerService.currentEpisode$.subscribe(current => {
        this.isCurrent = current?.id === this.episode?.id;
      }),
      this.playerService.isPlaying$.subscribe(playing => {
        this.isPlaying = playing;
      })
    );
  }

  togglePlay(event: Event) {
    event.stopPropagation();
    this.playerService.toggleEpisode(this.episode);
  }
  
  

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
