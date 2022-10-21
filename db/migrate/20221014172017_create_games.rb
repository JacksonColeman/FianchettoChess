class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.datetime :date
      t.string :winner
      t.string :pgn

      # setting up two foreign keys to same table
      t.references :white_user, null: false
      t.references :black_user, null: false

      t.timestamps
    end

    add_foreign_key :games, :users, column: :white_user_id
    add_foreign_key :games, :users, column: :black_user_id

  end
end
