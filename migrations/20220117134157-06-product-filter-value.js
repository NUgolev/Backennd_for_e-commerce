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
  return db.createTable('product_filter_value', {
    id: { type: 'SERIAL', autoIncrement: true, primaryKey: true },
    product_id:
        {
          type: 'int',
          foreignKey:
              {
                name: 'p_id',
                table: 'product',
                rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
                },
                mapping: 'id'
              }
        },
    filter_id:
        {
          type: 'int',
          foreignKey:
              {
                name: 'f_id',
                table: 'filter',
                rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
                },
                mapping: 'id'
              }
        },
    value: 'text'
  });
};

exports.down = function(db) {
  return db.dropTable('product_filter_value');
};

exports._meta = {
  "version": 1
};