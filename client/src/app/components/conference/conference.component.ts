import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Conference } from '../../models/conference.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConferenceService } from '../../services/conference.service';
import { ConferenceDetailsComponent } from '../conference-details/conference-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conference',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [ConferenceService],
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.css',
})
export class ConferenceComponent {
  displayedColumns: string[] = [
    'titulo',
    'descripcion',
    'lugares',
    'fechas',
    'asistentes',
    'disponibles',
  ];
  public conferencesDataSource: MatTableDataSource<any>;
  public userId;

  constructor(
    private conferenceService: ConferenceService,
    public dialog: MatDialog,
    public router: Router
  ) {
    this.conferencesDataSource = new MatTableDataSource();

    this.userId = this.router.getCurrentNavigation().extras.state;
    this.userId = this.userId?.userId;
    console.log(this.userId);
  }

  ngOnInit() {
    this.conferenceService.getConferences(1, 100).subscribe(
      (result: []) => {
        this.conferencesDataSource = new MatTableDataSource(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.conferencesDataSource.filter = filterValue.trim().toLowerCase();
  }

  seeDetails(row: Conference) {
    this.dialog.open(ConferenceDetailsComponent, {
      data: { action: 0, conference: row },
    });
  }

  verifyAttendance(conference: any) {
    let isAttending = conference.attendees.includes(this.userId);

    return isAttending;
  }

  addAttendance(conference: any) {
    conference.attendees.push(this.userId);

    this.conferenceService
      .updateConference(conference._id, conference)
      .subscribe(
        (result) => {
          alert('Asistencia confirmada');
          console.log(result, conference);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteAttendance(conference: any) {
    const index = conference.attendees.indexOf(this.userId);
    if (index > -1) conference.attendees.splice(index, 1);

    this.conferenceService
      .updateConference(conference._id, conference)
      .subscribe(
        (result) => {
          alert('Asistencia eliminada');
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  isFull(conference: Conference) {
    if (conference.attendees.length < conference.availableSpots) {
      return false;
    } else {
      return true;
    }
  }
}
