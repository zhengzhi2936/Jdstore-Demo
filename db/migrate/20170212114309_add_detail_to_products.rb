class AddDetailToProducts < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :detail, :text
  end
end
