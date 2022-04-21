class BookmarkSerializer < ActiveModel::Serializer
  attributes :id, :pet

  belongs_to :pet
  belongs_to :customer
end
