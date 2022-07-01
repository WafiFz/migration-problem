import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex,
    TableColumn,
    TableForeignKey,
} from "typeorm"

export class PostRefactoring1656055579611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "books",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "title",
                        type: "character varying",
                    },
                    {
                        name: "publisher",
                        type: "character varying",
                    },
                    {
                        name: "price",
                        type: "numeric",
                    },
                ],
            }),
            true,
        )

        // await queryRunner.createTable(
        //     new Table({
        //         name: "answer",
        //         columns: [
        //             {
        //                 name: "id",
        //                 type: "int",
        //                 isPrimary: true,
        //             },
        //             {
        //                 name: "title",
        //                 type: "character varying",
        //             },
        //             {
        //                 name: "publisher",
        //                 type: "character varying",
        //             },
        //             {
        //                 name: "price",
        //                 type: "number",
        //             },
        //         ],
        //     }),
        //     true,
        // )

        // await queryRunner.addColumn(
        //     "answer",
        //     new TableColumn({
        //         name: "questionId",
        //         type: "int",
        //     }),
        // )

        // await queryRunner.createForeignKey(
        //     "answer",
        //     new TableForeignKey({
        //         columnNames: ["questionId"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "question",
        //         onDelete: "CASCADE",
        //     }),
        // )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
