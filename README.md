<div align="center">
  <img src="https://safe.manu.moe/tWCXrnit.gif" width="500"/>
  <br/>
  <h3>goflink discount checker</h3>
  <p><strong>goflink aka flink discount checker app with city provided check and amount</strong></p>
  <br><br>
  <img src="https://forthebadge.com/images/badges/made-with-vue.svg" height="30" />
  <img src="https://forthebadge.com/images/badges/made-with-typescript.svg" height="30" />
  <br/><br/>
  <a href="https://github.com/rexlManu/goflink-discount-checker/blob/master/LICENSE.md"><img src="https://img.shields.io/docker/cloud/build/rexlmanu/goflink-discount-checker?style=for-the-badge" height="30"></a>
  <a href="https://github.com/rexlManu/goflink-discount-checker/blob/master/LICENSE.md"><img src="https://img.shields.io/apm/l/vim-mode?style=for-the-badge" height="30"></a>
</div>

## Update

Hey, I'm going to put the project on hold, since I'm doing so called "bruteforce" attacks with the tool in the meantime, since I'm using proxies to dodge the RateLimit. I don't want to get legal action for denial of services.

## Links

- You can find flink codes [here](./CODES.md).
- Flink api endpoint docs [here](./API.md).
- Frontend [here](./front/README.md).

## Setup

### Docker

1. Build the image
   `docker build -t discount-checker .`
2. Run the image
   `docker run -d --name discount-checker discount-checker`

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
