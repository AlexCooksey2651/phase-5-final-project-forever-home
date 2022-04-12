import React from 'react'

const SignupForm = () => {
    return (
        <Form>
            <div className="mb-3">
                <Form.Check
                    type="radio"
                    id="customer-radio"
                    label="Sign Up As Customer"
                />

                <Form.Check
                    type="radio"
                    label="Sign Up As Shelter"
                    id="shelter-radio"
                />
            </div>
        </Form>
    )
}

export default SignupForm