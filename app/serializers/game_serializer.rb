class GameSerializer < ActiveModel::Serializer
  attributes :id, :winner, :white_user_id, :black_user_id, :pgn, :created_at
  
  # nesting
  belongs_to :white_user, class_name: 'User'
  belongs_to :black_user, class_name: 'User'
end
