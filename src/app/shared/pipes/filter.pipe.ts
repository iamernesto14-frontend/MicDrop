import { Pipe, PipeTransform } from '@angular/core';
import { TeamMember } from '../../models/team-member.model';

@Pipe({ name: 'filter', standalone: true })
export class FilterPipe implements PipeTransform {
  transform(members: TeamMember[], searchTerm: string): TeamMember[] {
    if (!searchTerm) return members;
    return members.filter(m =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
