import React from 'react'

function LoginForm() {
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

export default LoginForm