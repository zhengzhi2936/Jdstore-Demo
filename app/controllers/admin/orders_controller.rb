class Admin::OrdersController <  AdminController
    before_action :find_order, only: [:show, :ship, :shipped, :cancel, :return]

  def index
    @orders = Order.order("id DESC")
    if params[:status] == "pending"
      @orders = @orders.where( :aasm_state => ["order_placed", "paid"] )
    elsif params[:status] == "done"
      @orders = @orders.where.not( :aasm_state => ["order_placed", "paid"] )
    end
    if params[:date].present?
      d = Date.parse( params[:date] )
    @orders = @orders.where( :created_at => d.beginning_of_day..d.end_of_day )
  end
  end
   def show
     @product_lists = @order.product_lists
   end
   def ship
    @order.ship!
    OrderMailer.notify_ship(@order).deliver!
    redirect_to :back
  end

    def shipped
      @order.deliver!
      redirect_to :back
    end

    def cancel
      @order.cancell_order!
      OrderMailer.notify_cancel(@order).deliver!
      redirect_to :back
    end

    def return
      @order.return_good!
      redirect_to :back
    end

  private

  def find_order
    @order = Order.find(params[:id])
  end
end
