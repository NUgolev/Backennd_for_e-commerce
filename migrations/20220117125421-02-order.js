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

exports.up = function(db) {
  return db.createTable('order', {
    id: { type: 'SERIAL', autoIncrement: true, primaryKey: true },
    client_name: 'text',
    client_surname: 'text',
    phone : 'text',
    address : 'text',
    pay_type_id:
        {
          type: 'int',
          foreignKey:
              {
                name: 'id',
                table: 'pay_type',
                rules: {
                  onDelete: 'CASCADE',
                  onUpdate: 'RESTRICT'
                },
                mapping: 'id'
              }
        }
  });
};

exports.down = function(db) {
  db.dropTable('order');
};

exports._meta = {
  "version": 1
};