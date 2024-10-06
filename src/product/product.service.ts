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
import { Prisma, ProductCategory,Category, Product, ProductItem } from '@prisma/client';
//import { Category } from '@prisma/client';
 
Injectable()
export class ProductService {
  constructor(
    @Inject(adminConfigFactory.KEY)
    private readonly config: ConfigType<typeof adminConfigFactory>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
    private readonly storageService: StorageService,
  ) {}
   

  async getByProductCategoryId(productCategoryId: number): Promise<ProductCategory> {
    return await this.prisma.productCategory.findUniqueOrThrow({
      where: {
        productCategoryId: productCategoryId,
      },
    });
  }
  async createProductCategory(
    options: {
      fieldName: string;
      fieldImage?: string;
      categoryId: number; 
      genderName: string;
    }
  ): Promise<ProductCategory> {
    if (!options) {
      throw new Error("Options must be provided.");
    }
  
    const { fieldName, fieldImage, categoryId, genderName } = options;
    const newCategory = await this.prisma.productCategory.create({
      data: {
        fieldName,
        fieldImage,
        category: {
          connect: {
            categoryId: categoryId, 
          },
        },
        productGender: {
          create: {
            genderName: genderName,
          },
        },
      },
      include: {
        category: true,
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
        category:true,
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
      productCategoryId: number;
      fieldName?: string;
      fieldImage?: string;
      genderId?: number; 
      genderName?: string; 
    }
  ): Promise<ProductCategory> {
    if (!options || !options.productCategoryId) {
      throw new Error("Category ID must be provided.");
    }
  const { productCategoryId, fieldName, fieldImage, genderId, genderName } = options;
  await this.getByProductCategoryId(productCategoryId);
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
      where: { productCategoryId: productCategoryId }, 
      data: updateData, 
      include: {
        category: true,
        productGender: true,
      },
    });
  
    return updatedCategory;
  }
  async deleteProductCategory(productCategoryId: number): Promise<ProductCategory> {
    await this.getByProductCategoryId(productCategoryId);
  return  await this.prisma.productCategory.delete({
      where: {  productCategoryId: productCategoryId },
      include: { 
        productGender:true,
        category: true}
    });
  }
async createProduct(option: {
  productName: string;
  productCategoryId?: number;
  brandName?: string;
  productDescription?: string;
  tagName?: string;
  sizeOptions?: {
    sizeName?: string;
    sortOrder?: number;
  }[];
  productItems: {
    originalPrice: number;
    salePrice?: number;
    productCode: number;
    imageUrl?: string;
    colourId?: number;
    styleId?: number;
    necklineId?: number;
    sleeveId?: number;
    seasonId?: number;
    lengthId?: number;
    bodyId?: number;
    dressId?: number;
  }[];
}) {
  const { productName, productCategoryId, brandName, productDescription, tagName, productItems ,sizeOptions} = option;
    try {
      
      const product = await this.prisma.product.create({
        data: {
            productName,
            productCategoryId,
            productDescription,
            brandName,
            tagName,
            sizeOptions: { 
                create: sizeOptions?.map((size) => ({
                    sizeName: size.sizeName,
                    sortOrder: size.sortOrder,
                })),
            },
            productItems: {
                create: productItems.map((item) => ({
                    originalPrice: item.originalPrice,
                    salePrice: item.salePrice,
                    productCode: item.productCode,
                    imageUrl: item.imageUrl,
                    colour: item.colourId ? { connect: { colourId: item.colourId } } : undefined,
                    style: item.styleId ? { connect: { styleId: item.styleId } } : undefined,
                    neckLine: item.necklineId ? { connect: { neckLineId: item.necklineId } } : undefined,
                    sleeveLength: item.sleeveId ? { connect: { sleeveId: item.sleeveId } } : undefined,
                    season: item.seasonId ? { connect: { seasonId: item.seasonId } } : undefined,
                    length: item.lengthId ? { connect: { lengthId: item.lengthId } } : undefined,
                    bodyFit: item.bodyId ? { connect: { bodyId: item.bodyId } } : undefined,
                    dressType: item.dressId ? { connect: { dressId: item.dressId } } : undefined,
                })),
            },
        },
        include: {
            productItems: true,
            sizeOptions:true
        },
        });
      return product;
    } catch (error) {
      console.error("Error creating product: ", error);
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async updateProduct(
    productId: number,
    option: {
      productName?: string;
      productCategoryId?: number;
      brandName?: string;
      productDescription?: string;
      tagName?: string;
      sizeOptions?: {
        optionId?: number;  
        sizeName?: string;
        sortOrder?: number;
      }[];
      productItems: {
        itemId: number;  
        originalPrice?: number;
        salePrice?: number;
        productCode?: number;
        imageUrl?: string;
        colourId?: number;
        styleId?: number;
        necklineId?: number;
        sleeveId?: number;
        seasonId?: number;
        lengthId?: number;
        bodyId?: number;
        dressId?: number;
      }[];
    }
  ) {
    const {
      productName,
      productCategoryId,
      brandName,
      productDescription,
      tagName,
      productItems, // Ensure productItems is always an array
      sizeOptions,
    } = option;
    try {
      // Update product details
      if (productName || productCategoryId || brandName || productDescription || tagName || sizeOptions) {
        const product = await this.prisma.product.update({
          where: { productId },
          data: {
            ...(productName && { productName }),
            ...(productCategoryId && {
              productCategory: {
                connect: { productCategoryId },  
              },
            }),
            ...(productDescription && { productDescription }),
            ...(brandName && { brandName }),
            ...(tagName && { tagName }),
            ...(sizeOptions && {
              sizeOptions: {
                upsert: sizeOptions.map((size) => ({
                  where: { optionId: size.optionId }, 
                  update: {
                    sizeName: size.sizeName,
                    sortOrder: size.sortOrder,
                  },
                  create: {
                    sizeName: size.sizeName,
                    sortOrder: size.sortOrder,
                  },
                })),
              },
            }),
          },
          include: {
            sizeOptions: true,
          },
        });
  
        // Update product items
        if (productItems && productItems.length > 0) {
          for (const item of productItems) {
            if (!item.itemId) {
              throw new Error("itemId is required for updating product items.");
            }
          for (const item of productItems) {
            await this.prisma.productItem.update({
              where: { itemId: item.itemId },  
              data: {
                originalPrice: item.originalPrice,
                salePrice: item.salePrice,
                imageUrl: item.imageUrl,
                colour: {
                  disconnect: true,
                  ...(item.colourId && { connect: { colourId: item.colourId } }),
                },
                style: {
                  disconnect: true,
                  ...(item.styleId && { connect: { styleId: item.styleId } }),
                },
                neckLine: {
                  disconnect: true,
                  ...(item.necklineId && { connect: { neckLineId: item.necklineId } }),
                },
                sleeveLength: {
                  disconnect: true,
                  ...(item.sleeveId && { connect: { sleeveId: item.sleeveId } }),
                },
                season: {
                  disconnect: true,
                  ...(item.seasonId && { connect: { seasonId: item.seasonId } }),
                },
                length: {
                  disconnect: true,
                  ...(item.lengthId && { connect: { lengthId: item.lengthId } }),
                },
                bodyFit: {
                  disconnect: true,
                  ...(item.bodyId && { connect: { bodyId: item.bodyId } }),
                },
                dressType: {
                  disconnect: true,
                  ...(item.dressId && { connect: { dressId: item.dressId } }),
                },
              },
            });
          }
        }
  
        return product;
      }
    } 
  }catch (error) {
      console.error("Error updating product: ", error);
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }
 

  async getAllProduct(options?: {
    search?: string;
    skip?: number;
    take?: number;
  }): Promise<{
    count: number;
    skip: number;
    take: number;
    data: Product[];
  }> {
    const search = options?.search?.trim();
    const pagination = { skip: options?.skip || 0, take: options?.take || 10 };
    const where: Prisma.ProductWhereInput = {};

    if (search) {
      const buildSearchFilter = (search: string): Prisma.ProductWhereInput[] => [
        {
          productName: {
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
    const totalItems = await this.prisma.product.count({
      where,
    });
    const items = await this.prisma.product.findMany({
      where,
      include: {
        sizeOptions: true, 
        productCategory:true,
        productItems: {
          include: {
            style: true,       
            neckLine: true, 
            sleeveLength: true,  
            season: true,    
            length: true,    
            bodyFit: true,     
            dressType: true,     
            colour: true       
          }
        }
      },
      skip: pagination.skip,
      take: pagination.take,
      orderBy: {
        productId: 'asc', 
      },
    });

    return {
      count: totalItems,
      skip: pagination.skip,
      take: pagination.take,
      data: items,
    };
  }
}
