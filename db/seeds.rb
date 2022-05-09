require 'faker'

statuses = ["Approved", "Pending", "We're sorry, but your application has been denied"]
species = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]
age_units = ["Weeks", "Months", "Years"]

s1 = Shelter.create(name: "Petco", bio: "We carry all sorts of animals right in the heart of New York City at Union Square", user_attributes: { email: "petco@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+10123456789", city: "New York City", state: "NY"})

s2 = Shelter.create(name: "Petsmart", bio: "We carry mostly dogs and cats, but also some birds", user_attributes: { email: "petsmart@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+11234567890", city: "Philadelphia", state: "PA"})

s3 = Shelter.create(name: "See Spot Rescued", bio: "We help find wonderful homes for dogs - mostly pitbulls and pitbull-mixes - in Jersey City and Hoboken, NJ", user_attributes: { email: "seespotrescued@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+12345678901", city: "Jersey City", state: "NJ"})

s4 = Shelter.create(name: "Scales and Claws", bio: "A lot of people abandon wonderful reptiles, amphibians, and fish once they get too big - we're here to help these pets find new, loving homes. We're based in Fort Lauderdale, FL.", user_attributes: { email: "scalesclaws@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+13456789012", city: "Fort Lauderdale", state: "FL"})

s5 = Shelter.create(name: "Rocky Mountain Rescue", bio: "Based in Littleton, CO, we help people find their new best friends.", user_attributes: { email: "rockymtnrescue@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+10123456789", city: "Littleton", state: "CO"})

Shelter.all.each do |shelter|
    10.times do
        shelter.pets.create(
            name: Faker::Creature::Dog.name,
            species: species.sample,
            bio: "I am a great pet!",
            age: rand(1..11),
            age_unit: age_units.sample,
            adoption_status: "Available"
        )
    end
end

c1 = Customer.create(first_name: "Bob", last_name: "Smith", interested_in: ["Bird", "Reptile/Amphibian", "Fish"], user_attributes: { email: "besmith2651@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+1555123456", city: "Littleton", state: "CO"})

c2 = Customer.create(first_name: "Alex", last_name: "Smith", interested_in: ["Dog", "Cat", "Bird"], user_attributes: { email: "aesmith2651@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+15553018361", city: "Jersey City", state: "NJ"})

c3 = Customer.create(first_name: "Charlie", last_name: "Smith", interested_in: ["Dog", "Cat", "Other Mammal", "Reptile/Amphibian", "Bird", "Fish"], user_attributes: { email: "cesmith2651@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+1555234567", city: "Brooklyn", state: "NY"})

c4 = Customer.create(first_name: "Alana", last_name: "Smith", interested_in: ["Cat", "Other Mammal"], user_attributes: { email: "aksmith2651@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+15553015802", city: "West Palm Beach", state: "FL"})

c5 = Customer.create(first_name: "Jane", last_name: "Smith", interested_in: ["Dog"], user_attributes: { email: "jtsmith2651@gmail.com", password: "ilovefood", password_confirmation: "ilovefood", phone_number: "+15553015802", city: "Pittsburgh", state: "PA"})

Customer.all.each do |customer|
    2.times do
        customer.pet_applications.create(
            pet_id: Pet.all.sample.id,
            date: Faker::Date.between(from: '2019-01-01', to: Date.today),
            status: statuses.sample,
            customer_text: "I'll provide a great forever home!"
        )
    end

    4.times do
        customer.bookmarks.create(
            pet_id: Pet.all.sample.id
        )
    end
end
