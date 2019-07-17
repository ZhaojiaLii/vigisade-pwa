import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TeamMember } from '../../../visit/interfaces/team-member.interface';

@Component({
  selector: 'app-detail-member',
  templateUrl: './details-team-member.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsTeamMemberComponent {
  @Input() teamMember: TeamMember;
}
