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

  def after_sign_in_path_for(resource)
  products_path
end

def after_sign_out_path_for(resource_or_scope)
  request.referrer
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


  	def get_products
      if params[:category].blank?
        @products = case params[:order]
        when 'by_product_price'
              Product.includes(:photos).order('price DESC')
        when 'by_product_quantity'
              Product.includes(:photos).order('quantity DESC')
        when 'by_product_like'
              Product.includes(:photos).order('like DESC')
            else
              Product.includes(:photos).order('created_at DESC')
            end
      else
        @category_id = Category.find_by(name: params[:category]).id
        @products = Product.includes(:photos).where(:category_id => @category_id)
      end
    end
end
