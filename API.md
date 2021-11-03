# Flink 

## Endpoint

`https://consumer-api.goflink.com/v1`

## Request

UserAgent: `Flink/1.0.0 (Client)`
locale: `de-DE`
hub: `Hub ID`
hub-slug: `hub slug`

## Endpoints

- GET `locations/hub`
  - query: lat, long
  - Alle Hubs anzeigen
- GET `hubs/(hub id)`
  - !headers
- GET `delivery_time`
  - query: hub_coords, delivery_coords
    - lat long im format "%, %"
  - !headers
- GET `products`
  - !headers
- POST `products/amounts-by-sku`
  - body: product_ids = array of ids, product_skus = array of skus
  - !headers  
- POST `cart`
  - body: {
        "billing_address": {
            "city": "Stuttgart",
            "country": "DE",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "+31600000000",
            "postal_code": "70197",
            "street_address_1": "Rotenwaldstr. 100"
        },
        "delivery_coordinates": {
            "latitude": 52.011446027275156,
            "longitude": 4.358461558901702
        },
        "delivery_eta": "10",
        "lines": [
            {
                "product_sku": "13003041",
                "quantity": 3
            }
        ],
        "email": "info@ricohageman.nl",
        "shipping_address": {
            "city": "Stuttgart",
            "country": "DE",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "+31600000000",
            "postal_code": "70197",
            "street_address_1": "Rotenwaldstr. 100"
        }
    },
    - !headers
- GET `card/(card id)`
  - !headers
- POST `cart/(card id)/add-promo-code`
  - body: voucher_code
  - !headers
