class AddVoteToProduct < ActiveRecord::Migration[5.0]
  def change
    add_column :products, :vote, :integer
  end
end
