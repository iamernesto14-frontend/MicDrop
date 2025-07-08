import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Episode } from '../../../models/episode.model';
import { Play, Pause, LucideAngularModule } from 'lucide-angular';
import { PlayerService } from '../../../core/services/player.service';
import { Subscription } from 'rxjs';
import { PlayToggleButtonComponent } from '../play-toggle-button/play-toggle-button.component';

@Component({
  selector: 'app-episode-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, PlayToggleButtonComponent],
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent implements OnInit, OnDestroy {
  @Input() episode!: Episode;
  readonly Play = Play;
  readonly Pause = Pause;
  isCurrent = false;
  isPlaying = false;

  private playerSub!: Subscription;

  constructor(
    private router: Router,
    private playerService: PlayerService,
  ) {}

  ngOnInit(): void {
    this.playerSub = this.playerService.currentEpisode$.subscribe((current) => {
      this.isCurrent = current?.id === this.episode?.id;
    });

    this.playerService.isPlaying$.subscribe((playing) => {
      this.isPlaying = playing;
    });
  }

  playThisEpisode(event: Event) {
    event.stopPropagation();
    this.playerService.playEpisode(this.episode);
  }

  goToDetails(id: number | undefined) {
    if (id) this.router.navigate(['/episodes', id]);
  }

  ngOnDestroy(): void {
    this.playerSub?.unsubscribe();
  }
}
