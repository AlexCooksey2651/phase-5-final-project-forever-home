import React from 'react'
import PreviousAdoptionCard from '../../components/shelter_components/PreviousAdoptionCard'



function PreviousAdoptions() {
    const previousAdoptions = [{
        id: 2,
        name: "Fido",
        image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
        bio: "Fido is a 2-year old Pug. He weighs 23lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
        age: 6,
        species: "Dog",
        status: "Adopted",
        adoptionDate: "April 12, 2022",
        application: {
            customer: {
                first_name: "Alex",
                last_name: "Cooksey",
                interested_in: ["dog", "cat", "bird"],
                user: {
                    email: "aecooksey2651@gmail.com",
                    password: "pugsaregreat",
                    phone_number: "(720) 301-8361"
                },
            },
        }
    }]

    const previousAdoptionCards = previousAdoptions.map(pet => {
        return <PreviousAdoptionCard key={pet.id} pet={pet} />
    })

    return (
        <div id="previous-adoptions">
            <h2>Previous Adoptions</h2>
            {previousAdoptionCards}
        </div>
    )
}

export default PreviousAdoptions