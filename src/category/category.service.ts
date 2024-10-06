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
import { Category, Prisma} from '@prisma/client';
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
  async getByCategoryId(categoryId: number): Promise<Category> {
    return await this.prisma.category.findUniqueOrThrow({
      where: {
        categoryId: categoryId,
      },
    });
  }

  private async isNameExistInRoom(
    name: string,
 ): Promise<boolean> {
    return (
      (await this.prisma.category.count({
        where: {
          categoryName: { equals: name, mode: 'insensitive' },
        },
      })) !== 0
    );
  }

  async createCategory(options: { categoryName: string }): Promise<Category> {
    try {
      const { categoryName } = options;
      if (await this.isNameExistInRoom(categoryName)) {
        throw new Error('Category name already exist');
      }
      const category = await this.prisma.category.create({
        data: {
          categoryName: categoryName,
        },
      });
  
      return category;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }
  
  async getAll(options?: {
    search?: string;
    skip?: number;
    take?: number;
}): Promise<{
    count: number;
    skip: number;
    take: number;
    data: Category[];
}> {
    try {
        const search = options?.search?.trim();
        const pagination = { skip: options?.skip || 0, take: options?.take || 10 };
        const where: Prisma.CategoryWhereInput = {};
        if (search) {
            const buildSearchFilter = (search: string): Prisma.CategoryWhereInput[] => [
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

        const totalItems = await this.prisma.category.count({
            where,
        });

        const items = await this.prisma.category.findMany({
            where,
            skip: pagination.skip,
            take: pagination.take,
            orderBy: {
                categoryId: 'asc',
            },
        });

        return {
            count: totalItems,
            skip: pagination.skip,
            take: pagination.take,
            data: items,
        };
    } catch (error) {
        // console.error('Error in getAll:', error); // Log the error
        throw new Error('An error occurred while retrieving categories.');
    }
}


  async updateCategorySize(options: {
    categoryId: number;
    categoryName?: string;
  }): Promise<Category> {
    const { categoryId, categoryName } = options ;
    await this.getByCategoryId(categoryId);
    return   await this.prisma.category.update({
        where: { categoryId: categoryId },
        data: { categoryName },
      });
  }
  
  async deleteCategorySize(categoryId: number): Promise<Category> {
    await this.getByCategoryId(categoryId);
  return  await this.prisma.category.delete({
      where: {  categoryId: categoryId },
    });
  }
  
  
  
}
