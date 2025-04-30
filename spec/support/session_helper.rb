module SessionHelper
  def sign_in(user)
    post user_session_path, params: { user: { email: user.email, password: user.password } }
  end
end
