import React from 'react'
import Container from 'react-bootstrap/Container'
import { isCustomer } from '../Resources'

function Home({ user }) {

    return (
        <Container id="about">
            <br/>
            <Container id="home-text">
                <h2 className="about-header">About <em>Forever Home</em></h2>
                <br />
                <p className="about-text">
                    Around the United States, millions of loving animals spend their lives bouncing between adoption shelters and foster homes. Shelters often rely on patient, compassionate volunteers, but are often over-crowded, under-funded, and under-staffed. Simply caring for the animals is already plenty to handle, often making it difficult to manage to customer outreach. Many interested potential owners are out there, hoping to provide loving homes, but it's not always easy to find the right companion.
                </p>
                <p className="about-text">
                    <em>Forever Home</em> is here to help! Our mission is to help connect adoption agencies with interested customers; we want to help more pets spend long, happy lives while bringing joy to loving families.
                </p>
                <br />
                <h2 className="about-header">New to Forever Home? Start Here!</h2>
                <br />
                {isCustomer(user) ?
                    <div className="about-text">
                        <p>
                            Here to look for a new best friend? If you're interested in adopting a pet (or pets!), please navigate to the SEARCH page. There, you'll be able to browse animals that match what you're looking for. Use the search bar to look up an animal by name, or search for matching information in their bio.
                        </p>
                        <p>
                            If you are interested in a pet, you can bookmark them to easily view again on the Bookmarked Pets page. You can also click the dropdown to view contact information for their shelter and send an email form.
                        </p>
                        <p>
                            Ready to take the next step toward being a pet parent? Submit an adoption application directly through the animal's information page. You can manage your applications on the My Applications page.
                        </p>
                    </div> : <div className="about-text">
                        <p>
                            If you've signed up as a registered pet adoption agency, please visit the "Manage Pets" page, where you can upload details for any animals you are currently caring for. Once submitted, you'll be able to view the information for each animal listing, monitor their adoption status, or edit the listing as needed.
                        </p>
                        <p>
                            Navigate to the View Applications page to manage any applications that have been submitted to animals at your shelter. Pending applications can be approved or denied, and you can also view previous applications that have been denied, should you wish to reach out to former applicants.
                        </p>
                        <p>
                            Finally, you can visit the Previous Adoptions page to view information about animals that have been adopted from your shelter in the past. We encourage you to stay in contact with their new owners!
                        </p>
                    </div>
                }
            </Container>
        </Container >
    )
}

export default Home;