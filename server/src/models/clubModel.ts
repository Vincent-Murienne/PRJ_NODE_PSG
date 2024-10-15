// src/models/Club.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

export class Club extends Model {
    public id!: number;
    public presentation!: string;
    public histoire!: string;
}

export const initClub = (sequelize: Sequelize) => {
    Club.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    }, {
    tableName: 'clubs',
    sequelize,
    });
};