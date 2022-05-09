import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../context/user'
import BookmarkCard from '../../components/customer_components/BookmarkCard'
import Container from 'react-bootstrap/Container'

function BookmarkedPets({ user }) {
    // const { user } = useContext(UserContext)
    const [bookmarks, setBookmarks] = useState([])

    useEffect(() => {
        fetch('/bookmarks').then(r => {
            if (r.ok) {
                r.json().then(bookmarks => setBookmarks(bookmarks))
            }
        })
    }, [])

    function removeBookmark(deletedBookmark) {
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== deletedBookmark.id)
        setBookmarks(updatedBookmarks)
    }
    
    const bookmarkedPetCards = () => {
        if (bookmarks.length > 0) {
            return bookmarks.map(bookmark => <BookmarkCard user={user} key={bookmark.id} pet={bookmark.pet} bookmark={bookmark} removeBookmark={removeBookmark}/>)
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