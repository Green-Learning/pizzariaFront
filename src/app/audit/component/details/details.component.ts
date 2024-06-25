import { Component, Input } from '@angular/core';
import { Audit } from '../../audit';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() audit : Audit = new Audit();
}
