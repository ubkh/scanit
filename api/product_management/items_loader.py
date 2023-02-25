from ..models import Product
import pandas as pd

#excel file should have columns:  barcodeID, name, description, price, quantity, expiry
def import_data(file_path: str):
    df = pd.read_excel(file_path)
    for index, row in df.iterrows():

        print(type(row['barcodeID']), end=" ")
        print(type(row['name']), end=" ")
        print(type(row['description']), end=" " )
        print(type(row['price']), end=" ")
        print(type(row['quantity']), end=" ")
        print(type(row['expiry']))
        product = Product(
            retailerID=9,
            barcodeID=row['barcodeID'],
            name=row['name'],
            description=row['description'],
            price=int((row['price']) * 100),
            quantity=row['quantity'],
            expiry=row['expiry']
        )
        print(product)
        product.save()
        

