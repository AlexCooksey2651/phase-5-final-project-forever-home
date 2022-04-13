import React from 'react'
import Container from 'react-bootstrap/Container'

const Header = () => {
  return (
    <Container className="app-header">
        <span>
            <img className="header-image" src="https://image.shutterstock.com/image-photo/large-collection-domestic-pets-interacting-260nw-358022486.jpg" />
        </span>
    </Container>
  )
}

export default Header