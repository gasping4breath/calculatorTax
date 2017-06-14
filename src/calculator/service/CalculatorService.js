import CalculatorDto from '../dto/CalculatorDto';

const CalculatorService = {

    LOCAL_STORAGE_CALCULATOR_LIST: 'calculator_list',

    getCalculatorList: () => {
        return (JSON.parse(localStorage.getItem(CalculatorService.LOCAL_STORAGE_CALCULATOR_LIST)) || []).map((object) => (new CalculatorDto()).deserialize(object));
    },

    setCalculatorList: (calculatorList) => {
        localStorage.setItem(CalculatorService.LOCAL_STORAGE_CALCULATOR_LIST, JSON.stringify(calculatorList));
    },

    removeCalculatorList: () => {
        localStorage.removeItem(CalculatorService.LOCAL_STORAGE_CALCULATOR_LIST);
    }
};

export default CalculatorService;