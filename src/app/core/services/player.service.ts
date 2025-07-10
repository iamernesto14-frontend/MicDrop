// player.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Episode } from '../../models/episode.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private currentEpisodeSubject = new BehaviorSubject<Episode | null>(null);
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private episodeListSubject = new BehaviorSubject<Episode[]>([]);

  currentEpisode$ = this.currentEpisodeSubject.asObservable();
  isPlaying$ = this.isPlayingSubject.asObservable();

  get currentEpisode() {
    return this.currentEpisodeSubject.value;
  }

  get isPlaying() {
    return this.isPlayingSubject.value;
  }

  // player.service.ts
  toggleEpisode(episode: Episode) {
    const current = this.currentEpisodeSubject.getValue();
    const isSame = current?.id === episode.id;
    const isPlaying = this.isPlayingSubject.getValue();

    if (isSame) {
      // Toggle play/pause for the same episode
      this.isPlayingSubject.next(!isPlaying);
    } else {
      // Start new episode
      this.currentEpisodeSubject.next(episode);
      this.isPlayingSubject.next(true);
    }
  }

  playEpisode(episode: Episode) {
    if (this.currentEpisode?.id === episode.id) {
      // Toggle playback
      this.isPlayingSubject.next(!this.isPlaying);
    } else {
      // Load new episode and start playing
      this.currentEpisodeSubject.next(episode);
      this.isPlayingSubject.next(true);
    }
  }

  setIsPlaying(state: boolean) {
    this.isPlayingSubject.next(state);
  }

  setCurrentEpisode(episode: Episode | null) {
    this.currentEpisodeSubject.next(episode);
  }

  setEpisodeList(episodes: Episode[]) {
    this.episodeListSubject.next(episodes);
  }

  previousEpisode() {
    const episodes = this.episodeListSubject.value;
    const current = this.currentEpisodeSubject.value;
    if (!current || episodes.length === 0) return;

    const currentIndex = episodes.findIndex(ep => ep.id === current.id);
    if (currentIndex > 0) {
      this.currentEpisodeSubject.next(episodes[currentIndex - 1]);
      this.isPlayingSubject.next(true);
    }
  }

  nextEpisode() {
    const episodes = this.episodeListSubject.value;
    const current = this.currentEpisodeSubject.value;
    if (!current || episodes.length === 0) return;

    const currentIndex = episodes.findIndex(ep => ep.id === current.id);
    if (currentIndex < episodes.length - 1) {
      this.currentEpisodeSubject.next(episodes[currentIndex + 1]);
      this.isPlayingSubject.next(true);
    }
  }
}
