class CartItemsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_cart_item, only: [:destroy, :update, :add_quantity, :remove_quantity]
  respond_to :html, :js

  def destroy
    @product = @cart_item.product
    @cart_item.destroy
    @product.quantity += @cart_item.quantity
    @product.save
    respond_to do |format|
      format.html { render :index }
      format.js   { render :layout => false }
    end
  end
  def update
    if @cart_item.product.quantity >= cart_item_params[:quantity].to_i
    @cart_item.update(cart_item_params)
    flash[:notice] = "成功变更数量"
  else
    flash[:warning] = "数量不足已加入购物车"
  end
    redirect_to carts_path
  end
  def add_quantity
		if @cart_item.quantity < @cart_item.product.quantity
			@cart_item.quantity += 1
      @cart_item.product.quantity -=1
			@cart_item.save
      @cart_item.product.save
			redirect_to carts_path
		elsif @cart_item.quantity == @cart_item.product.quantity
			redirect_to carts_path, alert: "库存不足！"
		end
	end

	def remove_quantity
		if @cart_item.quantity > 0
			@cart_item.quantity -= 1
      @cart_item.product.quantity +=1
			@cart_item.save
      @cart_item.product.save
			redirect_to carts_path
		elsif @cart_item.quantity == 0
			redirect_to carts_path, alert: "商品不能少于零！"
		end
	end

  private

  def find_cart_item
    @cart = current_cart
    @cart_item = @cart.cart_items.find_by(product_id: params[:id])
  end

  def cart_item_params
    params.require(:cart_item).permit(:quantity)
  end
end
