import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './create-message.dto';
import { MessageService } from './message.service';

@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiBody({ type: CreateMessageDto })
  create(@Body() body: CreateMessageDto) {
    return this.messageService.create(
      body.sender,
      body.recipient,
      body.content,
    );
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
}
