import {
    AsyncStorage
} from 'react-native';

const LocalStore = {
    getValue(key) {
        return new Promise(resolve => {
            try {
                AsyncStorage.getItem(key)
                    .then(value => {
                        if(!!value){
                            value = JSON.parse(value)
                            resolve(value);
                        }else{
                            resolve(null)
                        }
                    })
                    .catch(e => [
                        resolve(undefined)
                    ])
            }catch(e){
                resolve(undefined)
            }
        })
    },

    setValue(key, value) {
        return new Promise(resolve => {
            try {
                value = JSON.stringify(value);
                AsyncStorage.setItem(key, value)
                    .then(res => {
                        resolve(true)
                    })
                    .catch(e => {
                        resolve(false)
                    })
            }catch(e){
                resolve(false)
            }
        })
    },

    deleteValue(key) {
        return new Promise(resolve => {
            try{
                this.getValue(key)
                    .then(value => {
                        if(!!value){
                            AsyncStorage.removeItem(key)
                            .then(res => {
                                resolve(true)
                            })
                            .catch(e => {
                                resolve(false)
                            })
                        }else{
                            resolve(true)
                        }
                    })
                    .catch(e => {
                        resolve(false);
                    })
            }catch(e){
                resolve(false)
            }
        })
    }
    
};

export default LocalStore;