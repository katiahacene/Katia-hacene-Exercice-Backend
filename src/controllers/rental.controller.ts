import { Controller, Get, Post, Delete, Param, Put,Body } from '@nestjs/common';
import { BadRequestException,NotFoundException ,ForbiddenException} from '@nestjs/common';
import { Rental } from '../entities/Rental';
import { Customer } from '../entities/Customer';
import { Repository } from 'typeorm';

import { ScheduleService } from '../services/schedule.service';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment-timezone';
@Controller('rentals') // Route principale : /rentals
export class RentalController {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private scheduleService: ScheduleService
  ) {}
  // Lister toutes les tâches planifiées
  @Get('list')
  listTasks(): string[] {
    return ['sendReminderJ5', 'sendReminderJ3']; // Liste de vos tâches planifiées
  }
   // Lancer une tâche planifiée manuellement
   @Post('run/:taskName')
   async runTask(@Param('taskName') taskName: string): Promise<string> {
     return await this.scheduleService.runTaskManually(taskName);
   }
   @Get('status/:taskName')
   checkTaskStatus(@Param('taskName') taskName: string): string {
     return this.scheduleService.getTaskStatus(taskName);
   }
  @Get()
  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.find({ relations: ['customer', 'staff','inventory'] });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Rental> {
    return this.rentalRepository.findOne({
      where: { rentalId: id },
      relations: ['customer', 'staff','inventory'],
    });
  }

  @Post()
  async create(@Body() rentalData: Partial<Rental>): Promise<Rental> {
    var { rentalDate, returnDate,customerId } = rentalData;
    
    // Vérification des dates de début et de fin
    if (!rentalDate || !returnDate || !customerId) {
      throw new BadRequestException('Les dates de début et de fin sont nécessaires.');
    }
    const customer = await this.customerRepository.findOne({where :{customerId:customerId}});
    if (!customer || !customer.timezone) {
      throw new Error('Le fuseau horaire du client est manquant.');
    }
    // Convertir les dates en UTC en fonction du fuseau horaire du client
     rentalDate = moment.tz(rentalDate, customer.timezone).utc().toDate();
     returnDate = moment.tz(returnDate, customer.timezone).utc().toDate();

    // Vérifier la durée de la location
    const durationInDays = (new Date(returnDate).getTime() - new Date(rentalDate).getTime()) / (1000 * 3600 * 24);

    // Vérification de la durée de la location
    if (durationInDays < 7) {
      throw new BadRequestException('La durée de location doit être d\'au moins 1 semaine.');
    }
    
    if (durationInDays > 21) {
      throw new BadRequestException('La durée de location ne doit pas dépasser 3 semaines.');
    }
    
    // Création et sauvegarde de la location si les validations sont réussies
    const newRental = this.rentalRepository.create(rentalData);
    return this.rentalRepository.save(newRental);
  }

  @Put(':id')
  async update(@Param('id') rentalId: any, @Body() rentalData: Partial<Rental>): Promise<Rental> {
    // Chercher la location par ID
    const rental = await this.rentalRepository.findOne({where : {rentalId:rentalId}});
    
    // Si la location n'existe pas, lancer une erreur
    if (!rental) {
      throw new NotFoundException('Location non trouvée');
    }
    
    // Comparer la date de retour avec la date actuelle
    const currentDate = new Date();
    const returnDate = new Date(rental.returnDate); // Supposons que on a  un champ `returnDate` dans la table `Rental`

    // Vérifier si la date de retour est dans le futur
    if (returnDate > currentDate) {
      throw new ForbiddenException('Une location en cours ne peut pas être modifiée');
    }

    // Si la date de retour est passée, on peut procéder à la mise à jour
    Object.assign(rental, rentalData);
    return this.rentalRepository.save(rental);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.rentalRepository.delete(id);
  }
}
