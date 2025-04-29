class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: %i[show destroy update]

  def index
    books = Book.all.order(title: :asc)
    render json: books
  end

  def create
    book = Book.create!(book_params)
    if book
      render json: book
    else
      render json: book.errors
    end
  end

  def show
    render json: @book
  end

  def destroy
    @book.destroy
    render json: { meesage: "Book deleted!" }
  end

  def update
    @book.update(book_params)
    render json: { id: @book.id, message: "Book updated!" }
  end

  private

  def book_params
    params.expect(book: %i[title author review])
  end

  def set_book
    @book = Book.find(params[:id])
  end
end
