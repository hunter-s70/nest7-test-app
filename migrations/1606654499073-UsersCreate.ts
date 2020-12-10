import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersCreate1606654499073 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '16'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '40'
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '70'
                },
                {
                    name: 'token',
                    type: 'varchar',
                    isNullable: true
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
