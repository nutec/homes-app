import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpaceXService {
  constructor(private apollo: Apollo) {}

  getUpcomingLaunches(): Observable<any> {
    const GET_UPCOMING_LAUNCHES = gql`
      query GetUpcomingLaunches {
        launchesUpcoming(limit: 5) {
          mission_name
          launch_date_local
          rocket {
            rocket_name
          }
          links {
            video_link
          }
        }
      }
    `;

    return this.apollo.watchQuery({
      query: GET_UPCOMING_LAUNCHES,
    }).valueChanges;
  }
}
