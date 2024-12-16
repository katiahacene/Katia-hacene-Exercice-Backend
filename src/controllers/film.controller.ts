import { Controller, Get, Post, Put, Param,Delete, Body } from '@nestjs/common';
import { Film } from '../entities/Film';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('films') // Route principale : /films
export class FilmController {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  @Get()
  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Film> {
    return this.filmRepository.findOne({ where: { filmId: id } });
  }

  @Post()
  async create(@Body() filmData: Partial<Film>): Promise<Film> {
    const newFilm = this.filmRepository.create(filmData);
    return this.filmRepository.save(newFilm);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Film>,
  ): Promise<Film> {
    await this.filmRepository.update(id, updateData);
    return this.filmRepository.findOne({ where: { filmId: id } });
  }
   @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
      await this.filmRepository.delete(id);
    }
}
