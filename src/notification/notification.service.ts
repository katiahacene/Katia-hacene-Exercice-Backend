// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScheduleService } from '../services/schedule.service'; // Assurez-vous que le service Rental existe

@Injectable()
export class NotificationService {
  constructor(private readonly ScheduleService: ScheduleService) {}

  // Tâche planifiée pour envoyer des rappels à J-5 et J-3
  @Cron('0 12 * * *') // Exécution à 12h00 tous les jours
  async sendNotifications() {
   // const rentals = await this.ScheduleService.findAllUpcomingRentals();
   // rentals.forEach((rental) => {
   //   const diffDays = this.getDaysUntilReturn(rental.returnDate);
    //  if (diffDays === 5 || diffDays === 3) {
     //   this.sendReminderEmail(rental.customer.email, rental, diffDays);
   //   }
//    });
  }

  // Calculer le nombre de jours restant avant le retour
  private getDaysUntilReturn(returnDate: Date): number {
    const currentDate = new Date();
    const diffTime = new Date(returnDate).getTime() - currentDate.getTime();
    return Math.ceil(diffTime / (1000 * 3600 * 24)); // Calculer la différence en jours
  }

  // Simuler l'envoi d'un email (remplacer par un vrai service d'email)
  private sendReminderEmail(email: string, rental: any, daysLeft: number) {
    console.log(`Sending reminder to ${email} about rental ${rental.id}. ${daysLeft} days left.`);
    // Remplacez cette ligne par un envoi réel d'email avec un service comme Nodemailer
  }
}
