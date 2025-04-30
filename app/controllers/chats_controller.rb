class ChatsController < AdminController
  respond_to :html

  before_action :authenticate_user!
  before_action :set_chat, only: %i[show]

  def index
    @chats = current_user.chats
  end

  def show
    respond_with(@chat)
  end

  def create
    @chat = Chat.create(user: current_user)
    respond_with(@chat)
  end

  private

  def set_chat
    @chat = current_user.chats.find(params[:id])
  end
end
