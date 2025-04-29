# == Schema Information
#
# Table name: books
#
#  id         :bigint           not null, primary key
#  author     :string           not null
#  review     :text
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Book < ApplicationRecord
  normalizes :title, :author, :review, with: BLANK_NORMALIZER

  validates :title, presence: true
  validates :author, presence: true
end
