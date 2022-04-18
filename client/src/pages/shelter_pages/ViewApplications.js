import React from 'react'
import ShelterApplicationCard from "../../components/shelter_components/ShelterApplicationCard"

const applications = [{
    id: 1,
    pet: {
        id: 1,
        name: "Sparky",
        image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
        bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
        age: 2,
        ageUnit: "years",
        species: "Dog",
        status: "Adoption Pending",
        shelter: {
            name: "Awesome Dogs and Cats",
            bio: "We carry lots of Cats and Dogs in NYC",
            user: {
                email: "acooksey.hp@gmail.com",
                password: "hello",
                city: "New York City",
                state: "NY",
                phone_number: "+13148829097",
                profile_type: "shelter",
            }
        }
    },
    customer: {
        first_name: "Alex",
        last_name: "Cooksey",
        interested_in: ["Dog", "Cat", "Bird"],
        user: {
            email: "aecooksey2651@gmail.com",
            password: "hello",
            city: "Jersey City",
            state: "NJ",
            phone_number: "+17203018361",
            profile_type: "customer",
        },
    },
    date: "March 22, 2022",
    customer_text: "I'll be a great pug dad!"
}]



function ViewApplications() {
    
    const shelterApplicationCards = applications.map(application => {
        return <ShelterApplicationCard 
            key={application.id} 
            application={application} 
            handleUpdateApplication={handleUpdateApplication}
            />
    })
    
    return (
        <div id="active-applications">
            <h2>Active Applications</h2>
            <br />
            {shelterApplicationCards}
        </div>
    )
}

export default ViewApplications

