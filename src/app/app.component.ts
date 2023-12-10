import {Component, Inject} from '@angular/core';
import {Observable} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentCarProject';

  constructor(@Inject(DOCUMENT) private document: Document) {
  }


  public async ngOnInit() {

    this.document.body.classList.add('sb-sidenav-toggled');

  }
}
