class AddFavoriteCountToProducts < ActiveRecord::Migration[5.0]
  def change
  	add_column :favorites, :count, :integer, default: 0
  end
end
