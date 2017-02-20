class ProductsController < ApplicationController
  before_action :validate_search_key, only: [:search]
  before_action :authenticate_user!, only: [:favorite]
  def index
    if params[:category].blank?
      @products = case params[:order]
      when 'by_product_price'
            Product.order('price DESC')
      when 'by_product_quantity'
            Product.order('quantity DESC')
      when 'by_product_like'
            Product.order('like DESC')
          else
            Product.order('created_at DESC')
          end
    else
      @category_id = Category.find_by(name: params[:category]).id
      @products = Product.where(:category_id => @category_id)
    end
  end
  def show
    @product = Product.find(params[:id])
    @photos = @product.photos.all
    @posts = @product.posts
    @prints = @product.prints.all
    if @posts.blank?
      @avg_post = 0
    else
      @avg_post = @posts.average(:rating).round(2)
end
  end
  def search
		@products = Product.ransack({:title_cont => @q}).result(:distinct => true)
	end
  def add_to_cart
    @product = Product.find(params[:id])
    if !current_cart.products.include?(@product)
    current_cart.add_product_to_cart(@product)
    flash[:notice] = "#{@product.title}加入购物车成功"
  else
    flash[:warning] = "不能重复加入商品"
    end
    redirect_to :back

  end
    def favorite
      @product = Product.find(params[:id])
      type = params[:type]
      if type == "favorite"
      current_user.favorite_products << @product
      redirect_to :back
      elsif type == "unfavorite"
      current_user.favorite_products.delete(@product)
      redirect_to :back

      else
      redirect_to :back
      end
  end

    def upvote
      @product = Product.find(params[:id])
      @product.votes.create
      @product.like = @product.votes.count
      @product.save
      redirect_to :back
    end
  protected

  def validate_search_key
    @q = params[:query_string].gsub(/\|\'|\/|\?/, "") if params[:query_string].present?
  end
end
