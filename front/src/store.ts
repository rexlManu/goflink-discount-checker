import { reactive } from 'vue';
const LOCALSTORAGE_KEY = 'data';
export type Status = 'pending' | 'success' | 'inactive' | 'money';
export interface Checker {
  city: string;
  amount: number;
  checkerId: string;
  codes: Promocode[];
}
export interface Promocode {
  code: string;
  status: Status;
  discount?: number;
}
const store = {
  state: reactive({
    checkers: [] as Checker[],
    filters: [] as Status[],
    settings: {
      interval: 200,
      checkersPerWork: 1,
    },
  }),
  load() {
    const item = localStorage.getItem(LOCALSTORAGE_KEY);
    const settings = localStorage.getItem('settings');
    const filters = localStorage.getItem('filters');

    if (item) this.state.checkers = JSON.parse(item);
    if (settings) this.state.settings = JSON.parse(settings);
    if (filters) this.state.filters = JSON.parse(filters);

    console.log(`Loaded ${this.state.checkers.length} checkers`);
  },
  save() {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.state.checkers));
    localStorage.setItem('settings', JSON.stringify(this.state.settings));
    localStorage.setItem('filters', JSON.stringify(this.state.filters));
  },
  clear() {
    localStorage.removeItem(LOCALSTORAGE_KEY);
    localStorage.removeItem('settings');
    localStorage.removeItem('filters');

    this.state.checkers = [];
    this.state.filters = [];
    this.state.settings = {
      checkersPerWork: 1,
      interval: 200,
    };
  },
  addChecker(checker: Checker) {
    this.state.checkers.push(checker);

    this.save();
  },
  removeChecker(checker: Checker) {
    this.state.checkers = this.state.checkers.filter((c) => c != checker);
    this.save();
  },
};

store.load();

export { store };
