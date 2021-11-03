# Discount checker for flink

goflink aka flink discount checker app with city provided check and amount

- You can find flink codes [here](./CODES.md).
- Flink api endpoint docs [here](./API.md).
- Frontend [here](./front/README.md).

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


