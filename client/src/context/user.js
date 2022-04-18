import React, { useState } from "react";

const exampleCustomerUser = {
    email: "aecooksey2651@gmail.com",
    password: "hello",
    city: "Jersey City",
    state: "NJ",
    phone_number: "+17203018361",
    profile_type: "customer",
    profile: {
        first_name: "Alex",
        last_name: "Cooksey",
        interested_in: ["Dog", "Cat", "Bird"]
    }
}

const exampleShelterUser = {
    email: "acooksey.hp@gmail.com",
    password: "hello",
    city: "New York City",
    state: "NY",
    phone_number: "+13148829097",
    profile_type: "shelter",
    profile: {
        name: "Awesome Dogs and Cats",
        bio: "We carry lots of Cats and Dogs in NYC"
    }
}
// create the context
const UserContext = React.createContext();

// create a provider component
function UserProvider({ children }) {
    const [user, setUser] = useState(exampleCustomerUser)
    // the value prop of the provider will be our context data
    // this value will be available to child components of this provider
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };