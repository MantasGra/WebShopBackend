import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBasicEntities1601939861623 implements MigrationInterface {
    name = 'UpdateBasicEntities1601939861623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_ff0c0301a95e517153df97f6812`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `categoryId` `categoryId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_ff0c0301a95e517153df97f6812`");
        await queryRunner.query("ALTER TABLE `product` CHANGE `categoryId` `categoryId` int NULL");
        await queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
