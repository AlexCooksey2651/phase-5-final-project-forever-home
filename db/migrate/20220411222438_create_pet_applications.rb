class CreatePetApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :pet_applications do |t|
      t.integer :customer_id
      t.integer :pet_id
      t.date :date
      t.text :customer_text

      t.timestamps
    end
  end
end
