const CurrencyService = {

    CNB_ENDPOINT: 'cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt?date',

    fetchCurrencyMap: async(endpoint = CurrencyService.CNB_ENDPOINT) => {
        const response = await fetch(endpoint, {method: 'get'});
        const currencyMap = {};

        let text;
        if (response.status === 200) {
            text = await response.text();
        } else {
            throw Error('Response status is not OK');
        }
        text.trim().split('\n').slice(2).forEach((line) => {
            const lineList = line.split('|');
            currencyMap[lineList[3]] = {amount: parseInt(lineList[2], 10), value: parseFloat(lineList[4])};
        });
        currencyMap['CZK'] = {amount: '1', value: '1'};
        return currencyMap;

    }
};

export default CurrencyService;