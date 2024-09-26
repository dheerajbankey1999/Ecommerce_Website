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
import { CategoryService } from './category.service';
import {CreateSizeCategoryDto , UpdateSizeCategoryDto, UpdateSizeOptionsDto} from './dto'
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

@ApiTags('Category')
@ApiBearerAuth()
@Roles(UserType.Admin)
@UseGuards(JwtAuthGuard, AccessGuard, RolesGuard)
@Controller('category')
export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();  }
  @Post()
  createCategorySize(
    @Req() req: AuthenticatedRequest,
    @Body() data: CreateSizeCategoryDto,
   ) {
     this.categoryService.createCategorySize({
      categoryName: data.categoryName,
      sizeOptions: data.sizeOptions, 
    });
    return { sucess: true};
  }

  @Get()
  async getAll(
    @Query() query: SearchablePaginatedDto,
  ) {
    return await this.categoryService.getAll({
      search: query.search,
      skip: query.skip,
      take: query.take,
    });
  }

  @Patch()
async updateCategorySize(
  @Req() req: AuthenticatedRequest,
  @Body() data: UpdateSizeCategoryDto,
) {  
 //console.log("These is data",data);
  await this.categoryService.updateCategorySize( {
    sizeCatoryId: data.sizeCatoryId,
    categoryName: data.categoryName,
    sizeOptions: data.sizeOptions,
  });
  return { success: true };
}

@Delete(':id')
async deleteCategorySize(
  @Req() req: AuthenticatedRequest,
  @Param('id', ParseIntPipe) sizeCatoryId: number,
) {
  //console.log("These is sizeCategory",sizeCatoryId);
  await this.categoryService.deleteCategorySize(sizeCatoryId);
  return { success: true, message: 'Size category deleted successfully' };
}


  }
