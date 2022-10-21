class RemoveDateFromGames < ActiveRecord::Migration[7.0]
  def change
    remove_column :games, :date, :datetime
  end
end
