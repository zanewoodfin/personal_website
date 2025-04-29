class Book < ApplicationRecord
  normalizes :title, :author, :review, with: BLANK_NORMALIZER

  validates :title, presence: true
  validates :author, presence: true
end
