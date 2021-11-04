# Discount checker for flink

goflink aka flink discount checker app with city provided check and amount

- You can find flink codes [here](./CODES.md).
- Flink api endpoint docs [here](./API.md).
- Frontend [here](./front/README.md).

## Setup

### Docker

1. Build the image
``docker build -t discount-checker .``
2. Run the image
``docker run -d --name discount-checker discount-checker``

#### Configuration

Following environment variables exist with the default value:

```
PORT=3000
VITE_API_URL=""
```

## Planing
POST /create-checker

Body:
- country
- city
- amount

-> Checker ID

POST /submit-check
 
Body:
- checker id
- promo code


