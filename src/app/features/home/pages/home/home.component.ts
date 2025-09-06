import { Component } from '@angular/core';
import { FullscreenDirective } from '../../../../directive/fullscreen.directive';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda, AgendaService } from '../../../../services/agenda/agenda.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FullscreenDirective, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  businessId!: string;
  agendaId!: string;
  barberId!: string;
  agenda?: any;

  constructor(
    private route: ActivatedRoute,
    private agendaService: AgendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.businessId = this.route.snapshot.paramMap.get('businessId')!;
    this.agendaId = this.route.snapshot.paramMap.get('agendaId')!;
    this.barberId = this.route.snapshot.paramMap.get('barberId')!;

    this.agendaService.getAgendaById(parseInt(this.agendaId)).subscribe({
      next: (data) => (this.agenda = data),
      error: (err) => console.error('Erro ao carregar agenda:', err),
    });
  }

  goToAppointment (): void {  
    this.router.navigate([`/${this.businessId}/${this.agendaId}/${this.barberId}/appointment`]);
  }

  getDayName(day: number): string {
    const days = [
      'Sunday', 'Monday', 'Tuesday',
      'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    return days[day] || '';
  }
  
}
