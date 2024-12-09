import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

// Model untuk Users dengan penambahan kolom profile_image
const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Menambahkan validasi untuk memastikan field name tidak kosong
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Menambahkan validasi agar username unik
      validate: {
        notEmpty: true, // Validasi agar username tidak kosong
        len: [3, 50], // Validasi panjang username (minimal 3 karakter, maksimal 50)
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Menambahkan validasi agar email unik
      validate: {
        isEmail: true, // Validasi agar email harus dalam format yang benar
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Menambahkan validasi untuk memastikan password tidak kosong
      validate: {
        len: [6, 100], // Validasi panjang password (minimal 6 karakter)
      },
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: true, // Mengizinkan kolom ini null, karena user bisa tidak memiliki gambar
      defaultValue: null, // Menetapkan default null jika tidak ada gambar
    },
  },
  {
    freezeTableName: true,
    timestamps: true, // Menambahkan timestamps untuk createdAt dan updatedAt
    tableName: 'users', // Nama tabel sesuai dengan yang diinginkan
  }
);

export default Users;
