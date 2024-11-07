/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

// db/migrations/xxxx_create_messages_table.js
exports.up = function(knex) {
    return knex.schema.createTable('messages', (table) => {
      table.increments('id').primary();
      table.string('number');
      table.text('firstMessage');
      table.text('nameMessage');
      table.text('unitMessage');
      table.text('typeMessage');
      table.text('optionMessage');
      table.text('detailMessage');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
  };
  
