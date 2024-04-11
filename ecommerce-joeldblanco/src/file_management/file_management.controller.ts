import {
  Controller,
  Post,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileManagementService } from './file_management.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileManagementController {
  constructor(private readonly fileManagementService: FileManagementService) {}

  @Post('/uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'The file is too large. Max file size: 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileManagementService.create(id, file);
  }
}
