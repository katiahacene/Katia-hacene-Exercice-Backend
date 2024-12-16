import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from '../entities/Rental';
import { EmailService } from './email.service';
import * as moment from 'moment-timezone';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);
  private taskStatus: { [key: string]: string } = {}; 
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    private emailService: EmailService,
  ) {}
 // Tâche planifiée : Envoie un email 5 jours avant la date de retour
 @Cron('0 12 * * *') // Exécuté à 12h tous les jours
 async sendReminderJ5(): Promise<void> {
  this.taskStatus['sendReminderJ5'] = 'En cours';
   const rentals = await this.rentalRepository.find({ relations: ['customer'] });

   for (const rental of rentals) {
     const returnDate = new Date(rental.returnDate);
     const currentDate = new Date();
     const daysRemaining = Math.floor((returnDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

     // Vérifier si c'est J-5 (5 jours avant la date de retour)
     if (daysRemaining === 5) {
       const emailSubject = `Rappel: Retour de location dans 5 jours`;
       const emailText = `Bonjour, votre location se termine le ${returnDate.toLocaleDateString()}. Veuillez penser à la rendre.`;
       await this.emailService.sendEmail(rental.customer.email, emailSubject, emailText);
     }
   }
   this.taskStatus['sendReminderJ5'] = 'Terminée';
 }

 // Tâche planifiée : Envoie un email 3 jours avant la date de retour
 @Cron('0 12 * * *') // Exécuté à 12h tous les jours
 async sendReminderJ3(): Promise<void> {
  this.taskStatus['sendReminderJ3'] = 'En cours';
   const rentals = await this.rentalRepository.find({ relations: ['customer'] });

   for (const rental of rentals) {
     const returnDate = new Date(rental.returnDate);
     const currentDate = new Date();
     const daysRemaining = Math.floor((returnDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

     // Vérifier si c'est J-3 (3 jours avant la date de retour)
     if (daysRemaining === 3) {
       const emailSubject = `Rappel: Retour de location dans 3 jours`;
       const emailText = `Bonjour, votre location se termine le ${returnDate.toLocaleDateString()}. Veuillez penser à la rendre.`;
       await this.emailService.sendEmail(rental.customer.email, emailSubject, emailText);
     }
   }
   this.taskStatus['sendReminderJ3'] = 'Terminée';
 }


 // Méthode pour exécuter une tâche manuellement
 async runTaskManually(taskName: string): Promise<string> {
  if (taskName === 'sendReminderJ5') {
    await this.sendReminderJ5();
    return 'Tâche J-5 lancée manuellement';
  } else if (taskName === 'sendReminderJ3') {
    await this.sendReminderJ3();
    return 'Tâche J-3 lancée manuellement';
  }
  return 'Tâche inconnue';
}

// Méthode pour vérifier l'état d'une tâche
getTaskStatus(taskName: string): string {
  return this.taskStatus[taskName] || 'Tâche non trouvée';
}

}
