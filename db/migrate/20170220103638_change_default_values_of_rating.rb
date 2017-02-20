class ChangeDefaultValuesOfRating < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :rating, :integer, :default => 1
    change_column :posts, :look, :integer, :default => 1
    change_column :posts, :price, :integer, :default => 1
  end
end
