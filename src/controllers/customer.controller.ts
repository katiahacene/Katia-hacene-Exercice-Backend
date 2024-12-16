import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Customer } from '../entities/Customer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('customers') // Route principale : /customers
export class CustomerController {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  @Get()
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { customerId: id } });
  }

  @Post()
  async create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    const newCustomer = this.customerRepository.create(customerData);
    return this.customerRepository.save(newCustomer);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Customer>,
  ): Promise<Customer> {
    await this.customerRepository.update(id, updateData);
    return this.customerRepository.findOne({ where: { customerId: id } });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
