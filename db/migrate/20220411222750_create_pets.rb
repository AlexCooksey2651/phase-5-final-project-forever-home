class CreatePets < ActiveRecord::Migration[6.1]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :image
      t.text :bio
      t.string :species
      t.integer :age
      t.integer :shelter_id
      t.string :adoption_status
      t.date :adoption_date

      t.timestamps
    end
  end
end
