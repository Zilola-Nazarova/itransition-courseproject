import json
import pip._vendor.requests 

requests = pip._vendor.requests

def import_collections():
  headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Catch-Control": "no-cache",
    "Authorization": "Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYUBtYWlsLnJ1IiwiaWQiOiI2NjRkNzQxM2U0NDI3ZTJjYjEwM2IwNDAiLCJpYXQiOjE3MTgxMzgzMzgsImV4cCI6MTcxODE1OTkzOH0.Khxe-X39TpGMQ7F1xt9jSkwTnDM02VBzYRIeF25yvDg"
  }
  url = "http://localhost:5000/odoo/collections"
  try:
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return json.loads(response.text)
  except requests.exceptions.RequestException as e:
    print("Error making the request:", e)

collections = import_collections()

for collection in collections:
  record.create({
    'x_name': collection["title"],
    'x_studio_category': collection["category"],
    'x_studio_author': collection["author"],
    'x_studio_description': collection["description"],
    'x_studio_number_of_items': collection["itemsCount"]
  })
  