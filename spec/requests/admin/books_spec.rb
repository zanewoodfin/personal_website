require 'rails_helper'

RSpec.describe "/admin/books", type: :request do
  let(:user) { create :user }
  let(:valid_attributes) { { title: "The Book", author: "Name McName", review: "It is book." } }
  let(:invalid_attributes) { { title: "", review: "" } }

  before do
    sign_in(user)
  end

  describe "GET /index" do
    it "renders a successful response" do
      Book.create! valid_attributes
      get admin_books_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      book = Book.create! valid_attributes
      get admin_book_url(book)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_admin_book_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      book = Book.create! valid_attributes
      get edit_admin_book_url(book)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Book" do
        expect {
          post admin_books_url, params: { book: valid_attributes }
        }.to change(Book, :count).by(1)
      end

      it "redirects to the created book" do
        post admin_books_url, params: { book: valid_attributes }
        expect(response).to redirect_to(admin_book_url(Book.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Book" do
        expect {
          post admin_books_url, params: { book: invalid_attributes }
        }.to change(Book, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post admin_books_url, params: { book: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) { { title: "New Book", author: "Unknown", review: "Eh." } }

      it "updates the requested book" do
        book = Book.create! valid_attributes
        patch admin_book_url(book), params: { book: new_attributes }
        book.reload
        expect(book).to have_attributes(title: "New Book", author: "Unknown", review: "Eh.")
      end

      it "redirects to the book" do
        book = Book.create! valid_attributes
        patch admin_book_url(book), params: { book: new_attributes }
        book.reload
        expect(response).to redirect_to(admin_book_url(book))
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        book = Book.create! valid_attributes
        patch admin_book_url(book), params: { book: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested book" do
      book = Book.create! valid_attributes
      expect {
        delete admin_book_url(book)
      }.to change(Book, :count).by(-1)
    end

    it "redirects to the books list" do
      book = Book.create! valid_attributes
      delete admin_book_url(book)
      expect(response).to redirect_to(admin_books_url)
    end
  end
end
