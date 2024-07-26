from marshmallow import Schema, fields, pre_load

class ProductSchema(Schema):
    ProductID = fields.Int()
    ProductName = fields.Str()
    ProductPhotoURL = fields.Str()
    ProductStatus = fields.Int()
    @pre_load
    def make_object(self, data, **kwargs):
        return data
