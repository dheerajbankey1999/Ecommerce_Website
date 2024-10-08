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
import { CreateProductCategoryDto, UpdateProductCategoryDto,CreateProductDto } from './dto';
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
import { ProductCategory } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product-dto';
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
   return await this.productService.createProductCategory({
      fieldName: data.fieldName,
      fieldImage:data.fieldImage ?? '',
      categoryId: data.categoryId,
      genderName: data.genderName ?? '',
    });
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
      productCategoryId: data.productCategoryId,
      fieldName:data.fieldName,
      fieldImage:data.fieldImage,
      genderId:data.genderId,
      genderName : data.genderName
    });
    return { success: true, data: updatedCategory };
  }

  
  @Delete('category/:id')
async deleteProductCategory(
  @Req() req: AuthenticatedRequest,
  @Param('id', ParseIntPipe) productCategoryId: number,
) {
  await this.productService.deleteProductCategory(productCategoryId);
  return { success: true, message: 'Product category deleted successfully' };
}

@Post()
    async createProduct(@Body() data: CreateProductDto) {
        return this.productService.createProduct({
          productName:data.productName,
          productCategoryId:data.productCategoryId,
          brandName:data.brandName,
          productDescription:data.productDescription,
          tagName: data.tagName,
          sizeOptions:data.sizeOptions,
          productItems: data.productItems
          }
        );
    }

@Post('update/:id')
async updateProduct(
  @Param('id') productId: number,
  @Body() data: UpdateProductDto
) {
   this.productService.updateProduct(productId, {
    productName: data.productName,
    productCategoryId: data.productCategoryId,
    brandName: data.brandName,
    productDescription: data.productDescription,
    tagName: data.tagName,
    sizeOptions: data.sizeOptions,
    productItems: data.productItems ?? [],
  });
  return { sucess: 'true'}
}

@Get()
  async getAllProduct(
    @Query() query: SearchablePaginatedDto,
  ) {
    return await this.productService.getAllProduct({
      search: query.search,
      skip: query.skip,
      take: query.take,
    });
  }
}
