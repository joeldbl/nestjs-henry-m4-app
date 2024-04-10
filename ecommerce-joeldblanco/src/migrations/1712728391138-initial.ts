import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1712728391138 implements MigrationInterface {
    name = 'Initial1712728391138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "country" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(20) NOT NULL`);
    }

}
