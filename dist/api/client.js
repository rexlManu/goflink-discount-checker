"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlinkClient = void 0;
const got_1 = require("got");
const source_1 = __importDefault(require("got/dist/source"));
const URL = 'https://consumer-api.goflink.com/v1';
const USER_AGENT = 'Flink/1.0.0 (Client)';
const LOCALE = 'de-DE';
class FlinkClient {
    currentHub;
    constructor() { }
    setCurrentHub(hub) {
        this.currentHub = hub;
    }
    createCart(createCart) {
        return this.request('cart', 'post', createCart);
    }
    hubs(coordination) {
        return this.request('locations/hub', 'get', {
            lat: coordination.latitude,
            long: coordination.longitude,
        });
    }
    products() {
        return this.request('products', 'get');
    }
    addPromoCode(cartId, code) {
        return this.request(`cart/${cartId}/add-promo-code`, 'post', {
            voucher_code: code,
        });
    }
    async request(endpoint, method, data = {}) {
        try {
            const response = await (0, source_1.default)(this.formatUrl(endpoint), {
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
            return response.body;
        }
        catch (e) {
            if (e instanceof got_1.HTTPError) {
                return e.response.body;
            }
            throw e;
        }
    }
    formatUrl(endpoint) {
        return `${URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    }
}
exports.FlinkClient = FlinkClient;
