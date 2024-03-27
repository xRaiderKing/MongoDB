import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../config';
import { Conference } from '../models/conference.model';

@Injectable()
export class ConferenceService {
  constructor(private http: HttpClient) {}

  getConferences(page: Number, pageSize: Number) {
    return this.http.post(`${baseUrl}/conferences`, {
      page: page,
      pageSize: pageSize,
    });
  }

  addConference(conference: Conference) {
    return this.http.post(`${baseUrl}/conferences/add`, {
      title: conference.title,
      description: conference.description,
      schedules: conference.schedules,
      attendees: conference.attendees,
      availableSpots: conference.availableSpots,
      coverImage: conference.coverImage,
      speakerImage: conference.speakerImage,
    });
  }

  updateConference(id: string, conference: Conference) {
    return this.http.patch(`${baseUrl}/conferences/${id}`, {
      title: conference.title,
      description: conference.description,
      schedules: conference.schedules,
      attendees: conference.attendees,
      availableSpots: conference.availableSpots,
      coverImage: conference.coverImage,
      speakerImage: conference.speakerImage,
      

    });
  }

  deleteConference(id: string) {
    return this.http.delete(`${baseUrl}/conferences/${id}`);
  }
}
