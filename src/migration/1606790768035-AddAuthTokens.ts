import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAuthTokens1606790768035 implements MigrationInterface {
    name = 'AddAuthTokens1606790768035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `token` (`id` int NOT NULL AUTO_INCREMENT, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleteDate` datetime(6) NULL, `token` varchar(255) NOT NULL, `userId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `token` ADD CONSTRAINT `FK_94f168faad896c0786646fa3d4a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `token` DROP FOREIGN KEY `FK_94f168faad896c0786646fa3d4a`");
        await queryRunner.query("DROP TABLE `token`");
    }

}
