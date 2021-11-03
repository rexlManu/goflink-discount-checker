import { HTTPError } from 'got';
import got from 'got/dist/source';
import { body } from 'express-validator';

const URL = 'https://consumer-api.goflink.com/v1';
const USER_AGENT = 'Flink/1.0.0 (Client)';
const LOCALE = 'de-DE';

export interface CreateCart {
  billing_address: Address;
  delivery_coordinates: Coordinate;
  delivery_eta: string;
  lines: Line[];
  email: string;
  shipping_address: Address;
}

export interface Address {
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  phone: string;
  postal_code: string;
  street_address_1: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Line {
  product_sku: string;
  quantity: number;
}

export interface Hub {
  slug: string;
  city: string;
  city_name: string;
  country: string;
  shop_url: string;
  shop_token: string;
  id: string;
  coordinates: Coordinate;
  onfleet_team_id: string;
  shipping_method: string;
  turfs: Array<Coordinate[]>;
  details: Details;
  capability: Capability;
  resolved_address: string;
  is_default_hub: boolean;
}

export interface Capability {
  adyen: boolean;
  use_commercetools: boolean;
}

export interface Details {
  is_closed: boolean;
  closing: string;
  closed_days: string[];
  frequently_searched: string[];
  minimum_order_value: MinimumOrderValue;
  opening: string;
  shipping_fee: MinimumOrderValue;
  intercom_number: string;
  closed_message: string;
}

export interface MinimumOrderValue {
  currency: string;
  amount: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category_id: string;
  slug: string;
  sku: string;
  variant_id: string;
  quantity: number;
  price: Price;
  thumbnail: string;
  images: string[];
  labels: null;
  tags: string[];
  synonyms: string[];
  pfand: string;
  max_single_order_quantity: string;
  base_price: Price;
  base_unit: BaseUnit;
  allergens: string[];
  categories: string[];
  nutritions: string[];
  ingredients: string[];
  producer: string;
  country_of_origin: string;
  preparation_and_storage: string;
}

export interface Price {
  currency: string;
  amount: number;
}

export interface BaseUnit {
  unit: string;
  amount: number;
}

export class FlinkClient {
  public currentHub?: Hub;
  constructor() {}

  setCurrentHub(hub: Hub) {
    this.currentHub = hub;
  }

  createCart(createCart: CreateCart) {
    return this.request('cart', 'post', createCart);
  }

  hubs(coordination: Coordinate) {
    return this.request<Hub>('locations/hub', 'get', {
      lat: coordination.latitude,
      long: coordination.longitude,
    });
  }

  products() {
    return this.request<Product[]>('products', 'get');
  }

  addPromoCode(cartId: string, code: string) {
    return this.request(`cart/${cartId}/add-promo-code`, 'post', {
      voucher_code: code,
    });
  }

  async request<T>(
    endpoint: string,
    method: 'post' | 'get',
    data: any = {}
  ): Promise<T> {
    try {
      const response = await got(this.formatUrl(endpoint), {
        responseType: 'json',
        headers: {
          'User-Agent': USER_AGENT,
          locale: LOCALE,
          hub: this.currentHub?.id || undefined,
          'hub-slug': this.currentHub?.slug || undefined,
        },
        method,
        [method == 'post' ? 'json' : 'searchParams']: data,
      });
      return response.body as T;
    } catch (e) {
      if (e instanceof HTTPError) {
        return (e as any).response.body;
      }

      throw e;
    }
  }

  formatUrl(endpoint: string) {
    return `${URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  }
}
