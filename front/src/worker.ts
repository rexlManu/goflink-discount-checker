import { request } from './api';
import { store, Promocode } from './store';

const worker = {
  current: {} as NodeJS.Timer,
  start() {
    this.current = setInterval(this.onWork, store.state.settings.interval);
  },
  stop() {
    clearInterval(this.current);
  },
  onWork() {
    const { checkers } = store.state;
    let checkerCount = 0;
    for (const checker of checkers) {
      if (checkerCount >= store.state.settings.checkersPerWork) break;
      if (!checker.codes.length) continue;
      let index = 0;
      while (true) {
        let c = checker.codes[index];
        if (!c) {
          index = -1;
          break;
        }
        if (c.status != 'pending') {
          index++;
        } else {
          break;
        }
      }
      console.log(index);
      if (index == -1) continue;
      const currentCode = checker.codes[index];

      /*
        {"response":{"total_price":{"currency":"EUR","amount":10.04},"sub_total_price":{"currency":"EUR","amount":20.24},"shipping_price":{"currency":"EUR","amount":1.8},"discount":{"currency":"EUR","amount":12}}}
        */
      request('check', 'post', {
        checkerId: checker.checkerId,
        code: currentCode.code,
      })
        .then((data) => {
          if (!data.response.code && data.response.discount) {
            currentCode.status = 'success';
            currentCode.discount = data.response.discount.amount;
          } else {
            switch (data.response.code) {
              case 'voucher_not_found':
              case 'voucher_not_valid_yet':
                currentCode.status = 'inactive';
                break;
              case 'voucher_min_spent_unreached':
                currentCode.status = 'money';
                break;
            }
          }

          store.save();
        })
        .catch((e) => {
          currentCode.status = 'inactive';
        });

      checkerCount++;
    }
  },
};

export { worker };
