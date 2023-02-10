from ..models import Product
import pandas as pd


def import_data(file_path):
    df = pd.read_excel(file_path)
    for index, row in df.iterrows():
        product = Product(
            name=row['name'],
            description=row['description'],
            price=row['price'],
            quantity=row['quantity'],
            expiry=row['expiry']
        )
        product.save()