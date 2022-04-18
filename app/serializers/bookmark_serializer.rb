class BookmarkSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :pet
  belongs_to :customer
end
