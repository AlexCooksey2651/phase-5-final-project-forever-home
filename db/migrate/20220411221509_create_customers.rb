class CreateCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.text :interested_in, array: true, default: []

      t.timestamps
    end
  end
end
