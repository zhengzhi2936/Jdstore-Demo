class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?

  def require_is_admin
    if !current_user.admin?
      redirect_to "/", alert: "You are not admin"
    end
  end
  helper_method :current_cart
  def current_cart
  @current_cart ||= find_cart
  end

  protected

def configure_permitted_parameters
  devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  devise_parameter_sanitizer.permit(:account_update, keys: [:nickname])
end
private
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:nickname, :email, :password) }
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:nickname, :email, :password, :current_password, :is_female, :date_of_birth, :avatar) }
    end
  def find_cart
    cart = Cart.find_by(id: session[:cart_id])
    if cart.blank?
      cart = Cart.create
    end
    session[:cart_id] = cart.id
    return cart
  end

  rescue_from ActiveRecord::RecordNotFound do
  flash[:warning] = 'Resource not found.'
  redirect_back_or root_path
  end

  def redirect_back_or(path)
    redirect_to request.referer || path
  end
end
