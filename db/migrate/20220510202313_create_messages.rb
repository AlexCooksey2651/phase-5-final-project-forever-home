class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :sender
      t.integer :customer_id
      t.integer :shelter_id
      t.string :pet_name
      t.text :message_text

      t.timestamps
    end
  end
end
