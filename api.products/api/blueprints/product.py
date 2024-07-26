from flask import Blueprint, request
from marshmallow import ValidationError
from api.models import Product
from api.schemas import ProductSchema

products_blueprint = Blueprint('products_blueprint', __name__)

@products_blueprint.route('/all', methods=['GET'])
def get_all_products():
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized, 'message': '' }, 200

@products_blueprint.route('/active', methods=['GET'])
def get_active_products():
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().where(
            (Product.ProductStatus == 'Active')
        ).dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized, 'message': '' }, 200

@products_blueprint.route('/inactive', methods=['GET'])
def get_inactive_products():
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().where(
            (Product.ProductStatus == 'InActive')
        ).dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized, 'message': '' }, 200

