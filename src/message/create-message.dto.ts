import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    example: 'juan@correo.com',
    description: 'Correo del remitente',
  })
  sender: string;

  @ApiProperty({
    example: 'maria@correo.com',
    description: 'Correo del destinatario',
  })
  recipient: string;

  @ApiProperty({
    example: '¡Hola, María!',
    description: 'Contenido del mensaje',
  })
  content: string;
}
