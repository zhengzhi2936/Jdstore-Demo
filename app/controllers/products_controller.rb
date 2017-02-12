class ProductsController < ApplicationController
  before_action :validate_search_key, only: [:search]
  def index
    if params[:category].blank?
    @products = Product.all
    else
      @category_id = Category.find_by(name: params[:category]).id
      @products = Product.where(:category_id => @category_id)
    end
  end
  def show
    @product = Product.find(params[:id])
    @photos = @product.photos.all
  end
  def search
    if @query_string.present?
      search_result = Product.ransack(@search_criteria).result(:distinct => true)
      @products = search_result.paginate(:page => params[:page], :per_page => 20 )
    else
      redirect_to :back
      flash[:alert] = "搜索内容不得为空！"

    end
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

  protected

  def validate_search_key
    @query_string = params[:q].gsub(/\\|\'|\/|\?/, "") if params[:q].present?
    @search_criteria = search_criteria(@query_string)
  end


  def search_criteria(query_string)
    {  title_or_description_or_price_or_category_cont:  @query_string }
  end
end
