//import { join } from 'path';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
//import { Product } from '@prisma/client';
import { adminConfigFactory } from '@Config';
import {
  StorageService,
  UtilsService,
  //   ValidatedUser,
  //   UserType,
  //   getAccessGuardCacheKey,
} from '@Common';
import { PrismaService } from '../prisma';
import { CreateSizeCategoryDto } from './dto/size-category.dto';
import { Prisma, SizeCategory } from '@prisma/client';
@Injectable()
export class CategoryService {
  constructor(
    @Inject(adminConfigFactory.KEY)
    private readonly config: ConfigType<typeof adminConfigFactory>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly storageService: StorageService,
  ) {}
  async getBySizeCategoryId(sizeCategoryId: number): Promise<SizeCategory> {
    return await this.prisma.sizeCategory.findUniqueOrThrow({
      where: {
        sizeCategoryId: sizeCategoryId,
      },
    });
  }

  async createCategorySize(data: CreateSizeCategoryDto): Promise<SizeCategory>{
    const { categoryName, sizeOptions } = data;
  
    return this.prisma.sizeCategory.create({
      data: {
        categoryName: categoryName,
        sizeOption: {
          create: sizeOptions.map((sizeOption) => ({
            sizeName: sizeOption.sizeName,
            sortOrder: sizeOption.sortOrder,
          })),
        },
      },
      include: {
        sizeOption: true, 
      },
    });
  }

  async getAll(options?: {
    search?: string;
    skip?: number;
    take?: number;
  }): Promise<{
    count: number;
    skip: number;
    take: number;
    data: SizeCategory[];
  }> {
    const search = options?.search?.trim();
    const pagination = { skip: options?.skip || 0, take: options?.take || 10 };
    const where: Prisma.SizeCategoryWhereInput = {};

    // Build search filter if search term is provided
    if (search) {
      const buildSearchFilter = (search: string): Prisma.SizeCategoryWhereInput[] => [
        {
          categoryName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
      
      const parts = search.split(' ');
      if (parts.length !== 0) {
        where.AND = [];
        for (const part of parts) {
          if (part.trim()) {
            where.AND.push({
              OR: buildSearchFilter(part.trim()),
            });
          }
        }
      }
    }
    const totalItems = await this.prisma.sizeCategory.count({
      where,
    });
    const items = await this.prisma.sizeCategory.findMany({
      where,
      include: {
        sizeOption: true, 
      },
      skip: pagination.skip,
      take: pagination.take,
      orderBy: {
        sizeCategoryId: 'asc', 
      },
    });

    return {
      count: totalItems,
      skip: pagination.skip,
      take: pagination.take,
      data: items,
    };
  }

  async updateCategorySize(options: {
    sizeCategoryId: number;
    categoryName?: string;
    sizeOptions?: Array<{
      sizeId?: number;
      sizeName?: string;
      sortOrder?: number;
    }>;
  }) {
    const { sizeCategoryId, categoryName, sizeOptions } = options || {};
    await this.getBySizeCategoryId(sizeCategoryId);
    if (categoryName) {
      await this.prisma.sizeCategory.update({
        where: { sizeCategoryId: sizeCategoryId },
        data: { categoryName },
      });
    }
    if (sizeOptions && sizeOptions.length > 0) {
      const updateSizePromises = sizeOptions.map(async (sizeOption) => {
        if (sizeOption.sizeId) {
          return this.prisma.sizeOption.update({
            where: { sizeId: sizeOption.sizeId },
            data: {
              sizeName: sizeOption.sizeName,
              sortOrder: sizeOption.sortOrder,
            },
          });
        } 
      });
     await Promise.all(updateSizePromises);
     
    }
   return { success: true };
  }
  
  async deleteCategorySize(sizeCatoryId: number): Promise<SizeCategory> {
    //console.log(sizeCatoryId);
  return  await this.prisma.sizeCategory.delete({
      where: {  sizeCategoryId: sizeCatoryId },
      include: { sizeOption: true}
    });
  }
  
  
  
}
