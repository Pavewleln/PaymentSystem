export function validator(data, config, myCardSum, recipientCardId) {
    const errors = {};

    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+$/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "isContainDigitDot": {
                const digitRegExp = /^\d+\.\d+$/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            case "undefinedRecipient": {
                statusValidate = !recipientCardId.length;
                break;
            }
            case "limitMoney": {
                statusValidate = Number(myCardSum) <= Number(data);
                break;
            }
            case "isMoney": {
                statusValidate = Number(data) === 0;
                break;
            }
            case "isMaxLength": {
                statusValidate = myCardSum.join(' ').length < data.length -3
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
