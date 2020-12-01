import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAllEntities1606808194705 implements MigrationInterface {
    name = 'AddAllEntities1606808194705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `discount` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `type` varchar(255) NOT NULL, `amount` double NOT NULL, `origin` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `payment_method` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `type` varchar(255) NOT NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `purchase` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `date` datetime NOT NULL, `status` varchar(255) NOT NULL, `cartId` int NOT NULL, `userId` int NOT NULL, `paymentMethodId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cart` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cart_product` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `quantity` int NOT NULL, `productId` int NOT NULL, `cartId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `warehouse` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `name` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `warehouse_product` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `quantity` int NOT NULL, `warehouseId` int NOT NULL, `productId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `review` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `stars` double NOT NULL, `comment` varchar(255) NOT NULL, `productId` int NOT NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `cart_discounts_discount` (`cartId` int NOT NULL, `discountId` int NOT NULL, INDEX `IDX_84e645db1e1babc53e036b25ea` (`cartId`), INDEX `IDX_8da237033b304cd4ab3ac4e65a` (`discountId`), PRIMARY KEY (`cartId`, `discountId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `payment_method` ADD CONSTRAINT `FK_34a4419ef2010224d7ff600659d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `purchase` ADD CONSTRAINT `FK_5057feb7343fdbc7fde005e6e47` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `purchase` ADD CONSTRAINT `FK_33520b6c46e1b3971c0a649d38b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `purchase` ADD CONSTRAINT `FK_888c2a8a11cdc26e5fed685e024` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart` ADD CONSTRAINT `FK_756f53ab9466eb52a52619ee019` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart_product` ADD CONSTRAINT `FK_4f1b0c66f4e0b4610e14ca42e5c` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart_product` ADD CONSTRAINT `FK_139f8024067696fe5a8400ebda2` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `warehouse_product` ADD CONSTRAINT `FK_a8c9aee14d47ec7b3f2ac429ebc` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `warehouse_product` ADD CONSTRAINT `FK_3f934c4772e7c7f2c66d7ea4e72` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_2a11d3c0ea1b2b5b1790f762b9a` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_1337f93918c70837d3cea105d39` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart_discounts_discount` ADD CONSTRAINT `FK_84e645db1e1babc53e036b25eaf` FOREIGN KEY (`cartId`) REFERENCES `cart`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `cart_discounts_discount` ADD CONSTRAINT `FK_8da237033b304cd4ab3ac4e65a9` FOREIGN KEY (`discountId`) REFERENCES `discount`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `cart_discounts_discount` DROP FOREIGN KEY `FK_8da237033b304cd4ab3ac4e65a9`");
        await queryRunner.query("ALTER TABLE `cart_discounts_discount` DROP FOREIGN KEY `FK_84e645db1e1babc53e036b25eaf`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_1337f93918c70837d3cea105d39`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_2a11d3c0ea1b2b5b1790f762b9a`");
        await queryRunner.query("ALTER TABLE `warehouse_product` DROP FOREIGN KEY `FK_3f934c4772e7c7f2c66d7ea4e72`");
        await queryRunner.query("ALTER TABLE `warehouse_product` DROP FOREIGN KEY `FK_a8c9aee14d47ec7b3f2ac429ebc`");
        await queryRunner.query("ALTER TABLE `cart_product` DROP FOREIGN KEY `FK_139f8024067696fe5a8400ebda2`");
        await queryRunner.query("ALTER TABLE `cart_product` DROP FOREIGN KEY `FK_4f1b0c66f4e0b4610e14ca42e5c`");
        await queryRunner.query("ALTER TABLE `cart` DROP FOREIGN KEY `FK_756f53ab9466eb52a52619ee019`");
        await queryRunner.query("ALTER TABLE `purchase` DROP FOREIGN KEY `FK_888c2a8a11cdc26e5fed685e024`");
        await queryRunner.query("ALTER TABLE `purchase` DROP FOREIGN KEY `FK_33520b6c46e1b3971c0a649d38b`");
        await queryRunner.query("ALTER TABLE `purchase` DROP FOREIGN KEY `FK_5057feb7343fdbc7fde005e6e47`");
        await queryRunner.query("ALTER TABLE `payment_method` DROP FOREIGN KEY `FK_34a4419ef2010224d7ff600659d`");
        await queryRunner.query("DROP INDEX `IDX_8da237033b304cd4ab3ac4e65a` ON `cart_discounts_discount`");
        await queryRunner.query("DROP INDEX `IDX_84e645db1e1babc53e036b25ea` ON `cart_discounts_discount`");
        await queryRunner.query("DROP TABLE `cart_discounts_discount`");
        await queryRunner.query("DROP TABLE `review`");
        await queryRunner.query("DROP TABLE `warehouse_product`");
        await queryRunner.query("DROP TABLE `warehouse`");
        await queryRunner.query("DROP TABLE `cart_product`");
        await queryRunner.query("DROP TABLE `cart`");
        await queryRunner.query("DROP TABLE `purchase`");
        await queryRunner.query("DROP TABLE `payment_method`");
        await queryRunner.query("DROP TABLE `discount`");
    }

}
