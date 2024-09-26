import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController} from './product.controller';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
