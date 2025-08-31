import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':businessId/:agendaId/:barberId',
    loadComponent: () =>
      import('./features/home/pages/home/home.component').then(m => m.HomeComponent), 
  },
  {
    path: ':businessId/:agendaId/:barberId/appointment',
    loadComponent: () =>
      import('./features/create-appointment/pages/create-appointment/create-appointment.component')
        .then(m => m.CreateAppointmentComponent)
  },
  {
    path: ':businessId/:agendaId/:barberId/appointment/:appointmentId',
    loadComponent: () =>
      import('./features/appointment-detail/pages/appointment-detail/appointment-detail.component')
        .then(m => m.AppointmentDetailComponent)
  }
];
