import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../../models/team-member.model';
import { Linkedin, Twitter, Instagram } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-team-preview',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './team-preview.component.html',
  styleUrl: './team-preview.component.scss',
})
export class TeamPreviewComponent {
  @Input() members: TeamMember[] = [];
  readonly Linkedin = Linkedin;
  readonly Twitter = Twitter;
  readonly Instagram = Instagram;

  getSocialUrl(member: TeamMember, platform: string): string | undefined {
    return member.social_media_links.find((link) => link.platform === platform)
      ?.url;
  }
}
