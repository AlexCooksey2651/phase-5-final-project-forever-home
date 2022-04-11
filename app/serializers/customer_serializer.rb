class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :interested_in
end
