const formatCurrency = (value) => {
    return parseInt(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

export default formatCurrency;
