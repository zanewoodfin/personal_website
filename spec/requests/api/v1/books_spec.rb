require "rails_helper"

RSpec.describe "Api::V1::Books", type: :request do
  let(:relative_path) { "" }
  let(:path) { "/api/v1/books#{relative_path}" }

  describe "GET /books" do
    let!(:book1) { create :book, title: "A", author: "B", review: "" }
    let!(:book2) { create :book, title: "X", author: "Y", review: "Z" }

    before { get path }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns the books" do
      book1_time = book1.created_at.as_json
      book2_time = book2.created_at.as_json
      book1_irrelevant_data = { created_at: book1_time, updated_at: book1_time, id: book1.id }
      book2_irrelevant_data = { created_at: book2_time, updated_at: book2_time, id: book2.id }

      expect(response.parsed_body).to contain_exactly(
        { title: "A", author: "B", review: nil }.merge(book1_irrelevant_data),
        { title: "X", author: "Y", review: "Z" }.merge(book2_irrelevant_data)
      )
    end
  end

  describe "POST /books" do
    let(:body) do
      {
        book: {
          title: "The Book",
          author: "Kilgore Trout",
          review: "Pretty good."
        }
      }
    end

    before { post path, params: body }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "creates the book" do
      created_book = Book.first
      expect(created_book).to have_attributes(
        title: "The Book",
        author: "Kilgore Trout",
        review: "Pretty good."
      )
    end
  end

  describe "GET /books/:id" do
    let!(:book) { create :book, title: "The Book", author: "Kilgore Trout", review: "Not bad." }
    let(:relative_path) { "/#{book.id}" }

    before { get path }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns the book" do
      expect(response.parsed_body).to include(
        "title" => "The Book",
        "author" => "Kilgore Trout",
        "review" => "Not bad."
      )
    end
  end

  describe "DELETE /books/:id" do
    let(:book) { create :book }
    let(:relative_path) { "/#{book.id}" }

    before { delete path }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "deletes the book" do
      expect { Book.find(book.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  describe "PUT /books/:id" do
    let(:book) { create :book, title: "A Book" }
    let(:relative_path) { "/#{book.id}" }
    let(:body) do
      {
        book: {
          title: "An Updated Book"
        }
      }
    end

    before { put path, params: body }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "updates the book" do
      updated_book = Book.find(book.id)
      expect(updated_book.title).to eq("An Updated Book")
    end
  end
end
