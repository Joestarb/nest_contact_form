import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  create(sender: string, recipient: string, content: string) {
    const message = this.messageRepository.create({
      sender,
      recipient,
      content,
    });
    return this.messageRepository.save(message);
  }

  findAll() {
    return this.messageRepository.find({ order: { createdAt: 'DESC' } });
  }
}
