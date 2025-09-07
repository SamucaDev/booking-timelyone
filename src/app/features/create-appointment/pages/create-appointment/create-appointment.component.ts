import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { FullscreenDirective } from '../../../../directive/fullscreen.directive';

@Component({
  selector: 'app-create-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, FullscreenDirective],
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss'],
})
export class CreateAppointmentComponent implements OnInit {
  services: any[] = [];
  selectedService: any = null;
  selectedDate: string = '';
  slots: string[] = [];
  selectedSlot: string = '';
  clientName: string = '';
  clientEmail: string = '';
  clientPhone: string = '';

  businessId!: string;
  agendaId!: string;
  appointmentId!: string;
  barberId?: string

  today: string = new Date().toISOString().split('T')[0];
  
  constructor(
    private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    this.businessId = this.route.snapshot.paramMap.get('businessId')!;
    this.agendaId = this.route.snapshot.paramMap.get('agendaId')!;
    this.appointmentId = this.route.snapshot.paramMap.get('appointmentId')!;
    this.barberId = this.route.snapshot.paramMap.get('barberId')!;
    this.fetchServices();
  }

  fetchServices() {
    console.log(this.barberId, this.businessId)
    this.http
      .get<any[]>(
        `http://localhost:8000/service/user/${this.barberId}/business/${this.businessId}/app`
      )
      .subscribe((data) => {
        this.services = data;
      });
  }

  fetchSlots() {
    if (!this.selectedService || !this.selectedDate) return;

    this.http
      .post<any>('http://localhost:8000/appointment/slots', {
        agendaId: Number(this.agendaId),
        appointmentDate: this.selectedDate,
        duration: this.selectedService.duration,
        buffer: this.selectedService.buffer || 0,
      })
      .subscribe((data) => {
        this.slots = data.slotsAvailable || [];
      });
  }

  confirmAppointment() {
    if (
      !this.selectedService ||
      !this.selectedSlot ||
      !this.clientName ||
      !this.clientPhone
    ) {
      alert('Please fill in all fields!');
      return;
    }
  
    const localDateTime = new Date(`${this.selectedDate}T${this.selectedSlot}:00`);
    const appointmentDateTime = new Date(localDateTime.toISOString());
  
    const endTime = new Date(
      appointmentDateTime.getTime() + this.selectedService.duration * 60000
    );
  
    this.http
      .post('http://localhost:8000/appointment', {
        agendaId: Number(this.agendaId),
        startTime: appointmentDateTime.toISOString(), 
        endTime: endTime.toISOString(), 
        employeeId: this.selectedService.userId,
        serviceId: this.selectedService.id,
        client: {
          name: this.clientName,
          email: this.clientEmail,
          phone: this.clientPhone,
        },
      })
      .subscribe({
        next: (response: any) => {
          this.selectedSlot = '';
          this.clientName = '';
          this.clientEmail = '';
          this.clientPhone = '';
  
          this.router.navigate(
            [`/${this.businessId}/${this.agendaId}/${this.barberId}/appointment/${response.id}`],
            { queryParams: { isNew: true } }
          );
        },
        error: () => {
          alert('Error creating appointment!');
        },
      });
  }

  goBack() {
    this.router.navigate(
      [`/${this.businessId}/${this.agendaId}/${this.barberId}/`],
    );
  }
  
}
