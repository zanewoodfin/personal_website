class API::V1::BooksController < APIController
  before_action :set_book, only: %i[show]

  def index
    books = Book.all.order(title: :asc)
    render json: books
  end

  def show
    render json: @book
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end
end
