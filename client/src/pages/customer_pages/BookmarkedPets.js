import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/user'
import PetCard from '../../components/PetCard'
import Container from 'react-bootstrap/Container'

// const bookmarks = [{
//     id: 1,
//     pet: {
//         id: 1,
//         name: "Sparky",
//         image: "https://post.healthline.com/wp-content/uploads/2020/08/3180-Pug_green_grass-732x549-thumbnail-732x549.jpg",
//         bio: "Sparky is a 2-year old Pug. He weighs 19lbs. He loves cuddles and sleeps a lot, but is feisty if you take him on walks. He'll make you very happy!",
//         age: 2,
//         ageUnit: "years",
//         species: "Dog",
//         status: "Application Pending",
//         shelter: {
//             name: "Awesome Dogs and Cats",
//             bio: "We carry lots of Cats and Dogs in NYC",
//             user: {
//                 email: "acooksey.hp@gmail.com",
//                 password: "hello",
//                 city: "New York City",
//                 state: "NY",
//                 phone_number: "+13148829097",
//                 profile_type: "shelter",
//             }
//         }
//     },
//     customer: {
//         first_name: "Alex",
//         last_name: "Cooksey",
//         interested_in: ["Dog", "Cat", "Bird"],
//         user: {
//             email: "aecooksey2651@gmail.com",
//             password: "hello",
//             city: "Jersey City",
//             state: "NJ",
//             phone_number: "+17203018361",
//             profile_type: "customer",
//         },
//     },
// }]

function BookmarkedPets() {
    const { user } = useContext(UserContext)
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        fetch('/bookmarks').then(r => {
            if (r.ok) {
                r.json().then(bookmarks => setBookmarks(bookmarks))
            }
        })
    }, [])


    
    const bookmarkedPetCards = () => {
        if (bookmarks.length > 0) {
            return bookmarks.map(bookmark => <PetCard user={user} key={bookmark.id} pet={bookmark.pet} />)
        } else {
            return (
                <>
                    <h2><em>You have not bookmarked any pets</em></h2>
                    <p>Pop over to the Search page!</p>
                </>
            )
        }
    }

    return (
    <Container id="bookmarked-pets-container">
        <br/>
        <h2>Bookmarked Pets</h2>
        <br/>
        {bookmarkedPetCards()}
    </Container>
  )
}

export default BookmarkedPets