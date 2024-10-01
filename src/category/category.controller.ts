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
import { UpdateSizeCategoryDto, CreateCategoryDto } from './dto';

@ApiTags('Category')
@ApiBearerAuth()
@Roles(UserType.Admin)
@UseGuards(JwtAuthGuard, AccessGuard, RolesGuard)
@Controller('category')
export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();  }
  @Post()
  async createCategory(
    @Body() data: CreateCategoryDto,
   ) {
   await  this.categoryService.createCategory({
      categoryName: data.categoryName,
    });
    return { success: true};
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
  @Body() data: UpdateSizeCategoryDto,
) {  
 //console.log("These is data",data);
  await this.categoryService.updateCategorySize( {
    categoryId: data.categoryId,
    categoryName: data.categoryName,
  });
  return { success: true };
}

@Delete(':id')
async deleteCategorySize(
  @Req() req: AuthenticatedRequest,
  @Param('id', ParseIntPipe) categoryId: number,
) {
  //console.log("These is sizeCategory",sizeCatoryId);
  await this.categoryService.deleteCategorySize(categoryId);
  return { success: true, message: 'Size category deleted successfully' };
}


  }
