/*
  Warnings:

  - You are about to drop the `_ProductTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_size_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_body_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_colour_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_dress_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_length_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_neck_line_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_season_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_size_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_sleeve_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_style_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductVaration" DROP CONSTRAINT "ProductVaration_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductVaration" DROP CONSTRAINT "ProductVaration_size_id_fkey";

-- DropForeignKey
ALTER TABLE "SizeOption" DROP CONSTRAINT "SizeOption_sizeCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductTags" DROP CONSTRAINT "_ProductTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductTags" DROP CONSTRAINT "_ProductTags_B_fkey";

-- DropForeignKey
ALTER TABLE "product_tags" DROP CONSTRAINT "product_tags_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_tags" DROP CONSTRAINT "product_tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- AlterTable
ALTER TABLE "ProductCategory" ALTER COLUMN "size_category_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "item_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductItem" ALTER COLUMN "product_id" DROP NOT NULL,
ALTER COLUMN "colour_id" DROP NOT NULL,
ALTER COLUMN "size_id" DROP NOT NULL,
ALTER COLUMN "style_id" DROP NOT NULL,
ALTER COLUMN "neck_line_id" DROP NOT NULL,
ALTER COLUMN "sleeve_id" DROP NOT NULL,
ALTER COLUMN "season_id" DROP NOT NULL,
ALTER COLUMN "length_id" DROP NOT NULL,
ALTER COLUMN "body_id" DROP NOT NULL,
ALTER COLUMN "dress_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVaration" ALTER COLUMN "item_id" DROP NOT NULL,
ALTER COLUMN "size_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SizeOption" ALTER COLUMN "sizeCategoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "tag_id" INTEGER,
ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "brand_id" DROP NOT NULL;

-- DropTable
DROP TABLE "_ProductTags";

-- DropTable
DROP TABLE "product_tags";

-- DropTable
DROP TABLE "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_size_category_id_fkey" FOREIGN KEY ("size_category_id") REFERENCES "SizeCategory"("size_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("categoryId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("brandId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("tagId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ProductItem"("itemId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeOption" ADD CONSTRAINT "SizeOption_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategory"("size_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVaration" ADD CONSTRAINT "ProductVaration_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ProductItem"("itemId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVaration" ADD CONSTRAINT "ProductVaration_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "SizeOption"("sizeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_colour_id_fkey" FOREIGN KEY ("colour_id") REFERENCES "Colour"("colourId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "SizeOption"("sizeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_style_id_fkey" FOREIGN KEY ("style_id") REFERENCES "Style"("styleId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_neck_line_id_fkey" FOREIGN KEY ("neck_line_id") REFERENCES "NeckLine"("neckLineId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_sleeve_id_fkey" FOREIGN KEY ("sleeve_id") REFERENCES "SleeveLength"("sleeveId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("seasonId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_length_id_fkey" FOREIGN KEY ("length_id") REFERENCES "Length"("lengthId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_body_id_fkey" FOREIGN KEY ("body_id") REFERENCES "BodyFit"("bodyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_dress_id_fkey" FOREIGN KEY ("dress_id") REFERENCES "DressType"("dressId") ON DELETE SET NULL ON UPDATE CASCADE;
