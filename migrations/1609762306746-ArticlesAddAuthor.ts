import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class ArticlesAddAuthor1609762306746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('article', new TableColumn({
            name: 'authorId',
            type: 'int',
            default: 2
        }));

        await queryRunner.createForeignKey('article', new TableForeignKey({
            columnNames: ['authorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('article');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('authorId') !== -1);

        await queryRunner.dropForeignKey('article', foreignKey);
        await queryRunner.dropColumn('article', 'authorId');
    }

}
