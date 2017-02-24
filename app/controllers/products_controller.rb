class ProductsController < ApplicationController
  before_action :validate_search_key, only: [:search]
  before_action :authenticate_user!, only: [:favorite]
  before_action :find_product, only: [:show, :add_to_cart, :favorite, :upvote]
  respond_to :html, :js

  def index
    if params[:category].blank?
      @products = case params[:order]
      when 'by_product_price'
            Product.includes(:photos).order.('price DESC')
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
  def show
    @photos = @product.photos.all
    @posts = @product.posts.includes(:graphics).includes(:user)
    @prints = @product.prints.all
    if @posts.blank?
      @avg_post = 0
      @avg_look = 0
      @avg_price = 0
    else
      @avg_post = @posts.average(:rating).round(2)
      @avg_look = @posts.average(:look).round(2)
      @avg_price = @posts.average(:price).round(2)
    end
  end
  def search
		@products = Product.ransack({:title_cont => @q}).result(:distinct => true)
	end
  def add_to_cart
    if !current_cart.products.include?(@product)
      current_cart.add_product_to_cart(@product)
      respond_to do |format|
        format.html { render :index }
        format.js   { render :layout => false }
      end
    else
      flash[:warning] = "不能重复加入商品"
      redirect_to :back
    end
  end
  def favorite
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
    @product.votes.create
    @product.like = @product.votes.count
    @product.save
    redirect_to :back
  end
  protected

  def find_product
    @product = Product.find(params[:id])
  end
  def validate_search_key
    @q = params[:query_string].gsub(/\|\'|\/|\?/, "") if params[:query_string].present?
  end
end
