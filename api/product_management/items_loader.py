from ..models import Product
import pandas as pd

#excel file should have columns:  
def import_data(file_path: str):
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