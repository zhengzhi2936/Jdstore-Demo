class PostsController < ApplicationController
    before_filter :authenticate_user!, :only => [:new, :create]

    def new
      @product = Product.find(params[:product_id])
      @post = Post.new

    end

    def create
      @product = Product.find(params[:product_id])
      @post = Post.new(post_params)
      @post.product = @product
      @post.user = current_user

      if @post.save
       if params[:graphics] != nil
          params[:graphics]['avatar'].each do |a|
            @graphic = @post.graphics.create(:avatar => a)
          end
        end
        redirect_to product_path(@product)
      else
        render :new
      end
    end


    private

    def post_params
      params.require(:post).permit(:rating, :look, :price, :content, :image)
    end

end
