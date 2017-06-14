import FormulaMap from '../FormulaMap';

class CalculatorDto {

    static exchangeMap = {};

    static convertToCurrency(amount, currencyFrom, currencyTo) {
        const exchangeRateCurrencyFrom = CalculatorDto.exchangeMap[currencyFrom];
        const exchangeRateCurrencyTo = CalculatorDto.exchangeMap[currencyTo];
        return (amount && currencyFrom !== currencyTo && exchangeRateCurrencyFrom && exchangeRateCurrencyTo) ?
            (exchangeRateCurrencyFrom.value / exchangeRateCurrencyFrom.amount * amount / exchangeRateCurrencyTo.value * exchangeRateCurrencyTo.amount) : amount;
    };

    constructor(input = {}) {
        this._id = input.id;
        this._country = input.country;
        this._region = input.region;
        this._type = input.type;
        this._period = input.period;
        this._currency = input.currency;
    };

    set id(id) {
        this._id = id;
    };

    set country(country) {
        this._country = country;
        this._region = undefined;
        this._type = undefined;
        this._period = undefined;
        this._dependencyMap = undefined;
        this._measureMap = undefined;
    };

    set region(region) {
        this._region = region;
        this._type = undefined;
        this._period = undefined;
        this._dependencyMap = undefined;
        this._measureMap = undefined;
    };

    set type(type) {
        this._type = type;
        this._period = undefined;
        this._dependencyMap = undefined;
        this._measureMap = undefined;
    };

    set period(period) {
        this._period = period;
        this._dependencyMap = undefined;
        this._measureMap = undefined;
        this._currency = this._currency || this.defaultCurrency;
    };

    set currency(currency) {
        this._currency = currency;
    };

    get id() {
        return this._id;
    };

    get country() {
        return this._country;
    };

    get region() {
        return this._region;
    };

    get type() {
        return this._type;
    };

    get period() {
        return this._period;
    };

    get currency() {
        return this._currency;
    };

    get countryList() {
        return Object.keys(FormulaMap) || [];
    };

    get regionList() {
        return this.country ? Object.keys(FormulaMap[this.country]) : [];
    };

    get typeList() {
        return this.region ? Object.keys(FormulaMap[this.country][this.region]) : [];
    };

    get periodList() {
        return this.type ? Object.keys(FormulaMap[this.country][this.region][this.type]) : [];
    };

    get dependencyMap() {
        if (!this._dependencyMap && this.country && this.region && this.type && this.period) {
            this._dependencyMap = FormulaMap[this.country][this.region][this.type][this.period].dependencyMap;
        }
        return this._dependencyMap;

    };

    get measureMap() {
        if (!this._measureMap && this.dependencyMap) {
            this._measureMap = {};
            for (const key in this.dependencyMap) {
                this._measureMap[key] = undefined;
            }
            return this._measureMap;
        } else {
            return this._measureMap || {}
        }
    };

    get defaultCurrency() {
        return (this.country && this.region && this.type && this.period) ?
            FormulaMap[this.country][this.region][this.type][this.period].currency : undefined;
    };

    calculate = (measureName, measureValue) => {
        const valueToCalculate = CalculatorDto.convertToCurrency(measureValue, this.currency, this.defaultCurrency);
        this.measureMap[measureName] = Math.round(measureValue);
        Object.keys(this.dependencyMap[measureName]).forEach((dependency) => {
            this.measureMap[dependency] = Math.round(CalculatorDto.convertToCurrency(this.dependencyMap[measureName][dependency](valueToCalculate), this.defaultCurrency, this.currency));
        });
    };

    deserialize(input = {}) {
        this._id = input._id;
        this._country = input._country;
        this._region = input._region;
        this._type = input._type;
        this._period = input._period;
        this._currency = input._currency;
        this._measureMap = {} ? undefined : input._measureMap;
        return this;
    };
}

export default CalculatorDto;