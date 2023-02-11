from ..models import Product
import pandas as pd

#excel file should have columns:  barcodeID, name, description, price, quantity, expiry
def import_data(file_path: str):
    df = pd.read_excel(file_path)
    for index, row in df.iterrows():

        print(row['barcodeID'], end=" ")
        print(row['name'], end=" ")
        print(row['description'], end=" " )
        print(row['price'], end=" ")
        print(row['quantity'], end=" ")
        print(row['expiry'])
        product = Product(
            name=row['name'],
            description=row['description'],
            price=row['price'],
            quantity=row['quantity'],
            expiry=row['expiry']
        )
        print(product)
        product.save()
        

