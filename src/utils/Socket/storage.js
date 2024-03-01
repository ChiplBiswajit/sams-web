// Import is not required for localStorage in web

export const storeStringByKey = (key, value) => {
   
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // Handle error if needed
    }
}

export const storeObjByKey = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // Handle error if needed
    }
}

export const getStringByKey = (keyName) => {
    try {
        const value = localStorage.getItem(keyName);
        return value !== null ? value : null;
    } catch (e) {
        // Handle error if needed
    }
}

export const getObjByKey = (keyName) => {
    try {
        const jsonValue = localStorage.getItem(keyName);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // Handle error if needed
    }
}

export const deleteByKeys = (keys) => {
    // keys must be an array
    try {
        keys.forEach((key) => {
            localStorage.removeItem(key);
        });
    } catch (e) {
        // Handle error if needed
    }
}

export const clearAll = () => {
    try {
        localStorage.clear();
    } catch (e) {
        // Handle error if needed
    }
}
