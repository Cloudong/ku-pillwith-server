const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // db.js에서 Sequelize 인스턴스 가져오기

const Pill = sequelize.define('Pill', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_name: {
        type: DataTypes.TEXT,
        allowNull: false, // NOT NULL
        unique: true,
    },
    item_ingr_name: {
        type: DataTypes.TEXT,
    },
    product_type: {
        type: DataTypes.STRING,
    },
    ee_doc_data: {
        type: 'MEDIUMTEXT',
    },
    ud_doc_data: {
        type: 'MEDIUMTEXT',
    },
    nb_doc_data: {
        type: 'MEDIUMTEXT',
    },
    big_prdt_img_url: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'pills', // 테이블 이름 설정
    timestamps: false, // createdAt, updatedAt 자동 생성 비활성화
});

module.exports = Pill;
