'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('product', {
    id: { type: 'SERIAL', autoIncrement: true, primaryKey: true },
    name: 'text',
    price: 'money',
    category_id:
        {
          type: 'int',
          foreignKey:
              {
                name: 'id',
                table: 'category',
                rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
                },
                mapping: 'id'
              }
        },
    description: 'text',
    image_path: 'text'
  });
};

exports.down = function(db) {
  return db.dropTable('product');
};

exports._meta = {
  "version": 1
};