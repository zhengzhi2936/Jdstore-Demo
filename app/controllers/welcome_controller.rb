class WelcomeController < ApplicationController
	layout 'welcome'

	def index
		get_products
	end

	private

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
