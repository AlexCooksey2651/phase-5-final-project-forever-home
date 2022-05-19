class PetSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :image_file, :image_url, :bio, :species, :age, :age_unit, :adoption_status, :adoption_date

  has_many :pet_applications
  has_many :customers, through: :pet_applications
  has_many :bookmarks
  has_many :customers, through: :bookmarks
  belongs_to :shelter

  def image_url
    rails_blob_path(object.image_file, disposition: "attachment", only_path: true) if object.image_file.attached?
  end
end
