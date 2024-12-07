import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTaskRelation1733534749831 implements MigrationInterface {
    name = 'CreateUserTaskRelation1733534749831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "user_id"`);
    }

}
