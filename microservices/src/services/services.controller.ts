import { Controller, Logger, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaServiceDto } from './dto/kafka-service.dto';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeleteServiceDto } from './dto/delete-service.dto';

@Controller()
export class ServicesController {
  constructor(private eventEmitter: EventEmitter2) {}

  
  @EventPattern('services')
  serviceEvent(@Payload(new ValidationPipe()) { value }: KafkaServiceDto) {
  // serviceEvent(@Payload() kafkaServiceDto: KafkaServiceDto) {
    // // if (kafkaServiceDto instanceof CreateServiceDto) {
    // //   console.log('CreateServiceDto====>');
    // // }
    // console.log('Consumer====>', kafkaServiceDto);
    // console.log(typeof kafkaServiceDto);
    // const{value} = kafkaServiceDto;
    // console.log('Consumer value====>', value);
    // console.log('Consumer eventType====>', value.eventType);
    // console.log(typeof value);
    // Logger.debug(value, 'ServicesController - serviceEvent');
    this.eventEmitter.emit(value.eventType, value);
  }

  @OnEvent('ServiceCreated')
  handleServiceCreatedEvent(createServiceDto: CreateServiceDto) {
    console.log('createServiceDto====>',createServiceDto);
    // Logger.debug(
    //   createServiceDto,
    //   'ServicesController - handleServiceCreatedEvent',
    // );
  }

  @OnEvent('ServiceUpdated')
  handleServiceUpdatedEvent(updateServiceDto: UpdateServiceDto) {
    Logger.debug(
      updateServiceDto,
      'ServicesController - handleServiceUpdatedEvent',
    );
  }

  @OnEvent('ServiceDeleted')
  handleServiceDeletedEvent(deleteServiceDto: DeleteServiceDto) {
    Logger.debug(
      deleteServiceDto,
      'ServicesController - handleServiceDeletedEvent',
    );
  }
}
