from pytest import fixture
from app import PRODUCTS_URL
from api.blueprints.products import products_blueprint
from api.models import Customer, Product
import json

@fixture()
def test_client(test_app):
    test_app.register_blueprint(orders_blueprint, url_prefix=PRODUCTS_URL)
    return test_app.test_client()

@fixture()
def init_db():
    customer = Customer(CustomerFirstName="Test1", CustomerLastName="McTest1")
    customer.save()

    active_product = Product(
        ProductName="Test1",
        ProductPhotoURL="/test1",
        ProductStatus="Active"
    )
    active_product.save()
    in_active_product = Product(
        ProductName="Test2",
        ProductPhotoURL="/test2",
        ProductStatus="InActive"
    )
    in_active_product.save()

    return [active_product, in_active_product], [customer]

def test_get_all_products(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/all")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 5

def test_get_active_products(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/active")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 3
    for product in data:
        assert product.get("ProductStatus") == 'Active'

def test_get_inactive_products(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/inactive")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 2
    for product in data:
        assert product.get("ProductStatus") == 'InActive'
