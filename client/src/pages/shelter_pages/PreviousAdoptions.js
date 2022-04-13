import React from 'react'
import PreviousAdoptionCard from '../../components/shelter_components/PreviousAdoptionCard'

const PreviousAdoptions = () => {
  return (
    <div id="previous-adoptions">
        <h2>Previous Adoptions</h2>
        <PreviousAdoptionCard />
    </div>
  )
}

export default PreviousAdoptions

// FETCH SHELTERS ANIMALS, FILTER OUT AND ONLY RENDER IF ADOPTION STATUS = ADOPTED
// RENDER THOSE ANIMAL CARDS
// SHOW ASSOCIATED OWNER INFO, IF POSSIBLE ALSO ADOPTION DATE
// 