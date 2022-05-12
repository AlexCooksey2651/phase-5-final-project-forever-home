class AddColumnToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :recovery_password_digest, :string
  end
end
