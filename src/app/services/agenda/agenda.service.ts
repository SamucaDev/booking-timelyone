import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment'; // ajuste se necessário

// Interfaces para tipar a resposta da API
export interface Hour {
  id: number;
  start: string;
  end: string;
}

export interface Day {
  id: number;
  date: string;
  hours: Hour[];
}

export interface Business {
  id: number;
  name: string;
}

export interface Agenda {
  id: number;
  days: Day[];
  business: Business;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private baseUrl = `http://localhost:8000/agenda`;

  constructor(private http: HttpClient) {}

  getAgendaById(agendaId: number): Observable<Agenda> {
    return this.http.get<Agenda>(`${this.baseUrl}/${agendaId}`);
  }
}
