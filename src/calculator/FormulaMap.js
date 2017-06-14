const FormulaMap = {
    cz: {
        all: {
            'employer': {
                '2017': {
                    currency: 'CZK',
                    dependencyMap: {
                        superGrossWage: {
                            netWage: (superGrossWage) => {
                                superGrossWage = parseInt(superGrossWage, 10);
                                if (!superGrossWage || superGrossWage < 12000) return;
                                const grossWage = superGrossWage / 1.34;
                                const solidarityTax = grossWage > 112928 ? 0.07 : 0;
                                return grossWage - 0.065 * grossWage - 0.045 * grossWage - 0.15 * superGrossWage - 0.15 * superGrossWage * solidarityTax + 2070;
                            },
                            grossWage: (superGrossWage) => {
                                superGrossWage = parseInt(superGrossWage, 10);
                                if (!superGrossWage || superGrossWage < 12000) return;
                                return superGrossWage / 1.34;
                            }
                        },
                        grossWage: {
                            netWage: (grossWage) => {
                                grossWage = parseInt(grossWage, 10);
                                if (!grossWage || grossWage < 10000) return;
                                const superGrossWage = grossWage + 0.25 * grossWage + 0.09 * grossWage;
                                const solidarityTax = grossWage > 112928 ? 0.07 : 0;
                                return grossWage - 0.065 * grossWage - 0.045 * grossWage - 0.15 * superGrossWage - 0.15 * superGrossWage * solidarityTax + 2070;
                            },
                            superGrossWage: (grossWage) => {
                                grossWage = parseInt(grossWage, 10);
                                if (!grossWage || grossWage < 10000) return;
                                return grossWage + 0.25 * grossWage + 0.09 * grossWage;
                            }
                        },
                        netWage: {
                            grossWage: (netWage) => {
                                netWage = parseInt(netWage, 10);
                                if (!netWage || netWage < 8000) return;
                                return (netWage - 2070) / 0.689;
                            },
                            superGrossWage: (netWage) => {
                                netWage = parseInt(netWage, 10);
                                if (!netWage || netWage < 8000) return;
                                const grossWage = (netWage - 2070) / 0.689;
                                return grossWage + 0.25 * grossWage + 0.09 * grossWage;
                            }
                        }
                    }
                },
                '2016': {
                    currency: 'CZK'
                }
            },
            'osvc': {
                '2017': {
                    currency: 'CZK'
                }
            },
        }
    },
    sk: {
        all: {
            'employer': {
                '2017': {
                    currency: 'EUR',
                    dependencyMap: {
                        superGrossWage: {
                            netWage: (superGrossWage) => {
                                superGrossWage = parseInt(superGrossWage, 10);
                                if (!superGrossWage || superGrossWage < 500) return;
                                const grossWage = superGrossWage / 1.352;
                                const tax = ((grossWage - 0.134 * grossWage) * 12 - 3803.33)/12 * 0.19;
                                return grossWage - 0.134 * grossWage - (tax < 0 ? 0 : tax);
                            },
                            grossWage: (superGrossWage) => {
                                superGrossWage = parseInt(superGrossWage, 10);
                                if (!superGrossWage || superGrossWage < 500) return;
                                return superGrossWage / 1.352;
                            }
                        },
                        grossWage: {
                            netWage: (grossWage) => {
                                grossWage = parseInt(grossWage, 10);
                                if (!grossWage || grossWage < 435) return;
                                const tax = ((grossWage - 0.134 * grossWage) * 12 - 3803.33)/12 * 0.19;
                                return grossWage - 0.134 * grossWage - (tax < 0 ? 0 : tax);
                            },
                            superGrossWage: (grossWage) => {
                                grossWage = parseInt(grossWage, 10);
                                if (!grossWage || grossWage < 435) return;
                                return grossWage + 0.352 * grossWage;
                            }
                        },
                        netWage: {
                            grossWage: (netWage) => {
                                netWage = parseInt(netWage, 10);
                                if (!netWage || netWage < 400) return;
                                return (netWage - (0.19 * 3803.33 / 12)) / 0.70146;
                            },
                            superGrossWage: (netWage) => {
                                netWage = parseInt(netWage, 10);
                                if (!netWage || netWage < 400) return;
                                const grossWage = (netWage - (0.19 * 3803.33 / 12)) / 0.70146;
                                return grossWage + 0.352 * grossWage;
                            }
                        }
                    }
                },
                '2016': {
                    currency: 'EUR'
                }
            },
            'osvc': {
                '2017': {
                    currency: 'EUR'
                }
            },
        }
    }
};

export default FormulaMap;