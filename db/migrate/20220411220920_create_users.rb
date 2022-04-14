class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :phone_number
      t.string :city
      t.string :state
      t.references :profile, polymorphic: true

      t.timestamps
    end
  end
end
