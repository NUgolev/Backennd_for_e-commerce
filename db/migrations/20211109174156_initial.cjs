exports.up = function(knex) {
    return knex.schema.createTable('order_info', table => {
        table.increments('id') // this represents the primary key.
        table.string('client_name') // this is a column.
        table.foreign('pay_type').references('pay_type.name').deferrable('deferred')
    })
};
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('order_info')
};