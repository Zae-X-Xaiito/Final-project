import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { of } from 'rxjs'; // Assuming 'of' is needed for mock data

@Injectable({
  providedIn: 'root'
})
export class SymptomService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  logSymptom(data: any) {
    return this.http.post(`${this.apiUrl}/symptoms`, data, { headers: this.getHeaders() });
  }

  getHistory() {
    return this.http.get<any[]>(`${this.apiUrl}/symptoms/history`, { headers: this.getHeaders() });
  }

  getFaqs() {
    return this.http.get<any[]>(`${this.apiUrl}/faqs`);
  }

  deleteSymptom(id: number) {
    return this.http.delete(`${this.apiUrl}/symptoms/${id}`, { headers: this.getHeaders() });
  }
}
