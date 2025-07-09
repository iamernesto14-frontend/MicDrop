// audio-player.component.ts
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../../core/services/player.service';
import { Episode } from '../../../models/episode.model';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss',
})
export class AudioPlayerComponent implements OnInit, AfterViewInit {
  episode: Episode | null = null;
  isPlaying = false;
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  private isViewInitialized = false;

  constructor(public playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.currentEpisode$.subscribe((episode) => {
      this.episode = episode;
      if (this.audioRef && episode) {
        this.audioRef.nativeElement.src = episode.audio_url;
        this.audioRef.nativeElement.load();
        setTimeout(() => this.audioRef.nativeElement.play(), 0);
      }
    });

    this.playerService.isPlaying$.subscribe((playing) => {
      this.isPlaying = playing;
      const audio = this.audioRef?.nativeElement;
      if (!audio) return;

      if (playing) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }

  ngAfterViewInit(): void {
    this.isViewInitialized = true;

    const audio = this.audioRef?.nativeElement;
    if (!audio) return;

    audio.addEventListener('play', () => this.playerService.setIsPlaying(true));
    audio.addEventListener('pause', () =>
      this.playerService.setIsPlaying(false),
    );
    audio.addEventListener('ended', () =>
      this.playerService.setIsPlaying(false),
    );
  }
}
