class Product < ApplicationRecord
  mount_uploader :image, ImageUploader
  has_many :photos
  accepts_nested_attributes_for :photos
  belongs_to :category
  validates :category_id, presence: true
  belongs_to :user
  has_many :favorites
  has_many :fans, through: :favorites, source: :user
  has_many :votes, dependent: :destroy
  has_many :posts

  ratyrate_rateable "speed", "engine", "price"
end
