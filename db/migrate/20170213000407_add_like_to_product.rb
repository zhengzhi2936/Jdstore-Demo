class AddLikeToProduct < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :like, :integer
  end
end
