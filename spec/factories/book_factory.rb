FactoryBot.define do
  factory :book do
    title { Faker::Book.title }
    author { Faker::Book.author }
    review { Faker::Lorem.paragraphs(number: rand(1..3)) }
  end
end
