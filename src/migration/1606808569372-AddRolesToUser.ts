import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRolesToUser1606808569372 implements MigrationInterface {
    name = 'AddRolesToUser1606808569372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `role` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `role`");
    }

}
