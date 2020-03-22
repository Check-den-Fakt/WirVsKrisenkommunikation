import csv
from mysql.connector import connect
import sys

# usage: python3 push_trusted_sources_to_backend_database.py [db_password]

db = connect(
        user="tp_admin@trustedpublisher",
        password=f"{sys.argv[1]}",
        host="trustedpublisher.mysql.database.azure.com",
        port=3306,
        database="trustedpublisher")

cursor = db.cursor()
cursor.execute("DELETE FROM url")
cursor.execute("DELETE FROM publisher")
db.commit()

with open('spreadsheet.csv', 'r') as csvfile:
    for name, url, score in csv.reader(csvfile, delimiter=','):
        cursor.execute(f"SELECT * FROM publisher p WHERE p.title = \"{name}\"")
        searchresult = cursor.fetchall()
        if len(searchresult) < 1:
            print(f"Creating Source: {name}")
            cursor.execute(f"INSERT INTO publisher (title, trustScore) VALUES (%s, %s)",
                           (f"{name}", f"{score}"))
            db.commit()

        cursor.execute(f"SELECT * FROM publisher p WHERE p.title = \"{name}\"")
        searchresult = cursor.fetchall()
        if len(searchresult) == 1:
            id, _, _ = searchresult[0]
            print(f"Adding url {url} for {name}")
            cursor.execute(f"INSERT INTO url (url, publisher_idPublisher) VALUES (%s, %s)",
                           (f"{url}", f"{id}"))
            db.commit()

cursor.execute(f"SELECT * FROM publisher")
print(cursor.fetchall())
cursor.execute(f"SELECT * FROM url")
print(cursor.fetchall())
