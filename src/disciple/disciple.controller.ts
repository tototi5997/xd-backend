import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { DiscipleService } from './disciple.service';
import { DiscipleCreateDto, DiscipleQueryDto } from './disciple.dto';

@Controller('disciple')
export class DiscipleController {
  constructor(private readonly discipleService: DiscipleService) {}

  @Post()
  getAllDisciples(@Body() discipleQueryDto: DiscipleQueryDto) {
    return this.discipleService.getDisciples(discipleQueryDto);
  }

  @Post('create')
  addNewDisciple(@Body() discipleCreateDto: DiscipleCreateDto) {
    return this.discipleService.createDisciple(discipleCreateDto);
  }

  @Delete(':id')
  outDisciple(@Param('id') id: string) {
    return this.discipleService.removeDisciple(id);
  }
}
