import React, { useState, useEffect } from 'react'
import PreviousAdoptionCard from '../../components/shelter_components/PreviousAdoptionCard'
import { Container } from 'react-bootstrap'

// const previousAdoptions = [{
//     id: 2,
//     name: "Fido",
//     image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//     bio: "Fido is a 2-year old Pug. He weighs 23lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//     age: 6,
//     species: "Dog",
//     status: "Adopted",
//     adoptionDate: "April 12, 2022",
//     application: {
//         customer: {
//             first_name: "Alex",
//             last_name: "Cooksey",
//             interested_in: ["dog", "cat", "bird"],
//             user: {
//                 email: "aecooksey2651@gmail.com",
//                 password: "pugsaregreat",
//                 phone_number: "(720) 301-8361"
//             },
//         },
//     }
// }]

function PreviousAdoptions({ user }) {
    const [previousAdoptions, setPreviousAdoptions] = useState([])

    useEffect(() => {
        fetch('/adopted-pets').then(r => {
            if (r.ok) {
                r.json().then(pets => setPreviousAdoptions(pets))
            }
        })
    }, [])


    const previousAdoptionCards = () => {
        if (previousAdoptions.length > 0) {
            return previousAdoptions.map(pet => <PreviousAdoptionCard key={pet.id} pet={pet} user={user}/>)
        } else {
            return (
                <>
                    <h2><em>No pets have been adopted from your shelter just yet!</em></h2>
                    <p>Head over to the "Applications" page to see if anyone has applied to adopt one of your pets!</p>
                </>
            )
        }
    }

    return (
        <Container id="previous-adoptions">
            <br />
            <h2>Previous Adoptions</h2>
            <br />
            {previousAdoptionCards()}
        </Container>
    )
}

export default PreviousAdoptions