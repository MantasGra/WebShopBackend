import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAuthToken1606796060836 implements MigrationInterface {
    name = 'UpdateAuthToken1606796060836'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `token` ADD `expiresAt` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `token` DROP COLUMN `expiresAt`");
    }

}
