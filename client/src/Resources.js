import React from 'react';

const formatPhoneNum = (phoneNumber) => {
    const arrayedNum = phoneNumber.split('')
    const firstThree = arrayedNum.slice(2, 5).join('')
    const secondThree = arrayedNum.slice(5, 8).join('')
    const lastFour = arrayedNum.slice(-4).join('')
    const newNumStr = `(${firstThree}) ${secondThree}-${lastFour}`
    return newNumStr
}

const allPets = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]

const stateAbbreviations = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']

const stateOptions = stateAbbreviations.map(state => {
    return <option key={state} value={state}>{state}</option>
})

const isCustomer = (user) => {
    if (user.profile.type === "customer") {
        return true
    } else if (user.profile.type === "shelter") {
        return false
    }
}

function cleanupDate(date) {
    const year = date.substr(0, 4)
    const month = date.substr(5, 2)
    const day = date.substr(8, 2)
    return `${month}/${day}/${year}`
}

export { formatPhoneNum, allPets, stateOptions, isCustomer, cleanupDate }











