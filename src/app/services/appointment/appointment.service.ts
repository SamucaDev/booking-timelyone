import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces baseadas no schema do Prisma
export interface AppointmentClient {
  id: number;
  name: string;
  email?: string;
  phone: string;
}

export interface Business {
  id: number;
  name: string;
  address: string;
  type: number;
}

export interface Agenda {
  id: number;
  name: string;
  business: Business;
}

export interface ServiceProvided {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export interface Appointment {
  id: number;
  startTime: string; // DateTime -> string ISO
  endTime: string;   // DateTime -> string ISO
  createdAt: string;
  client?: AppointmentClient;
  service: ServiceProvided;
  agenda: Agenda;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = `http://localhost:8000/appointment`;

  constructor(private http: HttpClient) {}

  getAppointmentById(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${appointmentId}`);
  }

  getAgendaDetail(agendaId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/detail/${agendaId}`);
  }
}
