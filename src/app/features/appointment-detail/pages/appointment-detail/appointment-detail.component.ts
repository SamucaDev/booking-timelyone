import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment, AppointmentService } from '../../../../services/appointment/appointment.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FullscreenDirective } from '../../../../directive/fullscreen.directive';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [DatePipe, CommonModule, FullscreenDirective],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.scss'
})
export class AppointmentDetailComponent {
  businessId!: string;
  agendaId!: string;
  appointmentId!: string;
  appointment?: Appointment;
  isNew?: boolean
  barberId?: string

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.businessId = this.route.snapshot.paramMap.get('businessId')!;
    this.agendaId = this.route.snapshot.paramMap.get('agendaId')!;
    this.appointmentId = this.route.snapshot.paramMap.get('appointmentId')!;
    this.barberId = this.route.snapshot.paramMap.get('barberId')!;

    this.appointmentService.getAppointmentById(Number(this.appointmentId)).subscribe({
      next: (data) => (this.appointment = data),
      error: (err) => console.error('Err:', err),
    });
    this.isNew = this.route.snapshot.queryParamMap.get('isNew') === 'true';
  }

  goBack() { 
    this.router.navigate([`/${this.businessId}/${this.agendaId}/${this.barberId}`]);
  }
}
