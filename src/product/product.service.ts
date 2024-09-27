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
import { Prisma, ProductCategory } from '@prisma/client';
import { SizeCategory } from '@prisma/client';
@Injectable()
export class ProductService {
  constructor(
    @Inject(adminConfigFactory.KEY)
    private readonly config: ConfigType<typeof adminConfigFactory>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly storageService: StorageService,
  ) {}
   

  async getByProductCategoryId(categoryId: number): Promise<ProductCategory> {
    return await this.prisma.productCategory.findUniqueOrThrow({
      where: {
        categoryId: categoryId,
      },
    });
  }
  async createProductCategory(
    options: {
      fieldName: string;
      fieldImage?: string;
      sizeCategoryId?: number; 
      genderName: string;
    }
  ): Promise<ProductCategory> {
    if (!options) {
      throw new Error("Options must be provided.");
    }
  
    const { fieldName, fieldImage, sizeCategoryId, genderName } = options;
  
    const newCategory = await this.prisma.productCategory.create({
      data: {
        fieldName,
        fieldImage,
        sizeCategory: {
          connect: {
            sizeCategoryId: sizeCategoryId, 
          },
        },
        productGender: {  
          create: {
            genderName: genderName,
          },
        },
      },
      include: {
        sizeCategory: true,  
        productGender: true, 
      },
    });
    return newCategory;
  }
  
  async getAll(options?: {
    search?: string;
    skip?: number;
    take?: number;
  }): Promise<{
    count: number;
    skip: number;
    take: number;
    data: ProductCategory[];
  }> {
    const search = options?.search?.trim();
    const pagination = { skip: options?.skip || 0, take: options?.take || 10 };
    const where: Prisma.ProductCategoryWhereInput = {};

    if (search) {
      const buildSearchFilter = (search: string): Prisma.ProductCategoryWhereInput[] => [
        {
          fieldName: {
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
    const totalItems = await this.prisma.productCategory.count({
      where,
    });
    const items = await this.prisma.productCategory.findMany({
      where,
      include: {
        productGender: true, 
        sizeCategory:true,
      },
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
  }

  async updateProductCategory(
    options: {
      categoryId: number;
      fieldName?: string;
      fieldImage?: string;
      genderId?: number; 
      genderName?: string; 
    }
  ): Promise<ProductCategory> {
    if (!options || !options.categoryId) {
      throw new Error("Category ID must be provided.");
    }
  const { categoryId, fieldName, fieldImage, genderId, genderName } = options;
  await this.getByProductCategoryId(categoryId);
    const updateData: { [key: string]: any } = {};
  
    if (fieldName !== undefined) {
      updateData.fieldName = fieldName;
    }
  
    if (fieldImage !== undefined) {
      updateData.fieldImage = fieldImage;
    }

    if (genderId && genderName) {
      await this.prisma.productGender.update({
        where: { genderId: genderId },
        data: { genderName: genderName }, 
      });
    }
  
    const updatedCategory = await this.prisma.productCategory.update({
      where: { categoryId: categoryId }, 
      data: updateData, 
      include: {
        sizeCategory: true,
        productGender: true,
      },
    });
  
    return updatedCategory;
  }
  async deleteProductCategory(categoryId: number): Promise<ProductCategory> {
    await this.getByProductCategoryId(categoryId);
  return  await this.prisma.productCategory.delete({
      where: {  categoryId: categoryId },
      include: { 
        productGender:true,
        sizeCategory: true}
    });
  }
}
