import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

// Forum Model
const Forum = db.define(
  "forum",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Tabel yang di-referensikan
        key: "id", // Kolom yang menjadi referensi
      },
      onDelete: "CASCADE", // Jika user dihapus, forum terkait juga akan dihapus
    },
    uname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi agar title tidak kosong
      },
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi agar caption tidak kosong
      },
    },
    hashtags: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true, // Validasi URL jika ada image
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true, // Untuk createdAt dan updatedAt
    tableName: "forum", // Nama tabel sesuai dengan yang diinginkan
  }
);

// Before Create Hook: Check if 'uname' exists in the 'users' table
Forum.beforeCreate(async (forum, options) => {
  const user = await db.models.users.findOne({
    where: { username: forum.uname },
  });
  if (!user) {
    throw new Error('Username does not exist');
  }
});

// Like Model
const Like = db.define(
  "likes",
  {
    forum_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "forum", // Tabel forum yang di-referensikan
        key: "id",
      },
      onDelete: "CASCADE", // Jika forum dihapus, like terkait juga dihapus
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Tabel users yang di-referensikan
        key: "id",
      },
      onDelete: "CASCADE", // Jika user dihapus, like terkait juga dihapus
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    tableName: "likes",
  }
);

// Reply Model
const Reply = db.define(
  "replies",
  {
    forum_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "forum", // Tabel forum yang di-referensikan
        key: "id",
      },
      onDelete: "CASCADE", // Jika forum dihapus, reply terkait juga dihapus
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users", // Tabel users yang di-referensikan
        key: "id",
      },
      onDelete: "CASCADE", // Jika user dihapus, reply terkait juga dihapus
    },
    reply_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, // Validasi agar reply tidak kosong
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    tableName: "replies",
  }
);

// Define associations
Forum.belongsTo(db.models.users, { foreignKey: "user_id" });
Forum.hasMany(Like, { foreignKey: "forum_id" });
Forum.hasMany(Reply, { foreignKey: "forum_id" });
Like.belongsTo(db.models.forum, { foreignKey: "forum_id" });
Like.belongsTo(db.models.users, { foreignKey: "user_id" });
Reply.belongsTo(db.models.forum, { foreignKey: "forum_id" });
Reply.belongsTo(db.models.users, { foreignKey: "user_id" });

export { Forum, Like, Reply };
