import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { Photo } from 'src/app/_models/photo';
import { PaginatedResult } from 'src/app/_models/Pagination';
import { map } from 'rxjs/operators';

/* const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
}; */

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?, likesParams?): Observable<PaginatedResult <User[]>> {
  // return this.http.get<User[]>(this.baseUrl + 'Users', httpOptions);
  const paginatedResult: PaginatedResult<User[]> = new  PaginatedResult<User[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  if (userParams != null) {
    params = params.append('gender', userParams.gender);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('orderBy', userParams.orderBy);
  }
  if (likesParams === 'Likers') {
    params = params.append('likers', 'true');
  }
  if (likesParams === 'Likees') {
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'Users', { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );

  // return this.http.get<User[]>(this.baseUrl + 'Users');
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}
updateUser(id: number, user: User) {
  return this.http.put<User>(this.baseUrl + 'users/' + id, user);
}
setMainPhoto(userId: number, id: number) {
  return this.http.post<Photo>(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}
deletePhoto(userId: number, id: number) {
  return this.http.delete<Photo>(this.baseUrl + 'users/' + userId + '/photos/' + id );
}
sendLike(id: number, recepientId: number) {
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recepientId, {});
}
}
