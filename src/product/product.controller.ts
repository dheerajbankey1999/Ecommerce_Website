import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto';
import {
  AccessGuard,
  AuthenticatedRequest,
  BaseController,
  JwtAuthGuard,
  Roles,
  RolesGuard,
  SearchablePaginatedDto,
  UserType,
} from '@Common';

@ApiTags('Product')
@ApiBearerAuth()
@Roles(UserType.Admin)
@UseGuards(JwtAuthGuard, AccessGuard, RolesGuard)
@Controller('product')
export class ProductController extends BaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }
  @Post('category')
  async createProductCategory(
    @Body() data: CreateProductCategoryDto,
  ) {
    await this.productService.createProductCategory({
      fieldName: data.fieldName,
      fieldImage:data.fieldImage ?? '',
      sizeCategoryId: data.sizeCategoryId,
      genderName: data.genderName ?? '',
    })
    return { success: true }; 
  }

  @Get('category')
  async getAll(
    @Query() query: SearchablePaginatedDto,
  ) {
    return await this.productService.getAll({
      search: query.search,
      skip: query.skip,
      take: query.take,
    });
  }

  @Patch('category')
  async updateProductCategory(
    @Body() data: UpdateProductCategoryDto
  ) {
     console.log(data);
    const updatedCategory = await this.productService.updateProductCategory({
      categoryId: data.categoryId,
      fieldName:data.fieldName,
      fieldImage:data.fieldImage,
      genderId:data.genderId,
      genderName : data.genderName
    });
    return { success: true, data: updatedCategory };
  }

  
//   @Delete('category/:id')
// async deleteProductCategory(
//   @Req() req: AuthenticatedRequest,
//   @Param('id', ParseIntPipe) categoryId: number,
// ) {
//   console.log("These is sizeCategory",categoryId);
//   await this.productService.deleteProductCategory(categoryId);
//   return { success: true, message: 'Size category deleted successfully' };
// }
}
