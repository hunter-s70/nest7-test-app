import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ArticlesCreate1606654507304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'article',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'text',
                    type: 'text'
                },
                {
                    name: 'created',
                    type: 'timestamptz',
                    default: 'now()'
                },
                {
                    name: 'updated',
                    type: 'timestamptz',
                    default: 'now()'
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('article');
    }

}
