json.extract! book, :id, :title, :author, :review, :created_at, :updated_at
json.url book_url(book, format: :json)
