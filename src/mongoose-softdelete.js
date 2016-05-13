'use strict';

module.exports = function(schema) {
  schema.add({ deleted: Boolean });
  schema.add({ deletedAt: Date });

  schema.pre('save', function (next) {
    if (!this.deleted) {
      this.deleted = false;
    }

    if (!this.deletedAt) {
      this.deletedAt = null;
    }

    next();
  });

  var filterDeleted = function(next) {
    if (this._conditions.deleted === undefined) {
      this.where({
        deleted: false
      });
    }

    next();
  };

  schema.pre('find', filterDeleted);
  schema.pre('findOne', filterDeleted);
  schema.pre('findAll', filterDeleted);

  schema.methods.softdelete = function(callback) {
    this.deleted = true;
    this.deletedAt = new Date();
    this.save(callback);
  };

  schema.methods.restore = function(callback) {
    this.deleted = false;
    this.deletedAt = null;
    this.save(callback);
  };
};
