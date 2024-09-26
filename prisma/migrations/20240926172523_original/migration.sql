-- CreateEnum
CREATE TYPE "admin_status" AS ENUM ('active');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'blocked');

-- CreateEnum
CREATE TYPE "product_status" AS ENUM ('active', 'blocked');

-- CreateEnum
CREATE TYPE "otp_transport" AS ENUM ('email', 'mobile');

-- CreateEnum
CREATE TYPE "setting_type" AS ENUM ('binary', 'multi_select', 'single_select');

-- CreateEnum
CREATE TYPE "setting_context" AS ENUM ('user', 'System');

-- CreateEnum
CREATE TYPE "EntryType" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_image" TEXT,
    "status" "admin_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_meta" (
    "password_salt" TEXT,
    "password_hash" TEXT,
    "admin_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "dial_code" TEXT,
    "mobile" TEXT,
    "profile_image" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT,
    "status" "user_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_meta" (
    "google_id" TEXT,
    "password_salt" TEXT,
    "password_hash" TEXT,
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "otp" (
    "code" TEXT NOT NULL,
    "attempt" SMALLINT NOT NULL DEFAULT 1,
    "last_sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retries" SMALLINT NOT NULL DEFAULT 0,
    "transport" "otp_transport" NOT NULL,
    "target" TEXT NOT NULL,
    "last_code_verified" BOOLEAN NOT NULL DEFAULT false,
    "blocked" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "mapped_to" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "type" "setting_type" NOT NULL,
    "context" "setting_context" NOT NULL,
    "default" JSONB NOT NULL,
    "is_defined_options" BOOLEAN NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting_option" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "value" TEXT NOT NULL,
    "setting_id" INTEGER NOT NULL,

    CONSTRAINT "setting_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_setting" (
    "selection" JSONB NOT NULL,
    "user_id" INTEGER NOT NULL,
    "setting_id" INTEGER NOT NULL,

    CONSTRAINT "user_setting_pkey" PRIMARY KEY ("user_id","setting_id")
);

-- CreateTable
CREATE TABLE "system_setting" (
    "selection" JSONB NOT NULL,
    "setting_id" INTEGER NOT NULL,

    CONSTRAINT "system_setting_pkey" PRIMARY KEY ("setting_id")
);

-- CreateTable
CREATE TABLE "MasterAccount" (
    "id" SERIAL NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "MasterAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubAccount" (
    "id" SERIAL NOT NULL,
    "masterAccountId" INTEGER NOT NULL,
    "bankName" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "SubAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voucher" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receipt_id" INTEGER,

    CONSTRAINT "voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "receiptId" INTEGER,
    "voucherId" INTEGER,
    "subAccountId" INTEGER,
    "adat" DOUBLE PRECISION,
    "commission" DOUBLE PRECISION,
    "entryType" "EntryType" NOT NULL,
    "entryId" INTEGER,
    "referenceId" TEXT,
    "masterAccountId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductGender" (
    "genderId" SERIAL NOT NULL,
    "gender_name" TEXT NOT NULL,

    CONSTRAINT "ProductGender_pkey" PRIMARY KEY ("genderId")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "categoryId" SERIAL NOT NULL,
    "field_name" TEXT NOT NULL,
    "field_image" TEXT,
    "size_category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "products" (
    "productId" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "product_description" TEXT,
    "status" "product_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "tags" (
    "tagId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "product_tags" (
    "product_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "product_tags_pkey" PRIMARY KEY ("product_id","tag_id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "brandId" SERIAL NOT NULL,
    "brand_name" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("brandId")
);

-- CreateTable
CREATE TABLE "Colour" (
    "colourId" SERIAL NOT NULL,
    "colour_name" TEXT,

    CONSTRAINT "Colour_pkey" PRIMARY KEY ("colourId")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "imageId" SERIAL NOT NULL,
    "image_url" TEXT,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("imageId")
);

-- CreateTable
CREATE TABLE "SizeCategory" (
    "size_category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SizeCategory_pkey" PRIMARY KEY ("size_category_id")
);

-- CreateTable
CREATE TABLE "SizeOption" (
    "sizeId" SERIAL NOT NULL,
    "size_name" TEXT NOT NULL,
    "size_order" INTEGER NOT NULL,
    "sizeCategoryId" INTEGER NOT NULL,

    CONSTRAINT "SizeOption_pkey" PRIMARY KEY ("sizeId")
);

-- CreateTable
CREATE TABLE "ProductVaration" (
    "variationId" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "size_id" INTEGER NOT NULL,
    "quantity_stock" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVaration_pkey" PRIMARY KEY ("variationId")
);

-- CreateTable
CREATE TABLE "ProductItem" (
    "itemId" SERIAL NOT NULL,
    "original_price" INTEGER NOT NULL,
    "sale_price" INTEGER,
    "product_code" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "colour_id" INTEGER NOT NULL,
    "size_id" INTEGER NOT NULL,
    "style_id" INTEGER NOT NULL,
    "neck_line_id" INTEGER NOT NULL,
    "sleeve_id" INTEGER NOT NULL,
    "season_id" INTEGER NOT NULL,
    "length_id" INTEGER NOT NULL,
    "body_id" INTEGER NOT NULL,
    "dress_id" INTEGER NOT NULL,

    CONSTRAINT "ProductItem_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "Style" (
    "styleId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Style_pkey" PRIMARY KEY ("styleId")
);

-- CreateTable
CREATE TABLE "NeckLine" (
    "neckLineId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "NeckLine_pkey" PRIMARY KEY ("neckLineId")
);

-- CreateTable
CREATE TABLE "SleeveLength" (
    "sleeveId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "SleeveLength_pkey" PRIMARY KEY ("sleeveId")
);

-- CreateTable
CREATE TABLE "Season" (
    "seasonId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("seasonId")
);

-- CreateTable
CREATE TABLE "Length" (
    "lengthId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Length_pkey" PRIMARY KEY ("lengthId")
);

-- CreateTable
CREATE TABLE "BodyFit" (
    "bodyId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "BodyFit_pkey" PRIMARY KEY ("bodyId")
);

-- CreateTable
CREATE TABLE "DressType" (
    "dressId" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "DressType_pkey" PRIMARY KEY ("dressId")
);

-- CreateTable
CREATE TABLE "_UserToMaster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GenderCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_meta_admin_id_key" ON "admin_meta"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_mobile_key" ON "user"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "user_meta_google_id_key" ON "user_meta"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_meta_user_id_key" ON "user_meta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "otp_transport_target_key" ON "otp"("transport", "target");

-- CreateIndex
CREATE UNIQUE INDEX "setting_context_mapped_to_key" ON "setting"("context", "mapped_to");

-- CreateIndex
CREATE UNIQUE INDEX "setting_option_setting_id_value_key" ON "setting_option"("setting_id", "value");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserToMaster_AB_unique" ON "_UserToMaster"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToMaster_B_index" ON "_UserToMaster"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenderCategories_AB_unique" ON "_GenderCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_GenderCategories_B_index" ON "_GenderCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductTags_AB_unique" ON "_ProductTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductTags_B_index" ON "_ProductTags"("B");

-- AddForeignKey
ALTER TABLE "admin_meta" ADD CONSTRAINT "admin_meta_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_meta" ADD CONSTRAINT "user_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setting" ADD CONSTRAINT "setting_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "setting"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setting_option" ADD CONSTRAINT "setting_option_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_setting" ADD CONSTRAINT "user_setting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_setting" ADD CONSTRAINT "user_setting_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_setting" ADD CONSTRAINT "system_setting_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "setting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubAccount" ADD CONSTRAINT "SubAccount_masterAccountId_fkey" FOREIGN KEY ("masterAccountId") REFERENCES "MasterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voucher" ADD CONSTRAINT "voucher_receipt_id_fkey" FOREIGN KEY ("receipt_id") REFERENCES "receipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "receipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_subAccountId_fkey" FOREIGN KEY ("subAccountId") REFERENCES "SubAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_masterAccountId_fkey" FOREIGN KEY ("masterAccountId") REFERENCES "MasterAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_size_category_id_fkey" FOREIGN KEY ("size_category_id") REFERENCES "SizeCategory"("size_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("brandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_tags" ADD CONSTRAINT "product_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("tagId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ProductItem"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeOption" ADD CONSTRAINT "SizeOption_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategory"("size_category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVaration" ADD CONSTRAINT "ProductVaration_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "ProductItem"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVaration" ADD CONSTRAINT "ProductVaration_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "SizeOption"("sizeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_colour_id_fkey" FOREIGN KEY ("colour_id") REFERENCES "Colour"("colourId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "SizeOption"("sizeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_style_id_fkey" FOREIGN KEY ("style_id") REFERENCES "Style"("styleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_neck_line_id_fkey" FOREIGN KEY ("neck_line_id") REFERENCES "NeckLine"("neckLineId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_sleeve_id_fkey" FOREIGN KEY ("sleeve_id") REFERENCES "SleeveLength"("sleeveId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "Season"("seasonId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_length_id_fkey" FOREIGN KEY ("length_id") REFERENCES "Length"("lengthId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_body_id_fkey" FOREIGN KEY ("body_id") REFERENCES "BodyFit"("bodyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_dress_id_fkey" FOREIGN KEY ("dress_id") REFERENCES "DressType"("dressId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToMaster" ADD CONSTRAINT "_UserToMaster_A_fkey" FOREIGN KEY ("A") REFERENCES "MasterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToMaster" ADD CONSTRAINT "_UserToMaster_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenderCategories" ADD CONSTRAINT "_GenderCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductCategory"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenderCategories" ADD CONSTRAINT "_GenderCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductGender"("genderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductTags" ADD CONSTRAINT "_ProductTags_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductTags" ADD CONSTRAINT "_ProductTags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("tagId") ON DELETE CASCADE ON UPDATE CASCADE;
