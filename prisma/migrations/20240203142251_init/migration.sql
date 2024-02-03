-- AlterTable
ALTER TABLE `Bracket` ADD COLUMN `entity` VARCHAR(191) NOT NULL DEFAULT 'Bracket',
    ADD COLUMN `expiredAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `CategoryItem` ADD COLUMN `entity` VARCHAR(191) NOT NULL DEFAULT 'CategoryItem';

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `entity` VARCHAR(191) NOT NULL DEFAULT 'Item';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `entity` VARCHAR(191) NOT NULL DEFAULT 'User';
